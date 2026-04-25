import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { EmpireMapConfig } from "./empireTypes";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const BASE_WIDTH = 405;
const BASE_HEIGHT = 720;
const DEFAULT_TARGET_DURATION = 45_000;

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
  somalia: "706", sudan: "729", south_sudan: "728",
  ghana: "288", ivory_coast: "384", senegal: "686",
  mali: "466", niger: "562", chad: "148", cameroon: "120",
  congo_dr: "180", congo: "178", angola: "024",
  mozambique: "508", zimbabwe: "716", zambia: "894",
  madagascar: "450", botswana: "072", namibia: "516",
  gabon: "266", guinea: "324", sierra_leone: "694",
  gambia: "270", malawi: "454", mauritius: "480",
  fiji: "242", papua_new_guinea: "598",
  jamaica: "388", trinidad: "780",
  guyana: "328", suriname: "740", belize: "084",
  bahamas: "044", barbados: "052", cyprus: "196",
  malta: "470", brunei: "096", hong_kong: "344",
};

function clamp01(v: number) { return Math.min(1, Math.max(0, v)); }

const FADE_YEARS = 3; // smooth fade-in over 3 years

function interpolateController(
  territory: Record<number, string>,
  year: number,
): { controller: string; fade: number } {
  const keys = Object.keys(territory).map(Number).sort((a, b) => a - b);
  if (keys.length === 0) return { controller: "", fade: 0 };
  if (year < keys[0]) return { controller: "", fade: 0 };
  let result = "";
  let changeYear = keys[0];
  for (const k of keys) {
    if (k <= year) { result = territory[k]; changeYear = k; }
    else break;
  }
  const elapsed = year - changeYear;
  const fade = result ? Math.min(1, elapsed / FADE_YEARS) : 0;
  return { controller: result, fade };
}

function blendColor(empireColor: string, fade: number): string {
  // Parse hex color
  const r = parseInt(empireColor.slice(1, 3), 16);
  const g = parseInt(empireColor.slice(3, 5), 16);
  const b = parseInt(empireColor.slice(5, 7), 16);
  // Blend from dark (#152238) to empire color
  const br2 = 21, bg2 = 34, bb2 = 56; // #152238
  const fr = Math.round(br2 + (r - br2) * fade);
  const fg = Math.round(bg2 + (g - bg2) * fade);
  const fb = Math.round(bb2 + (b - bb2) * fade);
  return `rgb(${fr},${fg},${fb})`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoFeature = any;

interface EmpireMapPlayerProps {
  config: EmpireMapConfig;
}

export default function EmpireMapPlayer({ config }: EmpireMapPlayerProps) {
  const [topoData, setTopoData] = useState<GeoFeature[] | null>(null);

  useEffect(() => {
    fetch("/world-110m.json")
      .then(r => r.json())
      .then((topo: Topology) => {
        const countries = feature(topo, topo.objects.countries as GeometryCollection);
        setTopoData(countries.features);
      });
  }, []);

  const targetDuration = config.targetDuration ?? DEFAULT_TARGET_DURATION;
  const fpy = config.framesPerYear ?? 4;
  const totalFrames = (config.endYear - config.startYear) * fpy;

  const outputWidth = config.videoWidth ?? BASE_WIDTH;
  const outputHeight = config.videoHeight ?? Math.round(BASE_HEIGHT * (outputWidth / BASE_WIDTH));
  const scaleCSS = outputWidth / BASE_WIDTH;

  const [virtualProgress, setVirtualProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [, setEndPulse] = useState(false);
  const [eventBanner, setEventBanner] = useState<string | null>(null);
  const [eventStartProgress, setEventStartProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const playbackStartRef = useRef<number | null>(null);
  const endHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const virtualProgressRef = useRef(virtualProgress);
  const prevEventYearRef = useRef<number | null>(null);
  virtualProgressRef.current = virtualProgress;

  const TICKER_DURATION_MS = 18_000;
  const tickerDurationNormalized = Math.min(1, TICKER_DURATION_MS / Math.max(targetDuration, 1));

  // Current year from progress
  const currentYear = config.startYear + virtualProgress * (config.endYear - config.startYear);
  const displayYear = Math.floor(currentYear);

  // Empire color map
  const empireColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const e of config.empires) map[e.id] = e.color;
    return map;
  }, [config.empires]);

  // ISO → slug map
  const isoToSlug = useMemo(() => {
    const map: Record<string, string> = {};
    for (const slug of Object.keys(config.territories)) {
      const iso = SLUG_TO_ISO[slug];
      if (iso) map[iso] = slug;
    }
    return map;
  }, [config.territories]);

  // Count territories per empire at current year
  const empireCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of config.empires) counts[e.id] = 0;
    for (const [, timeline] of Object.entries(config.territories)) {
      const { controller } = interpolateController(timeline, currentYear);
      if (controller && counts[controller] !== undefined) {
        counts[controller]++;
      }
    }
    return counts;
  }, [config.empires, config.territories, currentYear]);

  // Sort empires by territory count for legend
  const sortedEmpires = useMemo(() => {
    return [...config.empires]
      .filter(e => empireCounts[e.id] > 0)
      .sort((a, b) => empireCounts[b.id] - empireCounts[a.id]);
  }, [config.empires, empireCounts]);

  // Recording API
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
        setVirtualProgress(0); setEndPulse(false);
        setEventBanner(null); setPlaying(true);
      },
      setProgress: (t: number) => {
        const clamped = clamp01(t);
        setVirtualProgress(clamped);
        setPlaying(false);
        if (clamped >= 1) setEndPulse(true);
      },
    };
    return () => { delete (window as any).__barRace; };
  }, [totalFrames, targetDuration, config.title, topoData]);

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
        setVirtualProgress(1); setPlaying(false); setEndPulse(true);
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

  // Event banner
  useEffect(() => {
    if (!config.events) return;
    const label = config.events[displayYear];
    if (label && displayYear !== prevEventYearRef.current) {
      prevEventYearRef.current = displayYear;
      setEventBanner(label);
      setEventStartProgress(virtualProgressRef.current);
    }
  }, [displayYear, config.events]);

  const togglePlay = useCallback(() => {
    if (virtualProgress >= 1) {
      setVirtualProgress(0); setEndPulse(false); setPlaying(true);
    } else setPlaying(p => !p);
  }, [virtualProgress]);

  // Map projection
  const mapWidth = BASE_WIDTH - 40;
  const mapHeight = 260;
  const projection = useMemo(() => {
    return geoNaturalEarth1().scale(78).translate([mapWidth / 2, mapHeight / 2 + 5]);
  }, [mapWidth, mapHeight]);
  const pathGen = useMemo(() => geoPath(projection), [projection]);

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
              transform: `scale(${scaleCSS})`, transformOrigin: "top left",
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
                  {displayYear}
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
                <svg width={mapWidth} height={mapHeight} viewBox={`0 0 ${mapWidth} ${mapHeight}`} style={{ display: "block" }}>
                  <rect x={0} y={0} width={mapWidth} height={mapHeight} fill="#0a1628" rx={6} />
                  {topoData.map((geo: GeoFeature) => {
                    const isoCode = String(geo.id);
                    const slug = isoToSlug[isoCode];
                    let fill = "#152238";
                    if (slug) {
                      const { controller, fade } = interpolateController(config.territories[slug] ?? {}, currentYear);
                      if (controller && empireColorMap[controller]) {
                        fill = blendColor(empireColorMap[controller], fade);
                      }
                    }
                    const d = pathGen(geo);
                    if (!d) return null;
                    return (
                      <path
                        key={isoCode}
                        d={d}
                        fill={fill}
                        stroke="none"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Empire legend */}
              <div style={{ padding: "6px 16px", flexShrink: 0 }}>
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "4px 12px",
                  justifyContent: "center",
                }}>
                  {sortedEmpires.map(e => (
                    <div key={e.id} style={{
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: 2,
                        background: e.color, flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: 10, fontWeight: 600, color: "#c0cfe0",
                      }}>
                        {e.name} ({empireCounts[e.id]})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Territory count over time — top empires as mini bars */}
              <div style={{ flex: 1, padding: "4px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {sortedEmpires.slice(0, 6).map((e) => {
                  const count = empireCounts[e.id];
                  const maxCount = Math.max(1, ...Object.values(empireCounts));
                  const pct = (count / maxCount) * 100;
                  return (
                    <div key={e.id} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      height: 28, marginBottom: 3,
                    }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: 2,
                        background: e.color, flexShrink: 0,
                      }} />
                      <div style={{
                        flex: 1, position: "relative", height: 22,
                        borderRadius: 4, overflow: "hidden", background: "#1a2235",
                      }}>
                        <div style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${Math.max(2, pct)}%`,
                          background: e.color, borderRadius: 4, opacity: 0.8,
                        }} />
                        <div style={{
                          position: "relative", display: "flex", alignItems: "center",
                          justifyContent: "space-between", height: "100%",
                          padding: "0 8px", zIndex: 1,
                        }}>
                          <span style={{
                            fontSize: 11, fontWeight: 700, color: "#ffffff",
                            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                          }}>
                            {e.name}
                          </span>
                          <span style={{
                            fontSize: 10, fontWeight: 800, color: "#ffffff",
                            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                          }}>
                            {count} territories
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

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
