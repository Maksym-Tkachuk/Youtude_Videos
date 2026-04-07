import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { BarRaceConfig, BarRaceTheme, Frame } from "./types";
import { buildFrames, scalePct, MONTH_NAMES } from "./utils";
import BarRow from "./BarRow";
import Timeline from "./Timeline";
import Controls from "./Controls";

const BASE_WIDTH  = 405;
const BASE_HEIGHT = 720;

const DEFAULT_THEME: BarRaceTheme = {
  pageBg:                   "#080c14",
  canvasBg:                 "#0d1120",
  canvasBgEnd:              "#080c14",
  titleGradient:            "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
  yearColor:                "#ffffff",
  monthColor:               "#6b8aad",
  barTrackBg:               "#1a2235",
  timelineBg:               "#1e2d45",
  timelineGradient:         "linear-gradient(90deg, #ffd60a, #ff9500)",
  timelineDot:              "#ffd60a",
  timelineLabelColor:       "#86a6c8",
  timelineLabelActiveColor: "#fff0ad",
  controlAccent:            "#ffd60a",
  controlSecondary:         "#4a9fc8",
  controlBg:                "#0d1120",
  controlActiveBg:          "#1a1500",
  noDataColor:              "#1e3255",
  fontDisplay:              "'Bebas Neue', 'Trebuchet MS', sans-serif",
  fontBody:                 "'Barlow Condensed', 'Trebuchet MS', sans-serif",
};

const DEFAULT_TARGET_DURATION = 55_000;
const PLAYBACK_EASE_POWER = 1.7;
const TEST_ID_PREFIX = "bar-race";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function easePlaybackProgress(progress: number): number {
  return 1 - Math.pow(1 - clamp01(progress), PLAYBACK_EASE_POWER);
}

function invertPlaybackProgress(progress: number): number {
  return 1 - Math.pow(1 - clamp01(progress), 1 / PLAYBACK_EASE_POWER);
}

function DatasetDropdown({ datasets, selected, onChange, theme, testIdPrefix }: {
  datasets: { label: string; config: BarRaceConfig }[];
  selected: number;
  onChange: (i: number) => void;
  theme: BarRaceTheme;
  testIdPrefix: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", width: 56 }} data-testid={`${testIdPrefix}-dataset-dropdown`}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: theme.controlBg,
          border: `1px solid ${theme.controlSecondary}`,
          color: theme.controlSecondary,
          borderRadius: 8,
          padding: "8px 4px",
          fontSize: 18,
          cursor: "pointer",
          lineHeight: 1,
        }}
      >
        ☰
      </button>
      {open && (
        <div style={{
          position: "fixed",
          zIndex: 9999,
          background: "#0d1120",
          border: `1px solid ${theme.controlSecondary}`,
          borderRadius: 8,
          overflow: "auto",
          maxHeight: 320,
          minWidth: 160,
          boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
          transform: "translateX(calc(-100% + 56px))",
          marginTop: 4,
        }}>
          {datasets.map((ds, i) => (
            <div
              key={i}
              onClick={() => { onChange(i); setOpen(false); }}
              style={{
                padding: "10px 14px",
                fontSize: 13,
                cursor: "pointer",
                color: i === selected ? theme.controlAccent : theme.controlSecondary,
                background: i === selected ? "rgba(255,214,10,0.08)" : "transparent",
                borderBottom: i < datasets.length - 1 ? `1px solid rgba(255,255,255,0.05)` : "none",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={e => (e.currentTarget.style.background = i === selected ? "rgba(255,214,10,0.08)" : "transparent")}
            >
              {ds.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface BarRacePlayerProps {
  config: BarRaceConfig;
  datasets?: { label: string; config: BarRaceConfig }[];
  onDatasetChange?: (index: number) => void;
  selectedDataset?: number;
}

export default function BarRacePlayer({ config, datasets, onDatasetChange, selectedDataset }: BarRacePlayerProps) {
  const rawFrames = useMemo<Frame[]>(() => config.frames ?? buildFrames(config), [config]);
  const startFrameIdx = useMemo(() => {
    if (config.skipEmptyStartFrames === false) return 0;

    let bestIdx = 0;
    let bestCount = -1;

    for (let idx = 0; idx < rawFrames.length; idx++) {
      const filledCount = config.items.reduce((count, item) => (
        (rawFrames[idx].vals[item.id] ?? 0) > (config.minValue ?? 0) ? count + 1 : count
      ), 0);

      if (filledCount >= (config.topN ?? 10)) return idx;
      if (filledCount > bestCount) {
        bestCount = filledCount;
        bestIdx = idx;
      }
    }

    return bestIdx;
  }, [config.items, config.minValue, config.skipEmptyStartFrames, config.topN, rawFrames]);
  const frames = useMemo<Frame[]>(() => rawFrames.slice(startFrameIdx), [rawFrames, startFrameIdx]);
  const totalFrames = frames.length;

  const outputWidth   = config.videoWidth  ?? BASE_WIDTH;
  const outputHeight  = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale         = outputWidth / BASE_WIDTH;

  const topN           = config.topN           ?? 10;
  const targetDuration = config.targetDuration ?? (config.msPerFrame ? config.msPerFrame * totalFrames : DEFAULT_TARGET_DURATION);
  const scaleMode      = config.scaleMode      ?? "log";
  const minValue       = config.minValue       ?? 0;
  const framesPerYear  = config.framesPerYear  ?? 12;
  const barHeight      = config.barHeight      ?? 44;
  const gap            = config.gap            ?? 6;
  const slot           = barHeight + gap;
  const intervalYears  = config.timelineInterval ?? 5;
  const theme: BarRaceTheme = { ...DEFAULT_THEME, ...config.theme };
  const testIdPrefix = TEST_ID_PREFIX;

  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [endPulse, setEndPulse] = useState(false);
  const [eventBanner, setEventBanner] = useState<string | null>(null);
  const [eventBannerKey, setEventBannerKey] = useState(0);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const frameIdxRef = useRef(frameIdx);
  const endHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  frameIdxRef.current = frameIdx;

  const frame = frames[frameIdx];
  const timelineFrameIdx = startFrameIdx + frameIdx;
  const timelineTotalFrames = rawFrames.length;
  const frameMaxValues = useMemo(
    () => frames.map(entry => config.items.reduce((maxValue, item) => Math.max(maxValue, entry.vals[item.id] ?? 0), 0)),
    [config.items, frames]
  );
  const scaleWindowRadius = Math.max(2, Math.round((framesPerYear === 1 ? 6 : framesPerYear) / 2));

  // Current top items
  const allWithValues = config.items.map(item => ({ ...item, value: frame.vals[item.id] ?? 0 }));
  const topItems = allWithValues
    .filter(g => g.value > minValue)
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
  let maxVal = 1;
  const scaleWindowStart = Math.max(0, frameIdx - scaleWindowRadius);
  const scaleWindowEnd = Math.min(totalFrames - 1, frameIdx + scaleWindowRadius);
  for (let i = scaleWindowStart; i <= scaleWindowEnd; i++) {
    maxVal = Math.max(maxVal, frameMaxValues[i] ?? 0);
  }
  maxVal *= 1.02;
  const showMonth = framesPerYear === 12 && frame.month < 12;

  const prevFrameTopIds = useMemo(() => {
    if (frameIdx === 0) return new Set<string>();
    const pf = frames[frameIdx - 1];
    return new Set(
      config.items
        .map(item => ({ id: item.id, value: pf.vals[item.id] ?? 0 }))
        .filter(g => g.value > minValue)
        .sort((a, b) => b.value - a.value)
        .slice(0, topN)
        .map(g => g.id)
    );
  }, [config.items, frames, frameIdx, minValue, topN]);

  // Rank deltas: 5-frame rolling window to avoid flicker on fast playback
  const DELTA_WINDOW = 5;
  const rankDeltas: Record<string, number> = {};
  if (frameIdx > 0) {
    const lookbackIdx = Math.max(0, frameIdx - DELTA_WINDOW);
    const lookbackFrame = frames[lookbackIdx];
    const prevRankMap: Record<string, number> = {};
    config.items
      .map(item => ({ id: item.id, value: lookbackFrame.vals[item.id] ?? 0 }))
      .filter(g => g.value > minValue)
      .sort((a, b) => b.value - a.value)
      .slice(0, topN)
      .forEach((item, rank) => { prevRankMap[item.id] = rank; });
    topItems.forEach((item, rank) => {
      const prev = prevRankMap[item.id];
      rankDeltas[item.id] = prev !== undefined ? prev - rank : 0;
    });
  }

  // Event banner: show when year hits an event year
  const prevEventYearRef = useRef<number | null>(null);
  useEffect(() => {
    if (!config.events) return;
    const label = config.events[frame.year];
    if (label && frame.year !== prevEventYearRef.current) {
      prevEventYearRef.current = frame.year;
      if (eventClearRef.current) clearTimeout(eventClearRef.current);
      setEventBanner(label);
      setEventBannerKey(k => k + 1);
      eventClearRef.current = setTimeout(() => setEventBanner(null), 12000);
    }
  }, [frame.year, config.events]);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      playbackStartRef.current = null;
      return;
    }

    const currentFrameProgress = totalFrames > 1 ? frameIdxRef.current / (totalFrames - 1) : 1;
    const currentPlaybackProgress = invertPlaybackProgress(currentFrameProgress);
    playbackStartRef.current = performance.now() - currentPlaybackProgress * targetDuration;

    const animate = (now: number) => {
      if (playbackStartRef.current === null) return;

      const playbackProgress = targetDuration > 0
        ? clamp01((now - playbackStartRef.current) / targetDuration)
        : 1;
      const easedProgress = easePlaybackProgress(playbackProgress);
      const nextFrameIdx = totalFrames > 1
        ? Math.min(totalFrames - 1, Math.floor(easedProgress * (totalFrames - 1)))
        : 0;

      setFrameIdx(prev => (prev === nextFrameIdx ? prev : nextFrameIdx));

      if (playbackProgress >= 1 || nextFrameIdx >= totalFrames - 1) {
        setFrameIdx(totalFrames - 1);
        setPlaying(false);
        // End screen: pulse #1 bar for 3s
        setEndPulse(true);
        if (endHoldRef.current) clearTimeout(endHoldRef.current);
        endHoldRef.current = setTimeout(() => setEndPulse(false), 3000);
        playbackStartRef.current = null;
        rafRef.current = null;
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
    if (frameIdx >= totalFrames - 1) { setFrameIdx(0); setPlaying(true); setEndPulse(false); }
    else setPlaying(p => !p);
  }, [frameIdx, totalFrames]);

  return (
    <>
    <style>{`
      @keyframes barPulse { from { opacity: 1; } to { opacity: 0.7; } }
      @keyframes rowSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes newsTicker { from { transform: translateX(420px); } to { transform: translateX(calc(-100% - 420px)); } }
    `}</style>
    <div data-testid={`${testIdPrefix}-page`} style={{
      minHeight: "100vh",
      background: theme.pageBg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      boxSizing: "border-box",
      fontFamily: theme.fontBody,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", flexShrink: 0 }}>
        <button
          data-testid={`${testIdPrefix}-controls-toggle`}
          onClick={togglePlay}
          style={{
            background: playing ? theme.controlActiveBg : theme.controlBg,
            border: `1px solid ${playing ? theme.controlAccent : theme.controlSecondary}`,
            color: playing ? theme.controlAccent : theme.controlSecondary,
            borderRadius: 8,
            padding: "12px 18px",
            fontSize: 20,
            cursor: "pointer",
            width: 56,
          }}
        >
          {playing ? "⏸" : frameIdx >= totalFrames - 1 ? "↺" : "▶"}
        </button>
        {datasets && onDatasetChange && (
          <DatasetDropdown
            datasets={datasets}
            selected={selectedDataset ?? 0}
            onChange={onDatasetChange}
            theme={theme}
            testIdPrefix={testIdPrefix}
          />
        )}
      </div>
      <div data-testid={`${testIdPrefix}-viewport`} style={{
        width: outputWidth,
        height: outputHeight,
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(0,0,0,0.8)",
        flexShrink: 0,
      }}>
        <div data-testid={`${testIdPrefix}-canvas`} style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: `linear-gradient(180deg, ${theme.canvasBg} 0%, ${theme.canvasBgEnd} 100%)`,
          display: "flex",
          flexDirection: "column",
          fontFamily: theme.fontBody,
        }}>
          {/* Header */}
          <div data-testid={`${testIdPrefix}-header`} style={{ padding: "24px 0 8px", textAlign: "center", flexShrink: 0 }}>
            <h1 data-testid={`${testIdPrefix}-title`} style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              fontFamily: theme.fontDisplay,
              letterSpacing: 2,
              background: theme.titleGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}>
              {config.title}
              {config.subtitle && <><br />{config.subtitle}</>}
            </h1>
          </div>

          {/* Year Display — fixed width prevents layout shift when digits change */}
          <div data-testid={`${testIdPrefix}-date`} style={{
            padding: "4px 16px 4px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
            flexShrink: 0,
          }}>
            <span data-testid={`${testIdPrefix}-year`} style={{
              fontSize: 56,
              fontWeight: 900,
              fontFamily: theme.fontDisplay,
              color: theme.yearColor,
              letterSpacing: 2,
              lineHeight: 1,
              display: "inline-block",
              minWidth: "4ch",
              textAlign: "right",
            }}>
              {frame.year}
            </span>
            {showMonth && (
              <span data-testid={`${testIdPrefix}-month`} style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: theme.fontBody,
                color: theme.monthColor,
                marginLeft: 7,
                letterSpacing: 1,
                textTransform: "uppercase",
                display: "inline-block",
                width: "30px",
              }}>
                {MONTH_NAMES[frame.month]}
              </span>
            )}
          </div>

          {/* Event news ticker */}
          <div data-testid={`${testIdPrefix}-news-ticker`} style={{ height: 20, flexShrink: 0, padding: "0 12px" }}>
            <div style={{ height: "100%", overflow: "hidden" }}>
              {eventBanner && (
                <span data-testid={`${testIdPrefix}-news-ticker-text`} key={eventBannerKey} style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#ffd60a",
                  letterSpacing: 0.5,
                  textShadow: "0 0 10px #ffd60a88",
                  fontFamily: theme.fontBody,
                  whiteSpace: "nowrap",
                  animation: "newsTicker 12s linear forwards",
                }}>
                  {eventBanner}
                </span>
              )}
            </div>
          </div>

          {/* Race Chart — fixed topN slots so layout never jumps */}
          <div data-testid={`${testIdPrefix}-chart`} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div data-testid={`${testIdPrefix}-slots`} style={{ height: topN * slot, padding: "0 12px", position: "relative" }}>
              {/* Placeholder rows — always render topN slots so height is stable */}
              {Array.from({ length: topN }).map((_, rank) => (
                <div
                  key={`ph-${rank}`}
                  data-testid={`${testIdPrefix}-placeholder-row-${rank}`}
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    top: rank * slot,
                    height: barHeight,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span data-testid={`${testIdPrefix}-placeholder-rank-${rank}`} style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: theme.noDataColor,
                    width: 18,
                    textAlign: "right",
                    flexShrink: 0,
                  }}>
                    #{rank + 1}
                  </span>
                </div>
              ))}
              {/* Active items — keyed by id so React animates rank changes */}
              {topItems.map((item, rank) => {
                const pct = scalePct(item.value, maxVal, scaleMode);
                return (
                  <div
                    key={item.id}
                    data-testid={`${testIdPrefix}-active-row-${rank}`}
                    style={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      top: rank * slot,
                      height: barHeight,
                      transition: "top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <BarRow
                      item={item}
                      rank={rank}
                      rankDelta={rankDeltas[item.id] ?? 0}
                      pct={pct}
                      barHeight={barHeight}
                      isFirst={rank === 0}
                      isPulsing={rank === 0 && endPulse}
                      isNewEntry={!prevFrameTopIds.has(item.id)}
                      formatValue={config.formatValue}
                      formatValueFull={config.formatValueFull}
                      unitIcon={config.unitIcon}
                      valueUnit={config.valueUnit}
                      barTrackBg={theme.barTrackBg}
                      fontBody={theme.fontBody}
                      testIdPrefix={testIdPrefix}
                      testIdIndex={rank}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Timeline
            frameIdx={timelineFrameIdx}
            totalFrames={timelineTotalFrames}
            currentYear={frame.year}
            startYear={config.startYear}
            endYear={config.endYear}
            intervalYears={intervalYears}
            fontBody={theme.fontBody}
            testIdPrefix={testIdPrefix}
            theme={{
              bg:               theme.timelineBg,
              gradient:         theme.timelineGradient,
              dot:              theme.timelineDot,
              labelColor:       theme.timelineLabelColor,
              labelActiveColor: theme.timelineLabelActiveColor,
            }}
          />

          {/* Watermark */}
          {(config.sourceLabel || config.channelLabel) && (
            <div data-testid={`${testIdPrefix}-watermark`} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 14px 10px",
              flexShrink: 0,
            }}>
              {config.sourceLabel && (
                <span data-testid={`${testIdPrefix}-source-label`} style={{ fontSize: 10, color: theme.timelineLabelColor, letterSpacing: 0.5 }}>
                  {config.sourceLabel}
                </span>
              )}
              {config.channelLabel && (
                <span data-testid={`${testIdPrefix}-channel-label`} style={{ fontSize: 10, color: theme.timelineLabelColor, letterSpacing: 0.5, marginLeft: "auto" }}>
                  {config.channelLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      </div>

      <Controls
        playing={playing}
        frameIdx={frameIdx}
        totalFrames={totalFrames}
        videoWidth={outputWidth}
        testIdPrefix={testIdPrefix}
        onTogglePlay={togglePlay}
        onScrub={idx => { setPlaying(false); setFrameIdx(idx); }}
        theme={{
          accent:    theme.controlAccent,
          secondary: theme.controlSecondary,
          bg:        theme.controlBg,
          activeBg:  theme.controlActiveBg,
        }}
      />
    </div>
    </>
  );
}
