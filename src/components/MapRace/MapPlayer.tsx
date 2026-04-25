import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { MapRaceConfig, MapFrame } from "./types";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { makeIcon } from "../BarRace/datasets/makeIcon";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;

const DEFAULT_TARGET_DURATION = 45_000;

// ── Country slug → ISO 3166-1 numeric code ────────────────────────────────
const SLUG_TO_ISO: Record<string, string> = {
  usa: "840", china: "156", russia: "643", ussr: "643",
  uk: "826", france: "250", germany: "276", japan: "392",
  india: "356", brazil: "076", canada: "124", australia: "036",
  south_korea: "410", north_korea: "408", italy: "380",
  spain: "724", mexico: "484", indonesia: "360", turkey: "792",
  saudi_arabia: "682", iran: "364", iraq: "368", israel: "376",
  egypt: "818", south_africa: "710", pakistan: "586",
  ukraine: "804", poland: "616", sweden: "752", norway: "578",
  taiwan: "158", thailand: "764", vietnam: "704",
  argentina: "032", colombia: "170", nigeria: "566",
  uae: "784", qatar: "634", kuwait: "414",
  algeria: "012", morocco: "504", libya: "434",
  syria: "760", jordan: "400", cuba: "192",
  venezuela: "862", peru: "604", chile: "152",
  bangladesh: "050", philippines: "608", malaysia: "458",
  singapore: "702", greece: "300", netherlands: "528",
  belgium: "056", austria: "040", switzerland: "756",
  czech_republic: "203", romania: "642", hungary: "348",
  finland: "246", denmark: "208", portugal: "620",
  ireland: "372", new_zealand: "554", ethiopia: "231",
  kenya: "404", tanzania: "834", afghanistan: "004",
  myanmar: "104", cambodia: "116", laos: "418",
  nepal: "524", sri_lanka: "144", kazakhstan: "398",
  uzbekistan: "860", belarus: "112", georgia: "268",
  armenia: "051", azerbaijan: "031", serbia: "688",
  croatia: "191", bulgaria: "100", slovakia: "703",
  lithuania: "440", latvia: "428", estonia: "233",
  djibouti: "262", bahrain: "048", oman: "512", yemen: "887",
  somalia: "706",
};

// Default display names for country slugs
const DEFAULT_NAMES: Record<string, string> = {
  usa: "United States", china: "China", russia: "Russia", ussr: "USSR",
  uk: "United Kingdom", france: "France", germany: "Germany", japan: "Japan",
  india: "India", brazil: "Brazil", canada: "Canada", australia: "Australia",
  south_korea: "South Korea", north_korea: "North Korea", italy: "Italy",
  spain: "Spain", mexico: "Mexico", indonesia: "Indonesia", turkey: "Turkey",
  saudi_arabia: "Saudi Arabia", iran: "Iran", iraq: "Iraq", israel: "Israel",
  egypt: "Egypt", south_africa: "South Africa", pakistan: "Pakistan",
  ukraine: "Ukraine", poland: "Poland", sweden: "Sweden", norway: "Norway",
  taiwan: "Taiwan", thailand: "Thailand", vietnam: "Vietnam",
  argentina: "Argentina", nigeria: "Nigeria", uae: "UAE",
};

// USSR encompassed all these modern countries — when ussr has a value, color all of them
const USSR_ISO_CODES = [
  "643", // Russia
  "804", // Ukraine
  "112", // Belarus
  "398", // Kazakhstan
  "860", // Uzbekistan
  "795", // Turkmenistan
  "417", // Kyrgyzstan
  "762", // Tajikistan
  "268", // Georgia
  "051", // Armenia
  "031", // Azerbaijan
  "440", // Lithuania
  "428", // Latvia
  "233", // Estonia
  "498", // Moldova
];

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }

function backEaseOut(t: number): number {
  const c = 1.56;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

function interpolate(milestones: Record<number, number>, year: number): number {
  const keys = Object.keys(milestones).map(Number).sort((a, b) => a - b);
  if (year < keys[0]) return 0;
  if (year >= keys[keys.length - 1]) return milestones[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (year >= keys[i] && year <= keys[i + 1]) {
      const t = (year - keys[i]) / (keys[i + 1] - keys[i]);
      return milestones[keys[i]] + (milestones[keys[i + 1]] - milestones[keys[i]]) * t;
    }
  }
  return 0;
}

function buildMapFrames(config: MapRaceConfig): MapFrame[] {
  const frames: MapFrame[] = [];
  const fpy = config.framesPerYear ?? 12;
  const playbackFpy = fpy === 1 ? 6 : fpy;
  const slugs = Object.keys(config.milestones);
  for (let y = config.startYear; y <= config.endYear; y++) {
    for (let m = 0; m < playbackFpy; m++) {
      const decYear = y + m / playbackFpy;
      const vals: Record<string, number> = {};
      for (const slug of slugs) {
        vals[slug] = Math.max(0, interpolate(config.milestones[slug], decYear));
      }
      frames.push({ year: y, month: m, vals });
    }
  }
  return frames;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoFeature = any;

interface MapPlayerProps {
  config: MapRaceConfig;
}

export default function MapPlayer({ config }: MapPlayerProps) {
  const [topoData, setTopoData] = useState<GeoFeature[] | null>(null);

  // Load TopoJSON
  useEffect(() => {
    fetch("/world-110m.json")
      .then(r => r.json())
      .then((topo: Topology) => {
        const countries = feature(topo, topo.objects.countries as GeometryCollection);
        setTopoData(countries.features);
      });
  }, []);

  const frames = useMemo(() => buildMapFrames(config), [config]);
  const totalFrames = frames.length;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scale = outputWidth / BASE_WIDTH;

  const topN = config.topN ?? 5;
  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;

  const [frameIdx, setFrameIdx] = useState(0);
  const [subFrame, setSubFrame] = useState(0);
  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [, setEndPulse] = useState(false);
  const [eventBanner, setEventBanner] = useState<string | null>(null);
  const [eventStartProgress, setEventStartProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const frameIdxRef = useRef(frameIdx);
  const subFrameRef = useRef(subFrame);
  const virtualProgressRef = useRef(virtualProgress);
  const endHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isRecording = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).has("record");

  // Rank animation for recording mode
  const RANK_TRANSITION_S = 0.4;
  const rankTransDur = RANK_TRANSITION_S / (targetDuration / 1000);
  const prevRanksRef = useRef<Map<string, number>>(new Map());
  const rankAnimsRef = useRef<Map<string, { fromTop: number; startProg: number }>>(new Map());

  const TICKER_DURATION_MS = 18_000;
  const tickerDurationNormalized = Math.min(1, TICKER_DURATION_MS / Math.max(targetDuration, 1));

  frameIdxRef.current = frameIdx;
  subFrameRef.current = subFrame;
  virtualProgressRef.current = virtualProgress;

  // ── Recording API ─────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("record")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__barRace = {
      ready: !!topoData,
      finished: false,
      totalFrames,
      targetDuration,
      label: config.title,
      datasetCount: 0,
      datasetLabels: [] as string[],
      play: () => {
        setFrameIdx(0); setSubFrame(0); setVirtualProgress(0);
        setEventBanner(null); setPlaying(true); setEndPulse(false);
      },
      setProgress: (t: number) => {
        const clamped = clamp01(t);
        if (totalFrames > 1) {
          const idx = Math.min(totalFrames - 1, Math.floor(clamped * totalFrames));
          setFrameIdx(idx);
          setSubFrame(0);
        }
        setVirtualProgress(clamped);
        setPlaying(false);
      },
    };
    return () => { delete (window as any).__barRace; };
  }, [totalFrames, targetDuration, config.title, topoData]);

  // ── Playback loop ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      playbackStartRef.current = null;
      return;
    }
    const currentProgress = frameIdxRef.current / Math.max(totalFrames - 1, 1);
    playbackStartRef.current = performance.now() - currentProgress * targetDuration;

    const animate = (now: number) => {
      if (playbackStartRef.current === null) return;
      const progress = clamp01((now - playbackStartRef.current) / targetDuration);
      const idx = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      setFrameIdx(prev => prev === idx ? prev : idx);
      setSubFrame(0);
      setVirtualProgress(progress);

      if (progress >= 1 || idx >= totalFrames - 1) {
        setFrameIdx(totalFrames - 1);
        setVirtualProgress(1);
        setPlaying(false);
        setEndPulse(true);
        if (endHoldRef.current) clearTimeout(endHoldRef.current);
        endHoldRef.current = setTimeout(() => setEndPulse(false), 3000);
        playbackStartRef.current = null;
        rafRef.current = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).__barRace) (window as any).__barRace.finished = true;
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [playing, targetDuration, totalFrames]);

  // ── Event banner ──────────────────────────────────────────────────────
  const prevEventYearRef = useRef<number | null>(null);
  const frame = frames[frameIdx] ?? frames[0];

  useEffect(() => {
    if (!config.events) return;
    const label = config.events[frame.year];
    if (label && frame.year !== prevEventYearRef.current) {
      prevEventYearRef.current = frame.year;
      setEventBanner(label);
      setEventStartProgress(virtualProgressRef.current);
    }
  }, [frame.year, config.events]);

  const togglePlay = useCallback(() => {
    if (frameIdx >= totalFrames - 1) {
      setFrameIdx(0); setSubFrame(0); setVirtualProgress(0);
      setPlaying(true); setEndPulse(false);
    } else setPlaying(p => !p);
  }, [frameIdx, totalFrames]);

  // ── Derived data ──────────────────────────────────────────────────────
  const currentVals = frame.vals;
  const globalMax = useMemo(() => {
    let max = 1;
    for (const f of frames) {
      for (const v of Object.values(f.vals)) {
        if (v > max) max = v;
      }
    }
    return max;
  }, [frames]);

  // Current frame max for dynamic legend
  const currentMax = Math.max(1, ...Object.values(currentVals));

  // Build ISO → slug map for coloring
  const isoToSlug = useMemo(() => {
    const map: Record<string, string> = {};
    for (const slug of Object.keys(config.milestones)) {
      const iso = SLUG_TO_ISO[slug];
      if (iso) map[iso] = slug;
    }
    return map;
  }, [config.milestones]);

  // Top N ranking
  const ranking = useMemo(() => {
    return Object.entries(currentVals)
      .filter(([, v]) => v > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topN)
      .map(([slug, value]) => ({
        slug,
        name: config.countryNames?.[slug] ?? DEFAULT_NAMES[slug] ?? slug,
        value,
      }));
  }, [currentVals, topN, config.countryNames]);

  // ── Map projection ────────────────────────────────────────────────────
  const mapWidth = BASE_WIDTH - 40;
  const mapHeight = 260;
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(78)
      .translate([mapWidth / 2, mapHeight / 2 + 5]);
  }, [mapWidth, mapHeight]);
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  // ── Render ────────────────────────────────────────────────────────────
  if (!topoData) {
    return <div style={{ color: "#fff", textAlign: "center", padding: 40 }}>Loading map...</div>;
  }

  const fontDisplay = "'Bebas Neue', 'Trebuchet MS', sans-serif";
  const fontBody = "'Barlow Condensed', 'Trebuchet MS', sans-serif";

  return (
    <>
      <style>{`
        @keyframes subscribeFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes subscribePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
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
          <button onClick={togglePlay} style={{
            background: playing ? "#1a1500" : "#0d1120",
            border: `1px solid ${playing ? "#ffd60a" : "#4a9fc8"}`,
            color: playing ? "#ffd60a" : "#4a9fc8",
            borderRadius: 8, padding: "12px 18px", fontSize: 20,
            cursor: "pointer", width: 56, flexShrink: 0,
          }}>
            {playing ? "⏸" : frameIdx >= totalFrames - 1 ? "↺" : "▶"}
          </button>

          {/* Canvas */}
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
              <div style={{ padding: "12px 0 2px", textAlign: "center", flexShrink: 0 }}>
                <h1 style={{
                  margin: 0, fontSize: 24, fontWeight: 800,
                  fontFamily: fontDisplay, letterSpacing: 2,
                  background: "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  lineHeight: 1.1, textTransform: "uppercase",
                }}>
                  {config.title}
                  {config.subtitle && <><br />{config.subtitle}</>}
                </h1>
              </div>

              {/* Year */}
              <div style={{
                padding: "2px 16px", display: "flex",
                justifyContent: "flex-end", alignItems: "baseline", flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 48, fontWeight: 900, fontFamily: fontDisplay,
                  color: "#ffffff", letterSpacing: 2, lineHeight: 1,
                  minWidth: "4ch", textAlign: "right",
                }}>
                  {frame.year}
                </span>
              </div>

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
                        display: "inline-block", fontSize: 12, fontWeight: 700,
                        color: "#ffd60a", letterSpacing: 0.5,
                        textShadow: "0 0 10px #ffd60a88", fontFamily: fontBody,
                        whiteSpace: "nowrap",
                        transform: `translateX(calc(${pxPart}px - ${pctPart}%))`,
                      }}>
                        {eventBanner}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Map */}
              <div style={{ flex: 0, padding: "4px 20px", flexShrink: 0 }}>
                <svg
                  width={mapWidth}
                  height={mapHeight}
                  viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                  style={{ display: "block" }}
                >
                  {/* Ocean background */}
                  <rect x={0} y={0} width={mapWidth} height={mapHeight} fill="#0a1628" rx={6} />

                  {/* Countries */}
                  {topoData.map((geo: GeoFeature) => {
                    const isoCode = String(geo.id);
                    const slug = isoToSlug[isoCode];
                    // If USSR is active and this is a Soviet republic, use USSR value
                    const ussrVal = currentVals["ussr"] ?? 0;
                    const isUssrRepublic = ussrVal > 0 && USSR_ISO_CODES.includes(isoCode);
                    const value = isUssrRepublic
                      ? ussrVal
                      : slug ? (currentVals[slug] ?? 0) : 0;
                    const fill = value > 0
                      ? config.colorScale(value, globalMax)
                      : "#152238";
                    const d = pathGen(geo);
                    if (!d) return null;
                    return (
                      <path
                        key={isoCode}
                        d={d}
                        fill={fill}
                        stroke="#0d1120"
                        strokeWidth={0.4}
                      />
                    );
                  })}

                </svg>
              </div>

              {/* Color legend bar */}
              <div style={{
                padding: "2px 16px 4px", display: "flex",
                alignItems: "center", gap: 6, flexShrink: 0,
              }}>
                <span style={{ fontSize: 9, color: "#86a6c8", fontWeight: 600 }}>0</span>
                <div style={{
                  flex: 1, height: 8, borderRadius: 4, overflow: "hidden",
                  display: "flex",
                }}>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const t = (i + 0.5) / 20;
                    const val = t * globalMax;
                    return (
                      <div key={i} style={{
                        flex: 1, background: config.colorScale(val, globalMax),
                      }} />
                    );
                  })}
                </div>
                <span style={{ fontSize: 9, color: "#86a6c8", fontWeight: 600 }}>
                  {config.formatValue(currentMax)} {config.valueUnit ?? ""}
                </span>
              </div>

              {/* Top N Ranking — fixed slots + animated active items */}
              {(() => {
                const rowH = 32;
                const rowGap = 3;
                const slot = rowH + rowGap;
                return (
                  <div style={{ padding: "4px 16px", flexShrink: 0, position: "relative", height: topN * slot }}>
                    {/* Placeholder rows — always visible */}
                    {Array.from({ length: topN }).map((_, i) => (
                      <div key={`ph-${i}`} style={{
                        position: "absolute", left: 16, right: 16, top: i * slot, height: rowH,
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{
                          fontSize: 12, fontWeight: 800, width: 18, textAlign: "right",
                          color: "#2a3a55", flexShrink: 0,
                        }}>
                          #{i + 1}
                        </span>
                        <span style={{ flexShrink: 0, width: 22 }} />
                        <div style={{ flex: 1, height: 26, borderRadius: 4, background: "#1a2235" }} />
                      </div>
                    ))}
                    {/* Active items — keyed by slug so React animates rank changes */}
                    {ranking.map((entry, rank) => {
                      const pct = currentMax > 0 ? (entry.value / currentMax) * 100 : 0;
                      const barColor = config.colorScale(entry.value, globalMax);

                      let visualTop = rank * slot;
                      if (isRecording) {
                        const targetTop = rank * slot;
                        const prevRank = prevRanksRef.current.get(entry.slug);
                        if (prevRank !== undefined && prevRank !== rank) {
                          const anim = rankAnimsRef.current.get(entry.slug);
                          let fromTop = prevRank * slot;
                          if (anim) {
                            const t = clamp01((virtualProgress - anim.startProg) / rankTransDur);
                            if (t < 1) fromTop = anim.fromTop + (prevRank * slot - anim.fromTop) * backEaseOut(t);
                          }
                          rankAnimsRef.current.set(entry.slug, { fromTop, startProg: virtualProgress });
                        }
                        prevRanksRef.current.set(entry.slug, rank);
                        const anim = rankAnimsRef.current.get(entry.slug);
                        if (anim) {
                          const t = clamp01((virtualProgress - anim.startProg) / rankTransDur);
                          if (t < 1) visualTop = anim.fromTop + (targetTop - anim.fromTop) * backEaseOut(t);
                        }
                      }

                      return (
                        <div key={entry.slug} style={{
                          position: "absolute", left: 16, right: 16,
                          top: visualTop, height: rowH,
                          display: "flex", alignItems: "center", gap: 6,
                          transition: isRecording ? "none" : "top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}>
                          <span style={{
                            fontSize: 12, fontWeight: 800, width: 18, textAlign: "right",
                            color: rank < 3 ? "#ffd60a" : "#86a6c8", flexShrink: 0,
                          }}>
                            #{rank + 1}
                          </span>
                          <span style={{
                            flexShrink: 0, width: 22, height: 22,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {makeIcon("flags", entry.slug)?.("#fff", 22)}
                          </span>
                          <div style={{
                            flex: 1, position: "relative", height: 26,
                            borderRadius: 4, overflow: "hidden", background: "#1a2235",
                          }}>
                            <div style={{
                              position: "absolute", left: 0, top: 0, bottom: 0,
                              width: `${Math.max(2, pct)}%`,
                              background: barColor, borderRadius: 4,
                              transition: isRecording ? "none" : "width 0.3s ease",
                            }} />
                            <div style={{
                              position: "relative", display: "flex", alignItems: "center",
                              justifyContent: "space-between", height: "100%",
                              padding: "0 8px", zIndex: 1,
                            }}>
                              <span style={{
                                fontSize: 12, fontWeight: 700, color: "#ffffff",
                                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                              }}>
                                {entry.name}
                              </span>
                              <span style={{
                                fontSize: 11, fontWeight: 800, color: "#ffffff",
                                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                              }}>
                                {config.formatValue(entry.value)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Bottom spacer for Shorts UI */}
              <div style={{ flexShrink: 0, height: 60 }} />

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
