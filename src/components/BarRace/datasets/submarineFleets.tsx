import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const SUBMARINE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <ellipse cx="5.5" cy="6" rx="5" ry="2.8" fill="#4a6a8a" stroke="#7abbe0" strokeWidth="0.5" />
    <rect x="4" y="3.2" width="1" height="2.8" rx="0.3" fill="#7abbe0" />
    <line x1="4.5" y1="3.2" x2="4.5" y2="1.5" stroke="#7abbe0" strokeWidth="0.5" />
    <line x1="3.5" y1="2.5" x2="5.5" y2="2.5" stroke="#7abbe0" strokeWidth="0.4" />
    <path d="M0.5 6 Q5.5 9.5 10.5 6" fill="none" stroke="#7abbe0" strokeWidth="0.4" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",   color: "#3b82f6" },
  { id: "ussr",         name: "USSR",            color: "#991b1b" },
  { id: "russia",       name: "Russia",          color: "#ef4444" },
  { id: "china",        name: "China",           color: "#f97316" },
  { id: "uk",           name: "United Kingdom",  color: "#e879f9" },
  { id: "france",       name: "France",          color: "#818cf8" },
  { id: "india",        name: "India",           color: "#22d3ee" },
  { id: "japan",        name: "Japan",           color: "#c084fc" },
  { id: "south_korea",  name: "South Korea",     color: "#06b6d4" },
  { id: "germany",      name: "Germany",         color: "#eab308" },
  { id: "north_korea",  name: "North Korea",     color: "#f43f5e" },
  { id: "turkey",       name: "Turkey",          color: "#fb923c" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
  { id: "brazil",       name: "Brazil",          color: "#34d399" },
  { id: "italy",        name: "Italy",           color: "#4ade80" },
  { id: "greece",       name: "Greece",          color: "#60a5fa" },
  { id: "iran",         name: "Iran",            color: "#10b981" },
  { id: "pakistan",      name: "Pakistan",        color: "#a78bfa" },
  { id: "israel",       name: "Israel",          color: "#38bdf8" },
  { id: "egypt",        name: "Egypt",           color: "#fde047" },
  { id: "sweden",       name: "Sweden",          color: "#14b8a6" },
  { id: "norway",       name: "Norway",          color: "#84cc16" },
  { id: "indonesia",    name: "Indonesia",       color: "#d946ef" },
  { id: "taiwan",       name: "Taiwan",          color: "#67e8f9" },
  { id: "spain",        name: "Spain",           color: "#f9a8d4" },
  { id: "canada",       name: "Canada",          color: "#f43f5e" },
  { id: "south_africa", name: "South Africa",    color: "#a3e635" },
  { id: "vietnam",      name: "Vietnam",         color: "#f87171" },
  { id: "poland",       name: "Poland",          color: "#ff6b6b" },
  { id: "netherlands",  name: "Netherlands",     color: "#fdba74" },
  { id: "algeria",      name: "Algeria",         color: "#2dd4bf" },
]);

// Active military submarine fleet sizes (nuclear + conventional)
// Sources: IISS Military Balance, Jane's Fighting Ships, national defense reports
const MILESTONES: Record<string, Record<number, number>> = {
  // ── United States — nuclear submarine superpower ──
  usa: series(
    [1960, 112], [1965, 126], [1970, 138], [1975, 130],
    [1980, 127], [1985, 140], [1988, 142], [1990, 131],
    [1995, 102], [2000, 86], [2005, 74], [2010, 71],
    [2015, 71], [2020, 68], [2025, 68],
  ),

  // ── USSR — largest submarine fleet in history, collapsed 1992 ──
  ussr: series(
    [1960, 240], [1965, 320], [1970, 380], [1975, 420],
    [1980, 455], [1985, 480], [1987, 475], [1990, 400],
    [1991, 320], [1992, 0],
  ),

  // ── Russia — inherited Soviet submarine fleet, steep decline ──
  russia: series(
    [1992, 200], [1995, 140], [2000, 95], [2005, 72],
    [2010, 63], [2015, 62], [2020, 58], [2025, 65],
  ),

  // ── China — steady buildup to second largest by 2020s ──
  china: series(
    [1960, 28], [1965, 33], [1970, 40], [1975, 48],
    [1980, 55], [1985, 60], [1990, 63], [1995, 65],
    [2000, 68], [2005, 62], [2010, 65], [2015, 68],
    [2020, 74], [2025, 80],
  ),

  // ── United Kingdom — from large fleet to lean nuclear force ──
  uk: series(
    [1960, 50], [1965, 44], [1970, 38], [1975, 33],
    [1980, 30], [1985, 28], [1990, 27], [1995, 16],
    [2000, 16], [2005, 14], [2010, 12], [2015, 11],
    [2020, 10], [2025, 10],
  ),

  // ── France — nuclear deterrent core ──
  france: series(
    [1960, 20], [1965, 22], [1970, 21], [1975, 22],
    [1980, 20], [1985, 18], [1990, 17], [1995, 14],
    [2000, 12], [2005, 10], [2010, 10], [2015, 10],
    [2020, 10], [2025, 10],
  ),

  // ── India — growing submarine arm ──
  india: series(
    [1970, 4], [1975, 6], [1980, 8], [1985, 10],
    [1990, 14], [1995, 16], [2000, 16], [2005, 16],
    [2010, 15], [2015, 15], [2020, 16], [2025, 17],
  ),

  // ── Japan — capable diesel-electric fleet ──
  japan: series(
    [1960, 14], [1965, 15], [1970, 14], [1975, 14],
    [1980, 14], [1985, 16], [1990, 16], [1995, 16],
    [2000, 18], [2005, 18], [2010, 18], [2015, 20],
    [2020, 22], [2025, 24],
  ),

  // ── North Korea — massive coastal submarine fleet ──
  north_korea: series(
    [1970, 4], [1975, 12], [1980, 20], [1985, 35],
    [1990, 50], [1995, 55], [2000, 60], [2005, 65],
    [2010, 70], [2015, 72], [2020, 70], [2025, 70],
  ),

  // ── South Korea — modern buildup ──
  south_korea: series(
    [1980, 0.1], [1985, 0.1], [1990, 3], [1995, 6],
    [2000, 9], [2005, 12], [2010, 14], [2015, 16],
    [2020, 18], [2025, 18],
  ),

  // ── Germany (West Germany / reunified) — modern diesel specialists ──
  germany: series(
    [1960, 10], [1965, 12], [1970, 14], [1975, 14],
    [1980, 14], [1985, 14], [1990, 14], [1995, 12],
    [2000, 10], [2005, 10], [2010, 6], [2015, 6],
    [2020, 6], [2025, 6],
  ),

  // ── Turkey — regional undersea presence ──
  turkey: series(
    [1960, 10], [1965, 10], [1970, 12], [1975, 14],
    [1980, 15], [1985, 15], [1990, 14], [1995, 14],
    [2000, 14], [2005, 14], [2010, 14], [2015, 12],
    [2020, 12], [2025, 12],
  ),

  // ── Australia — small but capable ──
  australia: series(
    [1960, 6], [1965, 6], [1970, 6], [1975, 6],
    [1980, 6], [1985, 6], [1990, 6], [1995, 6],
    [2000, 6], [2005, 6], [2010, 6], [2015, 6],
    [2020, 6], [2025, 6],
  ),

  // ── Iran — growing fleet with mini-subs ──
  iran: series(
    [1980, 0.1], [1985, 0.1], [1990, 0.1], [1995, 3],
    [2000, 6], [2005, 10], [2010, 17], [2015, 21],
    [2020, 23], [2025, 25],
  ),

  // ── Brazil — small submarine arm ──
  brazil: series(
    [1960, 4], [1965, 4], [1970, 5], [1975, 5],
    [1980, 6], [1985, 6], [1990, 5], [1995, 5],
    [2000, 5], [2005, 5], [2010, 5], [2015, 5],
    [2020, 5], [2025, 5],
  ),

  // ── Italy — Mediterranean submarine fleet ──
  italy: series(
    [1960, 10], [1965, 10], [1970, 10], [1975, 10],
    [1980, 10], [1985, 10], [1990, 10], [1995, 8],
    [2000, 8], [2005, 8], [2010, 6], [2015, 8],
    [2020, 8], [2025, 8],
  ),

  // ── Greece — Aegean submarine force ──
  greece: series(
    [1960, 8], [1965, 8], [1970, 8], [1975, 8],
    [1980, 10], [1985, 10], [1990, 10], [1995, 8],
    [2000, 8], [2005, 8], [2010, 8], [2015, 11],
    [2020, 11], [2025, 11],
  ),

  // ── Egypt — Soviet-supplied then diversified ──
  egypt: series(
    [1960, 4], [1965, 8], [1970, 10], [1975, 12],
    [1980, 10], [1985, 8], [1990, 6], [1995, 4],
    [2000, 4], [2005, 4], [2010, 4], [2015, 4],
    [2020, 6], [2025, 8],
  ),

  // ── Sweden — advanced diesel-electric innovator ──
  sweden: series(
    [1960, 10], [1965, 10], [1970, 12], [1975, 12],
    [1980, 12], [1985, 12], [1990, 10], [1995, 8],
    [2000, 7], [2005, 5], [2010, 5], [2015, 5],
    [2020, 5], [2025, 5],
  ),

  // ── Norway — Cold War frontline ASW ──
  norway: series(
    [1960, 15], [1965, 15], [1970, 15], [1975, 14],
    [1980, 14], [1985, 12], [1990, 12], [1995, 10],
    [2000, 6], [2005, 6], [2010, 6], [2015, 6],
    [2020, 6], [2025, 6],
  ),

  // ── Pakistan — growing undersea capability ──
  pakistan: series(
    [1970, 2], [1975, 3], [1980, 4], [1985, 6],
    [1990, 6], [1995, 6], [2000, 8], [2005, 8],
    [2010, 5], [2015, 5], [2020, 8], [2025, 9],
  ),

  // ── Israel — secretive submarine arm ──
  israel: series(
    [1960, 2], [1965, 3], [1970, 3], [1975, 3],
    [1980, 3], [1985, 3], [1990, 3], [1995, 3],
    [2000, 3], [2005, 3], [2010, 5], [2015, 5],
    [2020, 5], [2025, 5],
  ),

  // ── Indonesia — archipelagic patrol ──
  indonesia: series(
    [1960, 2], [1965, 4], [1970, 4], [1975, 2],
    [1980, 2], [1985, 2], [1990, 2], [1995, 2],
    [2000, 2], [2005, 2], [2010, 2], [2015, 2],
    [2020, 4], [2025, 4],
  ),

  // ── Taiwan — aging fleet with modernization plans ──
  taiwan: series(
    [1960, 2], [1965, 2], [1970, 2], [1975, 2],
    [1980, 2], [1985, 4], [1990, 4], [1995, 4],
    [2000, 4], [2005, 4], [2010, 4], [2015, 4],
    [2020, 4], [2025, 4],
  ),

  // ── Spain — Mediterranean patrol ──
  spain: series(
    [1960, 4], [1965, 5], [1970, 5], [1975, 6],
    [1980, 8], [1985, 8], [1990, 8], [1995, 6],
    [2000, 4], [2005, 4], [2010, 3], [2015, 3],
    [2020, 3], [2025, 4],
  ),

  // ── Canada — retired conventional subs, bought used ──
  canada: series(
    [1960, 3], [1965, 3], [1970, 3], [1975, 3],
    [1980, 3], [1985, 3], [1990, 3], [1995, 3],
    [2000, 4], [2005, 4], [2010, 4], [2015, 4],
    [2020, 4], [2025, 4],
  ),

  // ── Vietnam — Russian Kilo purchases ──
  vietnam: series(
    [1960, 0.1], [1990, 0.1], [2010, 0.1], [2013, 2],
    [2015, 4], [2017, 6], [2020, 6], [2025, 6],
  ),

  // ── Poland — small Baltic fleet ──
  poland: series(
    [1960, 4], [1965, 5], [1970, 5], [1975, 5],
    [1980, 5], [1985, 5], [1990, 5], [1995, 4],
    [2000, 3], [2005, 3], [2010, 3], [2015, 3],
    [2020, 1], [2025, 1],
  ),

  // ── Algeria — Russian-supplied fleet ──
  algeria: series(
    [1970, 0.1], [1975, 2], [1980, 2], [1985, 2],
    [1990, 2], [1995, 2], [2000, 2], [2005, 2],
    [2010, 4], [2015, 6], [2020, 6], [2025, 6],
  ),

  // ── South Africa — small force, declining ──
  south_africa: series(
    [1970, 3], [1975, 3], [1980, 3], [1985, 3],
    [1990, 3], [1995, 3], [2000, 3], [2005, 3],
    [2010, 3], [2015, 2], [2020, 2], [2025, 2],
  ),

  // ── Netherlands — small but modern ──
  netherlands: series(
    [1960, 6], [1965, 6], [1970, 6], [1975, 6],
    [1980, 6], [1985, 6], [1990, 6], [1995, 4],
    [2000, 4], [2005, 4], [2010, 4], [2015, 4],
    [2020, 4], [2025, 4],
  ),
};

function formatValue(n: number): string {
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const SUBMARINE_FLEETS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 SUBMARINE FLEETS BY COUNTRY",
  subtitle: "WHO RULES BENEATH THE WAVES?",
  unitLabel: "Active Military Submarines",
  valueUnit: "subs",
  startYear: 1960,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  scaleMode: "linear",
  framesPerYear: 12,
  timelineInterval: 5,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: SUBMARINE_ICON,
  events: {
    1962: "Cuban Missile Crisis — Soviet submarines carrying nuclear torpedoes confront the US Navy in the Atlantic",
    1985: "The Soviet submarine fleet peaks at over 480 vessels — the largest undersea armada in history",
    2004: "China begins a massive submarine modernization program, rapidly expanding its undersea fleet",
    2021: "AUKUS pact announced — Australia to acquire nuclear-powered submarines from the US and UK",
  },
  sourceLabel: "Data: IISS Military Balance, Jane's Fighting Ships, national defense reports",
};
