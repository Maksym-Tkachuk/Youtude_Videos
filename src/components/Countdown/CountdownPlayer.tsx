import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { CountdownConfig } from "./types";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;
const DEFAULT_TARGET_DURATION = 30_000; // 30s for countdown

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }

// Ease-out for smooth bar fill
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

interface CountdownPlayerProps {
  config: CountdownConfig;
}

export default function CountdownPlayer({ config }: CountdownPlayerProps) {
  const items = config.items; // #10 at [0], #1 at [9]
  const totalItems = items.length;
  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale = outputWidth / BASE_WIDTH;

  const rowHeight = 52;
  const rowGap = 4;

  // Each item gets an equal time slice. Within each slice:
  // first 30% = bar fill animation, remaining 70% = hold before next
  const sliceDuration = 1 / (totalItems + 1); // +1 for end hold
  const fillFraction = 0.35; // 35% of slice for fill animation

  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [, setEndPulse] = useState(false);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const endHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const virtualProgressRef = useRef(virtualProgress);
  virtualProgressRef.current = virtualProgress;

  const maxVal = useMemo(() => Math.max(1, ...items.map(i => i.value)), [items]);

  // Derive reveal state from virtualProgress — works for both live and recording
  const revealedCount = Math.min(totalItems, Math.floor(virtualProgress / sliceDuration) + 1);

  // Per-item fill progress (0→1 smooth animation within its time slice)
  function getItemFill(itemIdx: number): number {
    const itemStart = itemIdx * sliceDuration;
    if (virtualProgress < itemStart) return 0;
    const elapsed = virtualProgress - itemStart;
    const fillDur = sliceDuration * fillFraction;
    return easeOut(clamp01(elapsed / fillDur));
  }

  // Per-item opacity (fade in)
  function getItemOpacity(itemIdx: number): number {
    const itemStart = itemIdx * sliceDuration;
    if (virtualProgress < itemStart) return 0;
    const elapsed = virtualProgress - itemStart;
    const fadeDur = sliceDuration * 0.15;
    return clamp01(elapsed / fadeDur);
  }

  // Next item to be revealed (for "?" teaser)
  const nextRevealIdx = revealedCount < totalItems ? revealedCount : -1;
  // Pulse progress for the "next" slot
  function getNextPulse(): number {
    if (nextRevealIdx < 0) return 0;
    const nextStart = nextRevealIdx * sliceDuration;
    const prevEnd = nextRevealIdx > 0 ? (nextRevealIdx - 1) * sliceDuration + sliceDuration * fillFraction : 0;
    if (virtualProgress < prevEnd) return 0;
    const waitDur = nextStart - prevEnd;
    if (waitDur <= 0) return 0;
    const t = clamp01((virtualProgress - prevEnd) / waitDur);
    return Math.sin(t * Math.PI * 3) * 0.5 + 0.5; // pulsing 0→1→0→1→0→1
  }

  // ── Recording API ─────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("record")) return;
    const totalFrames = Math.ceil(targetDuration / (1000 / 30));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__barRace = {
      ready: true,
      finished: false,
      totalFrames,
      targetDuration,
      label: config.title,
      datasetCount: 0,
      datasetLabels: [] as string[],
      play: () => {
        setVirtualProgress(0); setEndPulse(false); setPlaying(true);
      },
      setProgress: (t: number) => {
        const clamped = clamp01(t);
        setVirtualProgress(clamped);
        setPlaying(false);
        if (clamped >= 1) setEndPulse(true);
      },
    };
    return () => { delete (window as any).__barRace; };
  }, [totalItems, targetDuration, config.title]);

  // ── Playback ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null; playbackStartRef.current = null;
      return;
    }
    playbackStartRef.current = performance.now() - virtualProgressRef.current * targetDuration;

    const animate = (now: number) => {
      if (playbackStartRef.current === null) return;
      const progress = clamp01((now - playbackStartRef.current) / targetDuration);
      setVirtualProgress(progress);

      if (progress >= 1) {
        setVirtualProgress(1);
        setPlaying(false);
        setEndPulse(true);
        if (endHoldRef.current) clearTimeout(endHoldRef.current);
        endHoldRef.current = setTimeout(() => setEndPulse(false), 3000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).__barRace) (window as any).__barRace.finished = true;
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [playing, targetDuration]);

  const togglePlay = useCallback(() => {
    if (virtualProgress >= 1) {
      setVirtualProgress(0); setEndPulse(false); setPlaying(true);
    } else setPlaying(p => !p);
  }, [virtualProgress]);

  const fontDisplay = "'Bebas Neue', 'Trebuchet MS', sans-serif";
  const fontBody = "'Barlow Condensed', 'Trebuchet MS', sans-serif";

  const nextPulse = getNextPulse();

  return (
    <>
      <style>{`
        @keyframes subscribeFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes subscribePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
      <div style={{
        minHeight: "100vh", background: "#080c14",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: 20, boxSizing: "border-box", fontFamily: fontBody,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={togglePlay} style={{
            background: playing ? "#1a1500" : "#0d1120",
            border: `1px solid ${playing ? "#ffd60a" : "#4a9fc8"}`,
            color: playing ? "#ffd60a" : "#4a9fc8",
            borderRadius: 8, padding: "12px 18px", fontSize: 20,
            cursor: "pointer", width: 56, flexShrink: 0,
          }}>
            {playing ? "⏸" : virtualProgress >= 1 ? "↺" : "▶"}
          </button>

          <div data-testid="bar-race-viewport" style={{
            width: outputWidth, height: outputHeight,
            overflow: "hidden", boxShadow: "0 0 60px rgba(0,0,0,0.8)", flexShrink: 0,
          }}>
            <div style={{
              width: BASE_WIDTH, height: BASE_HEIGHT,
              transform: `scale(${scale})`, transformOrigin: "top left",
              background: "linear-gradient(180deg, #0d1120 0%, #080c14 100%)",
              display: "flex", flexDirection: "column", fontFamily: fontBody,
              position: "relative",
            }}>
              {/* Header */}
              <div style={{ padding: "14px 0 6px", textAlign: "center", flexShrink: 0 }}>
                <h1 style={{
                  margin: 0, fontSize: 26, fontWeight: 800,
                  fontFamily: fontDisplay, letterSpacing: 2,
                  background: "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  lineHeight: 1.1, textTransform: "uppercase",
                }}>
                  {config.title}
                  {config.subtitle && <><br />{config.subtitle}</>}
                </h1>
              </div>

              {/* Fixed-height countdown slots */}
              <div style={{
                flex: 1, padding: "8px 12px 60px", display: "flex",
                flexDirection: "column-reverse", justifyContent: "center",
              }}>
                {items.map((item, i) => {
                  const rank = totalItems - i;
                  const isRevealed = i < revealedCount;
                  const isNext = i === nextRevealIdx;
                  const fill = getItemFill(i);
                  const opacity = getItemOpacity(i);
                  const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                  const barWidth = isRevealed ? Math.max(3, pct * fill) : 0;
                  const isTop3 = rank <= 3;
                  const isNumber1 = rank === 1;

                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        height: rowHeight, marginBottom: rowGap,
                      }}
                    >
                      {/* Rank badge */}
                      <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: 15, fontFamily: fontDisplay,
                        background: isRevealed
                          ? isNumber1
                            ? "linear-gradient(135deg, #ffd60a, #ff9500)"
                            : isTop3
                              ? `rgba(255, 214, 10, ${0.15 * opacity})`
                              : "#1a2235"
                          : isNext
                            ? `rgba(255, 214, 10, ${0.08 * nextPulse})`
                            : "#1a2235",
                        color: isRevealed
                          ? isNumber1 ? "#0d1120" : isTop3 ? "#ffd60a" : "#86a6c8"
                          : isNext
                            ? `rgba(134, 166, 200, ${0.5 + 0.5 * nextPulse})`
                            : "#2a3a55",
                        border: isRevealed && isTop3
                          ? `1px solid rgba(255, 214, 10, ${0.3 * opacity})`
                          : isNext
                            ? `1px solid rgba(255, 214, 10, ${0.15 * nextPulse})`
                            : "1px solid #2a3a55",
                      }}>
                        {isRevealed || isNext ? `#${rank}` : `#${rank}`}
                      </div>

                      {/* Icon — revealed: flag, unrevealed: "?" circle */}
                      <span style={{
                        flexShrink: 0, width: 26, height: 26,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {isRevealed ? (
                          <span style={{ opacity }}>{item.renderIcon?.(item.color, 26)}</span>
                        ) : (
                          <div style={{
                            width: 26, height: 26, borderRadius: 13,
                            background: isNext ? `rgba(255, 214, 10, ${0.1 + 0.1 * nextPulse})` : "#1a2235",
                            border: isNext ? `1px solid rgba(255, 214, 10, ${0.2 + 0.2 * nextPulse})` : "1px solid #2a3a55",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 900, fontFamily: fontDisplay,
                            color: isNext ? `rgba(255, 214, 10, ${0.4 + 0.4 * nextPulse})` : "#2a3a55",
                          }}>
                            ?
                          </div>
                        )}
                      </span>

                      {/* Bar track */}
                      <div style={{
                        flex: 1, position: "relative", height: 38,
                        borderRadius: 6, overflow: "hidden",
                        background: "#1a2235",
                      }}>
                        {/* Timer progress bar for unrevealed "next" slot */}
                        {isNext && !isRevealed && (() => {
                          const itemStart = i * sliceDuration;
                          const prevEnd = i > 0 ? (i - 1) * sliceDuration + sliceDuration * fillFraction : 0;
                          const timerProgress = prevEnd < itemStart
                            ? clamp01((virtualProgress - prevEnd) / (itemStart - prevEnd))
                            : 0;
                          const secsLeft = Math.max(0, Math.ceil((itemStart - virtualProgress) * targetDuration / 1000));
                          return (
                            <>
                              {/* Linear timer fill */}
                              <div style={{
                                position: "absolute", left: 0, top: 0, bottom: 0,
                                width: `${timerProgress * 100}%`,
                                background: "linear-gradient(90deg, rgba(255,214,10,0.08), rgba(255,214,10,0.15))",
                                borderRadius: 6,
                              }} />
                              {/* Timer text */}
                              <div style={{
                                position: "absolute", inset: 0,
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                              }}>
                                <span style={{
                                  fontSize: 16, fontWeight: 900, fontFamily: fontDisplay,
                                  color: `rgba(255, 214, 10, ${0.5 + 0.3 * nextPulse})`,
                                  letterSpacing: 1,
                                }}>
                                  {secsLeft > 0 ? secsLeft : "?"}
                                </span>
                              </div>
                            </>
                          );
                        })()}

                        {/* Colored bar fill for revealed */}
                        <div style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${barWidth}%`,
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                          borderRadius: 6,
                          boxShadow: isNumber1 && isRevealed ? `0 0 20px ${item.color}44` : "none",
                        }} />

                        {/* Text overlay */}
                        <div style={{
                          position: "relative", display: "flex", alignItems: "center",
                          justifyContent: "space-between", height: "100%",
                          padding: "0 10px", zIndex: 1,
                          opacity: isRevealed ? opacity : 0,
                        }}>
                          <div>
                            <div style={{
                              fontSize: 13, fontWeight: 700, color: "#ffffff",
                              textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                            }}>
                              {item.name}
                            </div>
                            {item.subtitle && (
                              <div style={{
                                fontSize: 9, color: "#c0cfe0", fontWeight: 500,
                                textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                                marginTop: -1,
                              }}>
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                          <span style={{
                            fontSize: 14, fontWeight: 800, color: "#ffffff",
                            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                          }}>
                            {config.formatValue(item.value)}
                            {config.valueUnit && (
                              <span style={{ fontSize: 9, color: "#c0cfe0", marginLeft: 3 }}>
                                {config.valueUnit}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ flexShrink: 0, height: 8 }} />

              {/* Subscribe CTA — absolute overlay centered, shows at 15s with fade */}
              {(() => {
                const elapsedSec = virtualProgress * (targetDuration / 1000);
                if (elapsedSec < 14.5 || elapsedSec > 18.5) return null;
                let opacity = 1;
                if (elapsedSec < 15.5) opacity = (elapsedSec - 14.5) / 1;
                else if (elapsedSec > 17) opacity = 1 - (elapsedSec - 17) / 1.5;
                const s = 0.9 + 0.1 * opacity;
                return (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 100, pointerEvents: "none", opacity,
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "linear-gradient(135deg, #ff0000, #cc0000)",
                      borderRadius: 24, padding: "10px 24px",
                      boxShadow: `0 4px ${24*opacity}px rgba(255,0,0,${0.5*opacity}), 0 0 ${60*opacity}px rgba(255,0,0,${0.2*opacity})`,
                      transform: `scale(${s})`,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                      <span style={{
                        color: "#ffffff", fontSize: 16, fontWeight: 800,
                        fontFamily: fontBody, letterSpacing: 1.5, textTransform: "uppercase",
                      }}>
                        Subscribe
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
