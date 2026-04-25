import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { StackedAreaConfig } from "./types";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;

const DEFAULT_TARGET_DURATION = 45_000;
const PLAYBACK_EASE_POWER = 1.7;

interface FrameData {
  year: number;
  month: number;
  vals: Record<string, number>; // id -> percentage share at this frame
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function easePlaybackProgress(p: number): number {
  return 1 - Math.pow(1 - clamp01(p), PLAYBACK_EASE_POWER);
}

function invertPlaybackProgress(p: number): number {
  return 1 - Math.pow(1 - clamp01(p), 1 / PLAYBACK_EASE_POWER);
}

function interpolate(milestones: Record<number, number>, year: number): number {
  const keys = Object.keys(milestones).map(Number).sort((a, b) => a - b);
  if (keys.length === 0) return 0;
  if (year < keys[0]) return 0;
  if (year >= keys[keys.length - 1]) return milestones[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (year >= keys[i] && year <= keys[i + 1]) {
      const t = (year - keys[i]) / (keys[i + 1] - keys[i]);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return milestones[keys[i]] + (milestones[keys[i + 1]] - milestones[keys[i]]) * eased;
    }
  }
  return 0;
}

function buildFrames(config: StackedAreaConfig): FrameData[] {
  const frames: FrameData[] = [];
  const framesPerYear = config.framesPerYear ?? 12;
  const playbackFramesPerYear = framesPerYear === 1 ? 6 : framesPerYear;
  for (let y = config.startYear; y <= config.endYear; y++) {
    for (let m = 0; m < playbackFramesPerYear; m++) {
      const decYear = y + m / playbackFramesPerYear;
      const vals: Record<string, number> = {};
      config.items.forEach(item => {
        const ms = config.milestones[item.id];
        vals[item.id] = ms ? Math.max(0, interpolate(ms, decYear)) : 0;
      });
      frames.push({ year: y, month: m, vals });
    }
  }
  return frames;
}

// ── SVG path builder for stacked areas ───────────────────────────────────────

function buildAreaPaths(
  frameSlice: FrameData[],
  itemIds: string[],
  chartWidth: number,
  chartHeight: number,
): string[] {
  if (frameSlice.length === 0) return itemIds.map(() => "");

  const n = frameSlice.length;
  const paths: string[] = [];

  // For each frame, compute cumulative percentages per item
  // itemIds are ordered bottom-to-top in the stack
  const cumulativeBottom: number[][] = []; // [frameIndex][itemIdx] = bottom y
  const cumulativeTop: number[][] = [];    // [frameIndex][itemIdx] = top y

  for (let fi = 0; fi < n; fi++) {
    const frame = frameSlice[fi];
    const bottoms: number[] = [];
    const tops: number[] = [];
    let cumPct = 0;
    for (let ii = 0; ii < itemIds.length; ii++) {
      const pct = frame.vals[itemIds[ii]] ?? 0;
      bottoms.push(cumPct);
      cumPct += pct;
      tops.push(cumPct);
    }
    cumulativeBottom.push(bottoms);
    cumulativeTop.push(tops);
  }

  // Convert percentages to SVG y coordinates (0% = bottom, 100% = top)
  const yFromPct = (pct: number) => chartHeight - (pct / 100) * chartHeight;
  const xFromIdx = (fi: number) => (fi / Math.max(1, n - 1)) * chartWidth;

  for (let ii = 0; ii < itemIds.length; ii++) {
    // Top line (left to right)
    let d = `M ${xFromIdx(0).toFixed(1)} ${yFromPct(cumulativeTop[0][ii]).toFixed(1)}`;
    for (let fi = 1; fi < n; fi++) {
      d += ` L ${xFromIdx(fi).toFixed(1)} ${yFromPct(cumulativeTop[fi][ii]).toFixed(1)}`;
    }
    // Bottom line (right to left)
    for (let fi = n - 1; fi >= 0; fi--) {
      d += ` L ${xFromIdx(fi).toFixed(1)} ${yFromPct(cumulativeBottom[fi][ii]).toFixed(1)}`;
    }
    d += " Z";
    paths.push(d);
  }

  return paths;
}

// ── Component ────────────────────────────────────────────────────────────────

interface StackedAreaPlayerProps {
  config: StackedAreaConfig;
}

export default function StackedAreaPlayer({ config }: StackedAreaPlayerProps) {
  const frames = useMemo<FrameData[]>(() => buildFrames(config), [config]);
  const totalFrames = frames.length;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale = outputWidth / BASE_WIDTH;
  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;

  const WINDOW_SIZE = 20; // frames of trailing history in the chart
  const CHART_WIDTH = 381;  // inner chart SVG width
  const CHART_HEIGHT = 340; // inner chart SVG height

  const fontDisplay = "'Bebas Neue', 'Trebuchet MS', sans-serif";
  const fontBody = "'Barlow Condensed', 'Trebuchet MS', sans-serif";

  // ── Playback state ──────────────────────────────────────────────────────────
  const [frameIdx, setFrameIdx] = useState(0);
  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [eventBanner, setEventBanner] = useState<string | null>(null);
  const [eventStartProgress, setEventStartProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const frameIdxRef = useRef(frameIdx);
  const virtualProgressRef = useRef(virtualProgress);

  const isRecording = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).has("record");

  const TICKER_DURATION_MS = 18_000;
  const tickerDurationNormalized = Math.min(1, TICKER_DURATION_MS / Math.max(targetDuration, 1));

  frameIdxRef.current = frameIdx;
  virtualProgressRef.current = virtualProgress;

  // ── Recording API (same interface as BarRace) ──────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("record")) return;
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
        setFrameIdx(0);
        setVirtualProgress(0);
        setEventBanner(null);
        setPlaying(true);
      },
      setProgress: (t: number) => {
        const clamped = clamp01(t);
        const eased = easePlaybackProgress(clamped);
        const idx = Math.min(totalFrames - 1, Math.max(0, Math.round(eased * (totalFrames - 1))));
        setFrameIdx(idx);
        setVirtualProgress(clamped);
        setPlaying(false);
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => { delete (window as any).__barRace; };
  }, [totalFrames, targetDuration, config.title]);

  // ── Event ticker ───────────────────────────────────────────────────────────
  const prevEventYearRef = useRef<number | null>(null);
  const frame = frames[frameIdx];

  useEffect(() => {
    if (!config.events) return;
    const label = config.events[frame.year];
    if (label && frame.year !== prevEventYearRef.current) {
      prevEventYearRef.current = frame.year;
      setEventBanner(label);
      setEventStartProgress(virtualProgressRef.current);
    }
  }, [frame.year, config.events]);

  // ── Playback loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      playbackStartRef.current = null;
      return;
    }

    const currentEased = totalFrames > 1
      ? frameIdxRef.current / (totalFrames - 1)
      : 1;
    const currentP = invertPlaybackProgress(currentEased);
    playbackStartRef.current = performance.now() - currentP * targetDuration;

    const animate = (now: number) => {
      if (playbackStartRef.current === null) return;

      const playbackProgress = targetDuration > 0
        ? clamp01((now - playbackStartRef.current) / targetDuration)
        : 1;
      const easedProgress = easePlaybackProgress(playbackProgress);
      const nextIdx = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(easedProgress * (totalFrames - 1))),
      );

      setFrameIdx(prev => (prev === nextIdx ? prev : nextIdx));
      setVirtualProgress(playbackProgress);

      if (playbackProgress >= 1 || nextIdx >= totalFrames - 1) {
        setFrameIdx(totalFrames - 1);
        setVirtualProgress(1);
        setPlaying(false);
        playbackStartRef.current = null;
        rafRef.current = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).__barRace) (window as any).__barRace.finished = true;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [playing, targetDuration, totalFrames]);

  const togglePlay = useCallback(() => {
    if (frameIdx >= totalFrames - 1) {
      setFrameIdx(0);
      setVirtualProgress(0);
      setPlaying(true);
    } else {
      setPlaying(p => !p);
    }
  }, [frameIdx, totalFrames]);

  // ── Compute chart data for current frame ───────────────────────────────────
  const windowStart = Math.max(0, frameIdx - WINDOW_SIZE + 1);
  const frameSlice = frames.slice(windowStart, frameIdx + 1);

  // Item ids ordered for stacking (bottom to top)
  const itemIds = config.items.map(i => i.id);
  const areaPaths = useMemo(
    () => buildAreaPaths(frameSlice, itemIds, CHART_WIDTH, CHART_HEIGHT),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frameIdx, windowStart],
  );

  // Current percentages for legend
  const currentVals = frame.vals;

  // ── Timeline ───────────────────────────────────────────────────────────────
  const timelineProgress = totalFrames > 1 ? frameIdx / (totalFrames - 1) : 0;
  const yearRange = Math.max(1, config.endYear - config.startYear);
  const intervalYears = 10;

  const timelineLabelYears: number[] = [];
  for (let y = config.startYear; y <= config.endYear; y += intervalYears) {
    timelineLabelYears.push(y);
  }
  const lastGrid = timelineLabelYears[timelineLabelYears.length - 1];
  if (lastGrid < config.endYear && (config.endYear - lastGrid) >= intervalYears * 0.7) {
    timelineLabelYears.push(config.endYear);
  }

  // Color map for quick lookup
  const colorMap = useMemo(() => {
    const m: Record<string, string> = {};
    config.items.forEach(i => { m[i.id] = i.color; });
    return m;
  }, [config.items]);

  return (
    <>
      <div style={{
        minHeight: "100vh",
        background: "#080c14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: fontBody,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Play button */}
          <button
            onClick={togglePlay}
            style={{
              background: playing ? "#1a1500" : "#0d1120",
              border: `1px solid ${playing ? "#ffd60a" : "#4a9fc8"}`,
              color: playing ? "#ffd60a" : "#4a9fc8",
              borderRadius: 8,
              padding: "12px 18px",
              fontSize: 20,
              cursor: "pointer",
              width: 56,
              flexShrink: 0,
            }}
          >
            {playing ? "\u23F8" : frameIdx >= totalFrames - 1 ? "\u21BA" : "\u25B6"}
          </button>

          {/* Viewport */}
          <div data-testid="bar-race-viewport" style={{
            width: outputWidth,
            height: outputHeight,
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(0,0,0,0.8)",
            flexShrink: 0,
          }}>
            <div style={{
              width: BASE_WIDTH,
              height: BASE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              background: "linear-gradient(180deg, #0d1120 0%, #080c14 100%)",
              display: "flex",
              flexDirection: "column",
              fontFamily: fontBody,
              position: "relative",
            }}>
              {/* ── Title ─────────────────────────────────────────────────── */}
              <div style={{ padding: "14px 0 4px", textAlign: "center", flexShrink: 0 }}>
                <h1 style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: fontDisplay,
                  letterSpacing: 2,
                  background: "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}>
                  {config.title}
                  {config.subtitle && <><br />{config.subtitle}</>}
                </h1>
              </div>

              {/* ── Year display ───────────────────────────────────────────── */}
              <div style={{
                padding: "2px 16px 0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 52,
                  fontWeight: 900,
                  fontFamily: fontDisplay,
                  color: "#ffffff",
                  letterSpacing: 2,
                  lineHeight: 1,
                  display: "inline-block",
                  minWidth: "4ch",
                  textAlign: "right",
                }}>
                  {frame.year}
                </span>
              </div>

              {/* ── Event ticker ───────────────────────────────────────────── */}
              <div style={{ height: 20, flexShrink: 0, padding: "0 12px" }}>
                <div style={{ height: "100%", overflow: "hidden", position: "relative" }}>
                  {eventBanner && (() => {
                    const tProg = tickerDurationNormalized > 0
                      ? clamp01((virtualProgress - eventStartProgress) / tickerDurationNormalized)
                      : 1;
                    if (tProg >= 1) return null;
                    const pxPart = 420 - tProg * 840;
                    const pctPart = tProg * 100;
                    return (
                      <span style={{
                        display: "inline-block",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: "#ffd60a",
                        letterSpacing: 0.5,
                        textShadow: "0 0 10px #ffd60a88",
                        fontFamily: fontBody,
                        whiteSpace: "nowrap",
                        transform: `translateX(calc(${pxPart}px - ${pctPart}%))`,
                        willChange: "transform",
                      }}>
                        {eventBanner}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* ── Stacked area chart ─────────────────────────────────────── */}
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 12px",
              }}>
                <svg
                  viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                  width={CHART_WIDTH}
                  height={CHART_HEIGHT}
                  style={{ display: "block" }}
                  preserveAspectRatio="none"
                >
                  {/* Background grid lines */}
                  {[0, 25, 50, 75, 100].map(pct => {
                    const y = CHART_HEIGHT - (pct / 100) * CHART_HEIGHT;
                    return (
                      <line
                        key={pct}
                        x1={0}
                        y1={y}
                        x2={CHART_WIDTH}
                        y2={y}
                        stroke="#1a2235"
                        strokeWidth={pct === 0 || pct === 100 ? 1.5 : 0.5}
                        strokeDasharray={pct === 0 || pct === 100 ? "none" : "4 4"}
                      />
                    );
                  })}
                  {/* Y-axis labels */}
                  {[0, 25, 50, 75, 100].map(pct => {
                    const y = CHART_HEIGHT - (pct / 100) * CHART_HEIGHT;
                    return (
                      <text
                        key={`label-${pct}`}
                        x={2}
                        y={y - 3}
                        fill="#86a6c8"
                        fontSize={9}
                        fontFamily={fontBody}
                      >
                        {pct}%
                      </text>
                    );
                  })}
                  {/* Stacked area paths */}
                  {areaPaths.map((d, i) => (
                    <path
                      key={itemIds[i]}
                      d={d}
                      fill={colorMap[itemIds[i]] ?? "#555"}
                      opacity={0.85}
                      stroke={colorMap[itemIds[i]] ?? "#555"}
                      strokeWidth={0.5}
                    />
                  ))}
                </svg>
              </div>

              {/* ── Legend ──────────────────────────────────────────────────── */}
              <div style={{
                padding: "6px 12px 4px",
                display: "flex",
                flexWrap: "wrap",
                gap: "3px 10px",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {config.items.map(item => {
                  const pct = currentVals[item.id] ?? 0;
                  return (
                    <div key={item.id} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: 10,
                        color: "#c0cfe0",
                        fontFamily: fontBody,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}>
                        {item.name}
                        <span style={{ color: "#ffd60a", marginLeft: 3 }}>
                          {pct.toFixed(1)}%
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ── Source label ────────────────────────────────────────────── */}
              {config.sourceLabel && (
                <div style={{
                  textAlign: "center",
                  fontSize: 9,
                  color: "#4a6a8a",
                  padding: "0 12px 2px",
                  fontFamily: fontBody,
                  flexShrink: 0,
                }}>
                  {config.sourceLabel}
                </div>
              )}

              {/* ── Timeline ───────────────────────────────────────────────── */}
              <div style={{ padding: "4px 12px 4px", fontFamily: fontBody }}>
                <div style={{
                  width: "100%",
                  height: 2,
                  background: "#1e2d45",
                  borderRadius: 1,
                  position: "relative",
                  marginBottom: 6,
                }}>
                  <div style={{
                    width: `${timelineProgress * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #ffd60a, #ff9500)",
                    borderRadius: 1,
                    transition: isRecording ? "none" : "width 0.1s linear",
                  }} />
                  <div style={{
                    position: "absolute",
                    left: `${timelineProgress * 100}%`,
                    top: -3,
                    width: 8,
                    height: 8,
                    background: "#ffd60a",
                    borderRadius: "50%",
                    transform: "translateX(-50%)",
                    boxShadow: "0 0 6px #ffd60a",
                    transition: isRecording ? "none" : "left 0.1s linear",
                  }} />
                </div>
                <div style={{ position: "relative", height: 14, fontSize: 10, letterSpacing: 0.4, lineHeight: 1.1 }}>
                  {timelineLabelYears.map((year, index) => {
                    const positionPct = ((year - config.startYear) / yearRange) * 100;
                    const isFirst = index === 0;
                    const isLast = index === timelineLabelYears.length - 1;
                    const isActive = frame.year === year;
                    const isReached = frame.year >= year;
                    return (
                      <span key={year} style={{
                        position: "absolute",
                        left: `${positionPct}%`,
                        transform: isFirst ? "translateX(0)" : isLast ? "translateX(-100%)" : "translateX(-50%)",
                        color: isActive ? "#fff0ad" : "#86a6c8",
                        fontWeight: isActive ? 700 : 600,
                        fontSize: isActive ? 12 : 10,
                        textShadow: isActive ? "0 0 10px #fff0ad88" : "none",
                        whiteSpace: "nowrap",
                        opacity: isReached ? 1 : 0,
                        transition: isRecording ? "none" : "opacity 0.4s ease, font-size 0.2s ease, color 0.3s ease",
                      }}>
                        {year}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* ── Subscribe CTA at 15s ───────────────────────────────────── */}
              {(() => {
                const elapsedSec = virtualProgress * (targetDuration / 1000);
                if (elapsedSec < 14.5 || elapsedSec > 18.5) return null;
                let opacity = 1;
                if (elapsedSec < 15.5) opacity = (elapsedSec - 14.5) / 1;
                else if (elapsedSec > 17) opacity = 1 - (elapsedSec - 17) / 1.5;
                const btnScale = 0.9 + 0.1 * opacity;
                return (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 100, pointerEvents: "none",
                    opacity,
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "linear-gradient(135deg, #ff0000, #cc0000)",
                      borderRadius: 24, padding: "10px 24px",
                      boxShadow: `0 4px ${24 * opacity}px rgba(255,0,0,${0.5 * opacity}), 0 0 ${60 * opacity}px rgba(255,0,0,${0.2 * opacity})`,
                      transform: `scale(${btnScale})`,
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

              {/* 60px bottom spacer for Shorts UI */}
              <div style={{ height: 60, flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
