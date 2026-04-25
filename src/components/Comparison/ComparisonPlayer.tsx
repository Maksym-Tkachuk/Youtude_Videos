import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { ComparisonConfig } from "./types";
import { makeIcon } from "../BarRace/datasets/makeIcon";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;
const DEFAULT_TARGET_DURATION = 35_000;

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

interface ComparisonPlayerProps {
  config: ComparisonConfig;
}

export default function ComparisonPlayer({ config }: ComparisonPlayerProps) {
  const { entityA, entityB, metrics } = config;
  const totalMetrics = metrics.length;
  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale = outputWidth / BASE_WIDTH;

  // Each metric gets a time slice; last slice is for final score reveal
  const sliceDuration = 1 / (totalMetrics + 2); // +2 for intro + final score
  const fillFraction = 0.4;

  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const endHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const virtualProgressRef = useRef(virtualProgress);
  virtualProgressRef.current = virtualProgress;

  // How many metrics revealed — first one shows instantly
  const revealedCount = Math.min(totalMetrics, Math.floor(virtualProgress / sliceDuration) + 1);

  // Per-metric fill progress
  function getMetricFill(idx: number): number {
    const metricStart = idx * sliceDuration;
    if (virtualProgress < metricStart) return 0;
    const elapsed = virtualProgress - metricStart;
    return easeOut(clamp01(elapsed / (sliceDuration * fillFraction)));
  }

  // Next metric index and timer progress
  const nextMetricIdx = revealedCount < totalMetrics ? revealedCount : -1;
  function getNextTimerProgress(): number {
    if (nextMetricIdx < 0) return 0;
    const nextStart = nextMetricIdx * sliceDuration;
    const prevEnd = nextMetricIdx > 0 ? (nextMetricIdx - 1) * sliceDuration + sliceDuration * fillFraction : 0;
    if (virtualProgress < prevEnd) return 0;
    const waitDur = nextStart - prevEnd;
    if (waitDur <= 0) return 0;
    return clamp01((virtualProgress - prevEnd) / waitDur);
  }
  const nextTimer = getNextTimerProgress();
  const nextSecsLeft = nextMetricIdx >= 0
    ? Math.max(0, Math.ceil((nextMetricIdx * sliceDuration - virtualProgress) * targetDuration / 1000))
    : 0;

  // Score
  const scoreA = useMemo(() => {
    let s = 0;
    for (let i = 0; i < revealedCount; i++) {
      const m = metrics[i];
      const higher = m.higherWins !== false;
      if (higher ? m.valueA > m.valueB : m.valueA < m.valueB) s++;
    }
    return s;
  }, [metrics, revealedCount]);
  const scoreB = useMemo(() => {
    let s = 0;
    for (let i = 0; i < revealedCount; i++) {
      const m = metrics[i];
      const higher = m.higherWins !== false;
      if (higher ? m.valueB > m.valueA : m.valueB < m.valueA) s++;
    }
    return s;
  }, [metrics, revealedCount]);

  // Final reveal
  const showFinal = virtualProgress > (totalMetrics + 1) * sliceDuration;
  const winner = scoreA > scoreB ? "A" : scoreB > scoreA ? "B" : "TIE";

  // Recording API
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("record")) return;
    const totalFrames = Math.ceil(targetDuration / (1000 / 30));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__barRace = {
      ready: true, finished: false, totalFrames, targetDuration,
      label: config.title,
      datasetCount: 0, datasetLabels: [] as string[],
      play: () => { setVirtualProgress(0); setPlaying(true); },
      setProgress: (t: number) => { setVirtualProgress(clamp01(t)); setPlaying(false); },
    };
    return () => { delete (window as any).__barRace; };
  }, [totalMetrics, targetDuration, config.title]);

  // Playback
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
        setVirtualProgress(1); setPlaying(false);
        if (endHoldRef.current) clearTimeout(endHoldRef.current);
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
    if (virtualProgress >= 1) { setVirtualProgress(0); setPlaying(true); }
    else setPlaying(p => !p);
  }, [virtualProgress]);

  const fontDisplay = "'Bebas Neue', 'Trebuchet MS', sans-serif";
  const fontBody = "'Barlow Condensed', 'Trebuchet MS', sans-serif";

  const rowHeight = 44;
  const barMaxWidth = 130;

  return (
    <>
      <style>{`
        @keyframes subscribeFadeIn { from { opacity: 0; } to { opacity: 1; } }
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
              {/* Title */}
              <div style={{ padding: "14px 0 4px", textAlign: "center", flexShrink: 0 }}>
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

              {/* Entity headers with photos or flags */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 20px", flexShrink: 0,
              }}>
                {/* Entity A */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {entityA.image ? (
                    <img src={entityA.image} alt={entityA.name} style={{
                      width: 40, height: 40, borderRadius: 20, objectFit: "cover",
                      border: `2px solid ${entityA.color}`,
                      boxShadow: `0 0 8px ${entityA.color}44`,
                    }} />
                  ) : (
                    <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {makeIcon("flags", entityA.flagId)?.("#fff", 32)}
                    </span>
                  )}
                  <span style={{
                    fontSize: 18, fontWeight: 800, color: entityA.color,
                    fontFamily: fontDisplay, letterSpacing: 1, textTransform: "uppercase",
                  }}>
                    {entityA.name}
                  </span>
                </div>
                {/* VS */}
                <span style={{
                  fontSize: 20, fontWeight: 900, fontFamily: fontDisplay,
                  color: "#ffd60a", letterSpacing: 2,
                }}>
                  VS
                </span>
                {/* Entity B */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontSize: 18, fontWeight: 800, color: entityB.color,
                    fontFamily: fontDisplay, letterSpacing: 1, textTransform: "uppercase",
                  }}>
                    {entityB.name}
                  </span>
                  {entityB.image ? (
                    <img src={entityB.image} alt={entityB.name} style={{
                      width: 40, height: 40, borderRadius: 20, objectFit: "cover",
                      border: `2px solid ${entityB.color}`,
                      boxShadow: `0 0 8px ${entityB.color}44`,
                    }} />
                  ) : (
                    <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {makeIcon("flags", entityB.flagId)?.("#fff", 32)}
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                gap: 16, padding: "4px 0", flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 36, fontWeight: 900, fontFamily: fontDisplay,
                  color: entityA.color, minWidth: 40, textAlign: "right",
                }}>
                  {scoreA}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#4a6080" }}>—</span>
                <span style={{
                  fontSize: 36, fontWeight: 900, fontFamily: fontDisplay,
                  color: entityB.color, minWidth: 40, textAlign: "left",
                }}>
                  {scoreB}
                </span>
              </div>

              {/* Metrics */}
              <div style={{
                padding: "4px 12px", display: "flex",
                flexDirection: "column", justifyContent: "center",
              }}>
                {metrics.map((metric, i) => {
                  const isRevealed = i < revealedCount;
                  const fill = getMetricFill(i);
                  const maxVal = Math.max(metric.valueA, metric.valueB, 1);
                  const pctA = (metric.valueA / maxVal) * 100;
                  const pctB = (metric.valueB / maxVal) * 100;
                  const higherWins = metric.higherWins !== false;
                  const aWins = higherWins ? metric.valueA > metric.valueB : metric.valueA < metric.valueB;
                  const bWins = higherWins ? metric.valueB > metric.valueA : metric.valueB < metric.valueA;

                  const isNext = i === nextMetricIdx;

                  return (
                    <div key={i} style={{ height: rowHeight, marginBottom: 2 }}>
                      {/* Metric label */}
                      <div style={{
                        textAlign: "center", fontSize: 10, fontWeight: 700,
                        color: isRevealed ? "#c0cfe0" : isNext ? "#6a8aaa" : "#3a4f6a",
                        textTransform: "uppercase", letterSpacing: 1, marginBottom: 1,
                      }}>
                        {metric.icon && <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 4 }}>{metric.icon}</span>}{metric.label}
                      </div>
                      {/* Bars — from center outward */}
                      <div style={{ display: "flex", alignItems: "center", height: 24, position: "relative" }}>
                        {/* Two-sided timer for next metric */}
                        {isNext && !isRevealed && (
                          <>
                            {/* Left timer bar (A side) */}
                            <div style={{
                              position: "absolute", left: 54, right: "50%", top: 0, bottom: 0,
                              borderRadius: "3px 0 0 3px", overflow: "hidden", zIndex: 0, marginRight: 1,
                            }}>
                              <div style={{
                                position: "absolute", right: 0, top: 0, bottom: 0,
                                width: `${nextTimer * 100}%`,
                                background: `linear-gradient(270deg, ${entityA.color}22, ${entityA.color}11)`,
                                borderRadius: "3px 0 0 3px",
                              }} />
                              <div style={{
                                position: "absolute", inset: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <span style={{
                                  fontSize: 12, fontWeight: 900,
                                  color: `rgba(255, 214, 10, ${0.3 + 0.3 * Math.sin(nextTimer * Math.PI * 3)})`,
                                  fontFamily: fontDisplay,
                                }}>
                                  {nextSecsLeft > 0 ? nextSecsLeft : "?"}
                                </span>
                              </div>
                            </div>
                            {/* Right timer bar (B side) */}
                            <div style={{
                              position: "absolute", left: "50%", right: 54, top: 0, bottom: 0,
                              borderRadius: "0 3px 3px 0", overflow: "hidden", zIndex: 0, marginLeft: 1,
                            }}>
                              <div style={{
                                position: "absolute", left: 0, top: 0, bottom: 0,
                                width: `${nextTimer * 100}%`,
                                background: `linear-gradient(90deg, ${entityB.color}22, ${entityB.color}11)`,
                                borderRadius: "0 3px 3px 0",
                              }} />
                              <div style={{
                                position: "absolute", inset: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <span style={{
                                  fontSize: 12, fontWeight: 900,
                                  color: `rgba(255, 214, 10, ${0.3 + 0.3 * Math.sin(nextTimer * Math.PI * 3)})`,
                                  fontFamily: fontDisplay,
                                }}>
                                  {nextSecsLeft > 0 ? nextSecsLeft : "?"}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                        {/* A value */}
                        <span style={{
                          fontSize: 12, fontWeight: 800, width: 50, textAlign: "right",
                          color: isRevealed ? (aWins ? "#ffffff" : "#8899aa") : "transparent",
                          textShadow: isRevealed && aWins ? `0 0 8px ${entityA.color}88` : "none",
                          opacity: isRevealed ? fill : 0,
                        }}>
                          {isRevealed ? metric.formatValue(metric.valueA) : ""}
                        </span>
                        {/* A bar (right-aligned, grows left) */}
                        <div style={{
                          width: barMaxWidth, height: 20, borderRadius: 3,
                          position: "relative", overflow: "hidden",
                          background: "#1e2d42", marginLeft: 4,
                        }}>
                          <div style={{
                            position: "absolute", right: 0, top: 0, bottom: 0,
                            width: `${isRevealed ? pctA * fill : 0}%`,
                            background: aWins && isRevealed
                              ? entityA.color
                              : isRevealed ? `${entityA.color}aa` : "transparent",
                            borderRadius: 4,
                            boxShadow: aWins && isRevealed && fill > 0.9 ? `0 0 12px ${entityA.color}66` : "none",
                          }} />
                          {isRevealed && aWins && fill > 0.9 && (
                            <div style={{
                              position: "absolute", left: 4, top: 0, bottom: 0,
                              display: "flex", alignItems: "center",
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd60a">
                                <path d="M12 2l3 6 3-3v8H6V5l3 3z" opacity="0.9"/>
                                <rect x="5" y="16" width="14" height="3" rx="1" fill="#ffd60a" opacity="0.7"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* Center divider */}
                        <div style={{
                          width: 2, height: 22, background: "#3a4f6a",
                          borderRadius: 1, flexShrink: 0, margin: "0 2px",
                        }} />
                        {/* B bar (left-aligned, grows right) */}
                        <div style={{
                          width: barMaxWidth, height: 20, borderRadius: 3,
                          position: "relative", overflow: "hidden",
                          background: "#1e2d42", marginRight: 4,
                        }}>
                          <div style={{
                            position: "absolute", left: 0, top: 0, bottom: 0,
                            width: `${isRevealed ? pctB * fill : 0}%`,
                            background: bWins && isRevealed
                              ? entityB.color
                              : isRevealed ? `${entityB.color}aa` : "transparent",
                            borderRadius: 4,
                            boxShadow: bWins && isRevealed && fill > 0.9 ? `0 0 12px ${entityB.color}66` : "none",
                          }} />
                          {isRevealed && bWins && fill > 0.9 && (
                            <div style={{
                              position: "absolute", right: 4, top: 0, bottom: 0,
                              display: "flex", alignItems: "center",
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd60a">
                                <path d="M12 2l3 6 3-3v8H6V5l3 3z" opacity="0.9"/>
                                <rect x="5" y="16" width="14" height="3" rx="1" fill="#ffd60a" opacity="0.7"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* B value */}
                        <span style={{
                          fontSize: 12, fontWeight: 800, width: 50, textAlign: "left",
                          color: isRevealed ? (bWins ? "#ffffff" : "#8899aa") : "transparent",
                          textShadow: isRevealed && bWins ? `0 0 8px ${entityB.color}88` : "none",
                          opacity: isRevealed ? fill : 0,
                        }}>
                          {isRevealed ? metric.formatValue(metric.valueB) : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom spacer for Shorts UI */}
              <div style={{ flexShrink: 0, height: 80 }} />

              {/* Final winner announcement */}
              {showFinal && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                  zIndex: 50, pointerEvents: "none",
                  background: "rgba(8, 12, 20, 0.85)",
                }}>
                  <span style={{
                    fontSize: 20, fontWeight: 700, color: "#86a6c8",
                    fontFamily: fontDisplay, letterSpacing: 2, marginBottom: 8,
                  }}>
                    WINNER
                  </span>
                  {(() => {
                    const winnerEntity = winner === "A" ? entityA : entityB;
                    return winnerEntity.image ? (
                      <img src={winnerEntity.image} alt={winnerEntity.name} style={{
                        width: 64, height: 64, borderRadius: 32, objectFit: "cover",
                        border: `3px solid ${winnerEntity.color}`,
                        boxShadow: `0 0 20px ${winnerEntity.color}66`,
                        marginBottom: 8,
                      }} />
                    ) : (
                      <span style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                        {makeIcon("flags", winnerEntity.flagId)?.("#fff", 56)}
                      </span>
                    );
                  })()}
                  <span style={{
                    fontSize: 36, fontWeight: 900, fontFamily: fontDisplay,
                    color: winner === "A" ? entityA.color : winner === "B" ? entityB.color : "#ffd60a",
                    letterSpacing: 3, textTransform: "uppercase",
                  }}>
                    {winner === "TIE" ? "IT'S A TIE!" : (winner === "A" ? entityA.name : entityB.name)}
                  </span>
                  <span style={{
                    fontSize: 48, fontWeight: 900, fontFamily: fontDisplay,
                    color: "#ffd60a", marginTop: 4,
                  }}>
                    {scoreA} — {scoreB}
                  </span>
                </div>
              )}

              {/* Subscribe CTA at 15s */}
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
