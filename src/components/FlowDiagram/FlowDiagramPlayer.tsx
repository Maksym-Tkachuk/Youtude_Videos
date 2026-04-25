import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { FlowConfig, FlowLink } from "./types";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;

const DEFAULT_TARGET_DURATION = 45_000;
const TEST_ID_PREFIX = "bar-race";

const FONT_DISPLAY = "'Bebas Neue', 'Trebuchet MS', sans-serif";
const FONT_BODY = "'Barlow Condensed', 'Trebuchet MS', sans-serif";

const COLORS = {
  pageBg: "#080c14",
  canvasBg: "#0d1120",
  canvasBgEnd: "#080c14",
  titleGradient: "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
  yearColor: "#ffffff",
  timelineBg: "#1e2d45",
  timelineGradient: "linear-gradient(90deg, #ffd60a, #ff9500)",
  timelineDot: "#ffd60a",
  timelineLabelColor: "#86a6c8",
  timelineLabelActiveColor: "#fff0ad",
  controlAccent: "#ffd60a",
  controlSecondary: "#4a9fc8",
  controlBg: "#0d1120",
  controlActiveBg: "#1a1500",
};

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/** Interpolate flow links between two milestone years. */
function interpolateFlows(
  flowsMap: Record<number, FlowLink[]>,
  year: number,
  sourceIds: string[],
  destIds: string[],
): FlowLink[] {
  const years = Object.keys(flowsMap).map(Number).sort((a, b) => a - b);
  if (years.length === 0) return [];

  if (year <= years[0]) return flowsMap[years[0]];
  if (year >= years[years.length - 1]) return flowsMap[years[years.length - 1]];

  let lo = 0;
  for (let i = 0; i < years.length - 1; i++) {
    if (year >= years[i] && year <= years[i + 1]) { lo = i; break; }
  }

  const y0 = years[lo];
  const y1 = years[lo + 1];
  const t = (year - y0) / (y1 - y0);
  // Smooth ease
  const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const a = flowsMap[y0];
  const b = flowsMap[y1];

  // Build lookup for flows
  const key = (from: string, to: string) => `${from}__${to}`;
  const mapA = new Map<string, number>();
  const mapB = new Map<string, number>();
  for (const f of a) mapA.set(key(f.from, f.to), f.value);
  for (const f of b) mapB.set(key(f.from, f.to), f.value);

  // Merge all possible pairs
  const allKeys = new Set<string>();
  for (const sid of sourceIds) {
    for (const did of destIds) {
      const k = key(sid, did);
      if (mapA.has(k) || mapB.has(k)) allKeys.add(k);
    }
  }

  const result: FlowLink[] = [];
  for (const k of allKeys) {
    const va = mapA.get(k) ?? 0;
    const vb = mapB.get(k) ?? 0;
    const interpolated = va + (vb - va) * eased;
    if (interpolated > 0.01) {
      const [from, to] = k.split("__");
      result.push({ from, to, value: interpolated });
    }
  }
  return result;
}

interface FrameData {
  year: number;
  month: number;
  flows: FlowLink[];
}

function buildFlowFrames(config: FlowConfig): FrameData[] {
  const framesPerYear = config.framesPerYear ?? 6;
  const playbackFramesPerYear = framesPerYear === 1 ? 6 : framesPerYear;
  const sourceIds = config.sources.map(s => s.id);
  const destIds = config.destinations.map(d => d.id);
  const frames: FrameData[] = [];

  for (let y = config.startYear; y <= config.endYear; y++) {
    for (let m = 0; m < playbackFramesPerYear; m++) {
      const decYear = y + m / playbackFramesPerYear;
      const flows = interpolateFlows(config.flows, decYear, sourceIds, destIds);
      frames.push({ year: y, month: m, flows });
    }
  }
  return frames;
}

// ── Diagram geometry ──

const DIAGRAM_TOP = 0;
const DIAGRAM_HEIGHT = 400;
const DIAGRAM_WIDTH = 381; // inside 12px padding on each side
const BAR_WIDTH = 55;
const BAR_GAP = 6;
const MIN_BAR_HEIGHT = 14;

interface BarLayout {
  id: string;
  name: string;
  color: string;
  y: number;
  height: number;
  total: number;
}

interface PathLayout {
  from: string;
  to: string;
  value: number;
  sourceColor: string;
  sourceY: number;
  sourceHeight: number;
  destY: number;
  destHeight: number;
}

function computeLayout(
  config: FlowConfig,
  flows: FlowLink[],
): { sourceBars: BarLayout[]; destBars: BarLayout[]; paths: PathLayout[] } {
  // Compute totals
  const sourceTotals = new Map<string, number>();
  const destTotals = new Map<string, number>();
  for (const s of config.sources) sourceTotals.set(s.id, 0);
  for (const d of config.destinations) destTotals.set(d.id, 0);

  for (const f of flows) {
    sourceTotals.set(f.from, (sourceTotals.get(f.from) ?? 0) + f.value);
    destTotals.set(f.to, (destTotals.get(f.to) ?? 0) + f.value);
  }

  // Sort by total descending
  const sortedSources = [...config.sources]
    .map(s => ({ ...s, total: sourceTotals.get(s.id) ?? 0 }))
    .sort((a, b) => b.total - a.total);
  const sortedDests = [...config.destinations]
    .map(d => ({ ...d, total: destTotals.get(d.id) ?? 0 }))
    .sort((a, b) => b.total - a.total);

  // Layout bars proportionally
  function layoutBars(entities: typeof sortedSources): BarLayout[] {
    const totalValue = entities.reduce((s, e) => s + e.total, 0);
    if (totalValue === 0) {
      // Even distribution
      const h = (DIAGRAM_HEIGHT - BAR_GAP * (entities.length - 1)) / entities.length;
      return entities.map((e, i) => ({
        id: e.id, name: e.name, color: e.color,
        y: DIAGRAM_TOP + i * (h + BAR_GAP),
        height: h,
        total: 0,
      }));
    }

    const usableHeight = DIAGRAM_HEIGHT - BAR_GAP * (entities.length - 1);
    const minTotal = MIN_BAR_HEIGHT * entities.length;
    const bars: BarLayout[] = [];
    let y = DIAGRAM_TOP;

    for (const e of entities) {
      const rawH = usableHeight * (e.total / totalValue);
      const h = Math.max(MIN_BAR_HEIGHT, rawH < minTotal / entities.length ? MIN_BAR_HEIGHT : rawH);
      bars.push({ id: e.id, name: e.name, color: e.color, y, height: h, total: e.total });
      y += h + BAR_GAP;
    }

    // Normalize to fit in DIAGRAM_HEIGHT
    const totalUsed = bars.reduce((s, b) => s + b.height, 0) + BAR_GAP * (bars.length - 1);
    if (totalUsed > DIAGRAM_HEIGHT) {
      const scale = (DIAGRAM_HEIGHT - BAR_GAP * (bars.length - 1)) /
        bars.reduce((s, b) => s + b.height, 0);
      let yy = DIAGRAM_TOP;
      for (const b of bars) {
        b.height *= scale;
        b.y = yy;
        yy += b.height + BAR_GAP;
      }
    }

    return bars;
  }

  const sourceBars = layoutBars(sortedSources);
  const destBars = layoutBars(sortedDests);

  // Build paths
  const sourceBarMap = new Map(sourceBars.map(b => [b.id, b]));
  const destBarMap = new Map(destBars.map(b => [b.id, b]));

  // Track cumulative offsets within each bar for stacking flows
  const sourceOffsets = new Map<string, number>();
  const destOffsets = new Map<string, number>();
  for (const b of sourceBars) sourceOffsets.set(b.id, 0);
  for (const b of destBars) destOffsets.set(b.id, 0);

  // Sort flows by value descending for visual priority
  const sortedFlows = [...flows].sort((a, b) => b.value - a.value);

  const paths: PathLayout[] = [];
  for (const f of sortedFlows) {
    const sBar = sourceBarMap.get(f.from);
    const dBar = destBarMap.get(f.to);
    if (!sBar || !dBar || f.value <= 0) continue;

    const sTotal = sBar.total || 1;
    const dTotal = dBar.total || 1;
    const sFlowH = (f.value / sTotal) * sBar.height;
    const dFlowH = (f.value / dTotal) * dBar.height;
    const sOff = sourceOffsets.get(f.from) ?? 0;
    const dOff = destOffsets.get(f.to) ?? 0;

    paths.push({
      from: f.from,
      to: f.to,
      value: f.value,
      sourceColor: sBar.color,
      sourceY: sBar.y + sOff,
      sourceHeight: sFlowH,
      destY: dBar.y + dOff,
      destHeight: dFlowH,
    });

    sourceOffsets.set(f.from, sOff + sFlowH);
    destOffsets.set(f.to, dOff + dFlowH);
  }

  return { sourceBars, destBars, paths };
}

// ── Component ──

export default function FlowDiagramPlayer({ config }: { config: FlowConfig }) {
  const frames = useMemo(() => buildFlowFrames(config), [config]);
  const totalFrames = frames.length;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale = outputWidth / BASE_WIDTH;

  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;
  const framesPerYear = config.framesPerYear ?? 6;
  const intervalYears = 5;

  const [frameIdx, setFrameIdx] = useState(0);
  const [subFrame, setSubFrame] = useState(0);
  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [eventBanner, setEventBanner] = useState<string | null>(null);
  const [eventStartProgress, setEventStartProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const virtualProgressRef = useRef(virtualProgress);
  virtualProgressRef.current = virtualProgress;

  const isRecording = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).has("record");

  const TICKER_DURATION_MS = 18_000;
  const tickerDurationNormalized = Math.min(1, TICKER_DURATION_MS / Math.max(targetDuration, 1));

  // ── Recording API ──
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
        setFrameIdx(0); setSubFrame(0); setVirtualProgress(0);
        setEventBanner(null); setPlaying(true);
      },
      setProgress: (t: number) => {
        const clamped = clamp01(t);
        if (totalFrames > 1) {
          const raw = clamped * (totalFrames - 1);
          const idx = Math.min(Math.floor(raw), totalFrames - 1);
          const sub = raw - idx;
          setFrameIdx(idx);
          setSubFrame(sub);
        } else {
          setFrameIdx(0);
          setSubFrame(0);
        }
        setVirtualProgress(clamped);
        setPlaying(false);
      },
    };
    return () => { delete (window as any).__barRace; }; // eslint-disable-line @typescript-eslint/no-explicit-any
  }, [totalFrames, targetDuration, config.title]);

  // ── Event banner ──
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

  // ── Playback loop ──
  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      playbackStartRef.current = null;
      return;
    }

    const startProg = virtualProgressRef.current;
    playbackStartRef.current = performance.now() - startProg * targetDuration;

    const animate = (now: number) => {
      if (playbackStartRef.current === null) return;

      const progress = clamp01((now - playbackStartRef.current) / targetDuration);
      const raw = progress * (totalFrames - 1);
      const idx = Math.min(Math.floor(raw), totalFrames - 1);
      const sub = raw - idx;

      setFrameIdx(idx);
      setSubFrame(sub);
      setVirtualProgress(progress);

      if (progress >= 1) {
        setFrameIdx(totalFrames - 1);
        setSubFrame(0);
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
      setFrameIdx(0); setSubFrame(0); setVirtualProgress(0); setPlaying(true);
    } else {
      setPlaying(p => !p);
    }
  }, [frameIdx, totalFrames]);

  // ── Compute current interpolated flows ──
  const nextFrame = frames[Math.min(frameIdx + 1, totalFrames - 1)];
  const blendedFlows = useMemo(() => {
    const a = frame.flows;
    const b = nextFrame.flows;
    const t = subFrame;
    const key = (f: FlowLink) => `${f.from}__${f.to}`;
    const mapA = new Map<string, number>();
    const mapB = new Map<string, number>();
    for (const f of a) mapA.set(key(f), f.value);
    for (const f of b) mapB.set(key(f), f.value);
    const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);
    const result: FlowLink[] = [];
    for (const k of allKeys) {
      const va = mapA.get(k) ?? 0;
      const vb = mapB.get(k) ?? 0;
      const v = va + (vb - va) * t;
      if (v > 0.01) {
        const [from, to] = k.split("__");
        result.push({ from, to, value: v });
      }
    }
    return result;
  }, [frame.flows, nextFrame.flows, subFrame]);

  const layout = useMemo(
    () => computeLayout(config, blendedFlows),
    [config, blendedFlows],
  );

  // ── Timeline ──
  const yearRange = Math.max(1, config.endYear - config.startYear);
  const yearSpan = config.endYear - config.startYear;
  const showMonth = framesPerYear > 1 && yearSpan <= 30;
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthIdx = showMonth
    ? Math.min(11, Math.floor((frame.month / (framesPerYear === 1 ? 6 : framesPerYear)) * 12))
    : 0;
  const timelineProgress = totalFrames > 1 ? frameIdx / (totalFrames - 1) : 0;

  // Timeline labels
  const labelYears: number[] = [];
  for (let y = config.startYear; y <= config.endYear; y += intervalYears) {
    labelYears.push(y);
  }
  const lastGrid = labelYears[labelYears.length - 1];
  if (lastGrid < config.endYear && (config.endYear - lastGrid) >= intervalYears * 0.7) {
    labelYears.push(config.endYear);
  }

  // ── Total flow value for display ──
  const totalFlowValue = blendedFlows.reduce((s, f) => s + f.value, 0);

  return (
    <>
    <div data-testid={`${TEST_ID_PREFIX}-page`} style={{
      minHeight: "100vh",
      background: COLORS.pageBg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      boxSizing: "border-box",
      fontFamily: FONT_BODY,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", flexShrink: 0 }}>
          <button
            data-testid={`${TEST_ID_PREFIX}-controls-toggle`}
            onClick={togglePlay}
            style={{
              background: playing ? COLORS.controlActiveBg : COLORS.controlBg,
              border: `1px solid ${playing ? COLORS.controlAccent : COLORS.controlSecondary}`,
              color: playing ? COLORS.controlAccent : COLORS.controlSecondary,
              borderRadius: 8,
              padding: "12px 18px",
              fontSize: 20,
              cursor: "pointer",
              width: 56,
            }}
          >
            {playing ? "\u23F8" : frameIdx >= totalFrames - 1 ? "\u21BA" : "\u25B6"}
          </button>
        </div>
        <div data-testid={`${TEST_ID_PREFIX}-viewport`} style={{
          width: outputWidth,
          height: outputHeight,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(0,0,0,0.8)",
          flexShrink: 0,
        }}>
          <div data-testid={`${TEST_ID_PREFIX}-canvas`} style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            background: `linear-gradient(180deg, ${COLORS.canvasBg} 0%, ${COLORS.canvasBgEnd} 100%)`,
            display: "flex",
            flexDirection: "column",
            fontFamily: FONT_BODY,
            position: "relative",
          }}>
            {/* Header */}
            <div style={{ padding: "12px 0 4px", textAlign: "center", flexShrink: 0 }}>
              <h1 style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                fontFamily: FONT_DISPLAY,
                letterSpacing: 2,
                background: COLORS.titleGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}>
                {config.title}
                {config.subtitle && <><br />{config.subtitle}</>}
              </h1>
            </div>

            {/* Year + total */}
            <div style={{
              padding: "2px 16px 2px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.timelineLabelColor,
                fontFamily: FONT_BODY,
              }}>
                {config.unitLabel}: {config.formatValue(totalFlowValue)}
              </span>
              <span style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: FONT_DISPLAY,
                color: COLORS.yearColor,
                letterSpacing: 2,
                lineHeight: 1,
                minWidth: "4ch",
                textAlign: "right",
              }}>
                {frame.year}
              </span>
            </div>

            {showMonth && (
              <div style={{ textAlign: "right", padding: "0 16px", marginTop: -4 }}>
                <span style={{
                  fontSize: 14, fontWeight: 600, fontFamily: FONT_BODY,
                  color: "#6b8aad", letterSpacing: 1, textTransform: "uppercase",
                }}>
                  {monthNames[monthIdx]}
                </span>
              </div>
            )}

            {/* Event ticker */}
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
                      fontFamily: FONT_BODY,
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

            {/* Flow Diagram */}
            <div style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <svg
                width={DIAGRAM_WIDTH}
                height={DIAGRAM_HEIGHT}
                viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
                style={{ overflow: "visible" }}
              >
                {/* Flow paths */}
                {layout.paths.map((p, i) => {
                  const x0 = BAR_WIDTH;
                  const x1 = DIAGRAM_WIDTH - BAR_WIDTH;
                  const cpx = (x0 + x1) / 2;

                  const sy0 = p.sourceY;
                  const sy1 = p.sourceY + p.sourceHeight;
                  const dy0 = p.destY;
                  const dy1 = p.destY + p.destHeight;

                  const d = [
                    `M ${x0} ${sy0}`,
                    `C ${cpx} ${sy0}, ${cpx} ${dy0}, ${x1} ${dy0}`,
                    `L ${x1} ${dy1}`,
                    `C ${cpx} ${dy1}, ${cpx} ${sy1}, ${x0} ${sy1}`,
                    "Z",
                  ].join(" ");

                  const maxThickness = Math.max(p.sourceHeight, p.destHeight);
                  const opacity = 0.35 + Math.min(0.45, maxThickness / DIAGRAM_HEIGHT * 2);

                  return (
                    <path
                      key={`${p.from}-${p.to}-${i}`}
                      d={d}
                      fill={p.sourceColor}
                      opacity={opacity}
                      style={{
                        transition: isRecording ? "none" : "d 0.15s ease, opacity 0.15s ease",
                      }}
                    />
                  );
                })}

                {/* Source bars (left) */}
                {layout.sourceBars.map(bar => (
                  <g key={`src-${bar.id}`}>
                    <rect
                      x={0}
                      y={bar.y}
                      width={BAR_WIDTH}
                      height={bar.height}
                      rx={3}
                      fill={bar.color}
                    />
                    {bar.height >= 16 && (
                      <text
                        x={BAR_WIDTH - 6}
                        y={bar.y + bar.height / 2}
                        textAnchor="end"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize={bar.height >= 28 ? 11 : 9}
                        fontWeight={700}
                        fontFamily={FONT_BODY}
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                      >
                        {bar.name}
                      </text>
                    )}
                    {bar.height >= 28 && bar.total > 0 && (
                      <text
                        x={BAR_WIDTH - 6}
                        y={bar.y + bar.height / 2 + 12}
                        textAnchor="end"
                        dominantBaseline="central"
                        fill="rgba(255,255,255,0.7)"
                        fontSize={8}
                        fontFamily={FONT_BODY}
                      >
                        {config.formatValue(bar.total)}
                      </text>
                    )}
                  </g>
                ))}

                {/* Destination bars (right) */}
                {layout.destBars.map(bar => (
                  <g key={`dst-${bar.id}`}>
                    <rect
                      x={DIAGRAM_WIDTH - BAR_WIDTH}
                      y={bar.y}
                      width={BAR_WIDTH}
                      height={bar.height}
                      rx={3}
                      fill={bar.color}
                    />
                    {bar.height >= 16 && (
                      <text
                        x={DIAGRAM_WIDTH - BAR_WIDTH + 6}
                        y={bar.y + bar.height / 2}
                        textAnchor="start"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize={bar.height >= 28 ? 11 : 9}
                        fontWeight={700}
                        fontFamily={FONT_BODY}
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                      >
                        {bar.name}
                      </text>
                    )}
                    {bar.height >= 28 && bar.total > 0 && (
                      <text
                        x={DIAGRAM_WIDTH - BAR_WIDTH + 6}
                        y={bar.y + bar.height / 2 + 12}
                        textAnchor="start"
                        dominantBaseline="central"
                        fill="rgba(255,255,255,0.7)"
                        fontSize={8}
                        fontFamily={FONT_BODY}
                      >
                        {config.formatValue(bar.total)}
                      </text>
                    )}
                  </g>
                ))}

                {/* Column labels */}
                <text
                  x={BAR_WIDTH / 2}
                  y={DIAGRAM_HEIGHT + 18}
                  textAnchor="middle"
                  fill={COLORS.timelineLabelColor}
                  fontSize={10}
                  fontWeight={700}
                  fontFamily={FONT_BODY}
                  letterSpacing={1}
                  style={{ textTransform: "uppercase" }}
                >
                  EXPORTERS
                </text>
                <text
                  x={DIAGRAM_WIDTH - BAR_WIDTH / 2}
                  y={DIAGRAM_HEIGHT + 18}
                  textAnchor="middle"
                  fill={COLORS.timelineLabelColor}
                  fontSize={10}
                  fontWeight={700}
                  fontFamily={FONT_BODY}
                  letterSpacing={1}
                  style={{ textTransform: "uppercase" }}
                >
                  IMPORTERS
                </text>
              </svg>
            </div>

            {/* Source label */}
            {config.sourceLabel && (
              <div style={{
                padding: "2px 12px",
                textAlign: "right",
                fontSize: 9,
                color: COLORS.timelineLabelColor,
                fontFamily: FONT_BODY,
                opacity: 0.7,
                flexShrink: 0,
              }}>
                {config.sourceLabel}
              </div>
            )}

            {/* Timeline */}
            <div style={{ padding: "8px 12px 6px", fontFamily: FONT_BODY }}>
              <div style={{
                width: "100%",
                height: 2,
                background: COLORS.timelineBg,
                borderRadius: 1,
                position: "relative",
                marginBottom: 6,
              }}>
                <div style={{
                  width: `${timelineProgress * 100}%`,
                  height: "100%",
                  background: COLORS.timelineGradient,
                  borderRadius: 1,
                  transition: isRecording ? "none" : "width 0.1s linear",
                }} />
                <div style={{
                  position: "absolute",
                  left: `${timelineProgress * 100}%`,
                  top: -3,
                  width: 8,
                  height: 8,
                  background: COLORS.timelineDot,
                  borderRadius: "50%",
                  transform: "translateX(-50%)",
                  boxShadow: `0 0 6px ${COLORS.timelineDot}`,
                  transition: isRecording ? "none" : "left 0.1s linear",
                }} />
              </div>
              <div style={{ position: "relative", height: 14, fontSize: 10, letterSpacing: 0.4, lineHeight: 1.1 }}>
                {labelYears.map((year, index) => {
                  const positionPct = ((year - config.startYear) / yearRange) * 100;
                  const isFirst = index === 0;
                  const isLast = index === labelYears.length - 1;
                  const isReached = frame.year >= year;
                  const isActive = frame.year === year;

                  return (
                    <span key={year} style={{
                      position: "absolute",
                      left: `${positionPct}%`,
                      transform: isFirst ? "translateX(0)" : isLast ? "translateX(-100%)" : "translateX(-50%)",
                      color: isActive ? COLORS.timelineLabelActiveColor : COLORS.timelineLabelColor,
                      fontWeight: isActive ? 700 : 600,
                      fontSize: isActive ? 12 : 10,
                      textShadow: isActive ? `0 0 10px ${COLORS.timelineLabelActiveColor}88` : "none",
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

            {/* Subscribe CTA */}
            {(() => {
              const elapsedSec = virtualProgress * (targetDuration / 1000);
              if (elapsedSec < 14.5 || elapsedSec > 18.5) return null;
              let opacity = 1;
              if (elapsedSec < 15.5) opacity = (elapsedSec - 14.5) / 1;
              else if (elapsedSec > 17) opacity = 1 - (elapsedSec - 17) / 1.5;
              const pulseScale = 0.9 + 0.1 * opacity;
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
                    transform: `scale(${pulseScale})`,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    <span style={{
                      color: "#ffffff", fontSize: 16, fontWeight: 800,
                      fontFamily: FONT_BODY, letterSpacing: 1.5, textTransform: "uppercase",
                    }}>
                      Subscribe
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* 60px bottom spacer */}
            <div style={{ height: 60, flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ width: outputWidth, marginTop: 16 }}>
        <input
          type="range"
          min={0}
          max={totalFrames - 1}
          value={frameIdx}
          onChange={e => { setPlaying(false); setFrameIdx(Number(e.target.value)); setSubFrame(0); }}
          style={{ width: "100%", accentColor: COLORS.controlAccent, cursor: "pointer", marginBottom: 12 }}
        />
      </div>
    </div>
    </>
  );
}
