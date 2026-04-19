import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const CAR_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M1.5 7.5 H9.5 V6 L8.5 4.5 H7.5 L6.5 3 H4.5 L3 4.5 H2.5 L1.5 6 Z" fill="#c0c0c0" stroke="#ffffff" strokeWidth="0.5" strokeLinejoin="round" />
    <circle cx="3.2" cy="7.8" r="1" fill="#333" stroke="#888" strokeWidth="0.4" />
    <circle cx="7.8" cy="7.8" r="1" fill="#333" stroke="#888" strokeWidth="0.4" />
    <rect x="4.8" y="4" width="2" height="1.5" rx="0.3" fill="#8ecae6" opacity="0.8" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",            name: "United States",  color: "#3b82f6" },
  { id: "japan",          name: "Japan",          color: "#c084fc" },
  { id: "china",          name: "China",          color: "#f97316" },
  { id: "germany",        name: "Germany",        color: "#eab308" },
  { id: "south_korea",    name: "South Korea",    color: "#06b6d4" },
  { id: "india",          name: "India",          color: "#22d3ee" },
  { id: "mexico",         name: "Mexico",         color: "#4ade80" },
  { id: "spain",          name: "Spain",          color: "#f9a8d4" },
  { id: "brazil",         name: "Brazil",         color: "#34d399" },
  { id: "france",         name: "France",         color: "#818cf8" },
  { id: "uk",             name: "United Kingdom", color: "#e879f9" },
  { id: "canada",         name: "Canada",         color: "#f43f5e" },
  { id: "thailand",       name: "Thailand",       color: "#a78bfa" },
  { id: "turkey",         name: "Turkey",         color: "#fb923c" },
  { id: "russia",         name: "Russia",         color: "#ef4444" },
  { id: "indonesia",      name: "Indonesia",      color: "#14b8a6" },
  { id: "czech_republic", name: "Czech Republic", color: "#60a5fa" },
  { id: "italy",          name: "Italy",          color: "#10b981" },
  { id: "iran",           name: "Iran",           color: "#84cc16" },
  { id: "ussr",           name: "USSR",           color: "#991b1b" },
  { id: "poland",         name: "Poland",         color: "#ff6b6b" },
  { id: "argentina",      name: "Argentina",      color: "#38bdf8" },
  { id: "south_africa",   name: "South Africa",   color: "#fbbf24" },
  { id: "malaysia",       name: "Malaysia",        color: "#a855f7" },
  { id: "taiwan",         name: "Taiwan",         color: "#67e8f9" },
  { id: "slovakia",       name: "Slovakia",       color: "#fde047" },
  { id: "romania",        name: "Romania",        color: "#93c5fd" },
  { id: "australia",      name: "Australia",      color: "#f472b6" },
  { id: "belgium",        name: "Belgium",        color: "#bef264" },
  { id: "sweden",         name: "Sweden",         color: "#fdba74" },
]);

// Annual vehicle production (cars + commercial vehicles) in millions
// Sources: OICA, national statistics, historical estimates
const MILESTONES: Record<string, Record<number, number>> = {
  usa: series(
    [1950, 8.0], [1955, 9.2], [1960, 7.9], [1965, 11.1], [1970, 8.3],
    [1975, 8.9], [1980, 8.0], [1985, 11.7], [1990, 9.8], [1995, 12.0],
    [2000, 12.8], [2005, 11.9], [2007, 10.8], [2009, 5.7], [2010, 7.8],
    [2015, 12.1], [2017, 11.2], [2020, 8.8], [2022, 10.1], [2025, 10.8],
  ),
  japan: series(
    [1950, 0.03], [1955, 0.07], [1960, 0.48], [1965, 1.9], [1968, 4.1],
    [1970, 5.3], [1975, 6.9], [1980, 11.0], [1985, 12.3], [1990, 13.5],
    [1995, 10.2], [2000, 10.1], [2005, 10.8], [2007, 11.6],
    [2009, 7.9], [2010, 9.6], [2015, 9.3], [2020, 8.1], [2025, 9.0],
  ),
  china: series(
    [1960, 0.02], [1965, 0.04], [1970, 0.09], [1975, 0.14], [1980, 0.22],
    [1985, 0.44], [1990, 0.51], [1995, 1.5], [2000, 2.1], [2003, 4.4],
    [2005, 5.7], [2007, 8.9], [2009, 13.8], [2010, 18.3],
    [2013, 22.1], [2015, 24.5], [2017, 29.0], [2020, 25.2],
    [2022, 27.0], [2025, 30.2],
  ),
  germany: series(
    [1950, 0.31], [1955, 0.91], [1960, 2.1], [1965, 3.0], [1970, 3.8],
    [1975, 3.2], [1980, 3.9], [1985, 4.4], [1990, 4.98], [1995, 4.7],
    [2000, 5.5], [2005, 5.8], [2008, 6.0], [2009, 5.2],
    [2010, 5.9], [2015, 6.0], [2017, 5.6], [2020, 3.7], [2022, 3.7], [2025, 4.1],
  ),
  south_korea: series(
    [1965, 0.1], [1970, 0.03], [1975, 0.04], [1980, 0.12],
    [1985, 0.38], [1990, 1.3], [1995, 2.5], [2000, 3.1],
    [2005, 3.7], [2010, 4.3], [2015, 4.6], [2020, 3.5], [2025, 4.0],
  ),
  india: series(
    [1960, 0.03], [1965, 0.05], [1970, 0.08], [1975, 0.1],
    [1980, 0.12], [1985, 0.17], [1990, 0.36], [1995, 0.57],
    [2000, 0.8], [2005, 1.6], [2010, 3.6], [2015, 4.1],
    [2018, 5.2], [2020, 3.4], [2022, 5.5], [2025, 5.8],
  ),
  mexico: series(
    [1960, 0.05], [1965, 0.1], [1970, 0.19], [1975, 0.35],
    [1980, 0.49], [1985, 0.4], [1990, 0.82], [1995, 0.93],
    [2000, 1.9], [2005, 1.7], [2010, 2.3], [2015, 3.6],
    [2020, 3.2], [2025, 3.8],
  ),
  spain: series(
    [1955, 0.02], [1960, 0.06], [1965, 0.18], [1970, 0.45],
    [1975, 0.7], [1980, 1.2], [1985, 1.4], [1990, 2.1],
    [1995, 2.3], [2000, 3.0], [2005, 2.8], [2008, 2.5],
    [2010, 2.4], [2015, 2.7], [2020, 2.3], [2025, 2.5],
  ),
  brazil: series(
    [1960, 0.13], [1965, 0.19], [1970, 0.42], [1975, 0.93],
    [1980, 1.2], [1985, 1.0], [1990, 0.91], [1995, 1.6],
    [2000, 1.7], [2005, 2.5], [2010, 3.4], [2013, 3.7],
    [2015, 2.4], [2020, 2.0], [2025, 2.5],
  ),
  france: series(
    [1950, 0.36], [1955, 0.73], [1960, 1.4], [1965, 1.9], [1970, 2.8],
    [1975, 3.0], [1980, 3.4], [1985, 3.0], [1990, 3.8], [1995, 3.5],
    [2000, 3.3], [2005, 3.5], [2008, 2.6], [2010, 2.2],
    [2015, 1.97], [2020, 1.3], [2025, 1.6],
  ),
  uk: series(
    [1950, 0.78], [1955, 1.3], [1960, 1.8], [1965, 2.2], [1970, 2.1],
    [1975, 1.6], [1980, 1.3], [1985, 1.3], [1990, 1.6], [1995, 1.8],
    [2000, 1.8], [2005, 1.8], [2010, 1.4], [2015, 1.7],
    [2020, 0.9], [2025, 1.0],
  ),
  canada: series(
    [1950, 0.39], [1955, 0.45], [1960, 0.4], [1965, 0.85],
    [1970, 1.2], [1975, 1.4], [1980, 1.3], [1985, 1.9],
    [1990, 1.9], [1995, 2.4], [2000, 2.9], [2005, 2.7],
    [2010, 2.1], [2015, 2.3], [2020, 1.4], [2025, 1.5],
  ),
  thailand: series(
    [1975, 0.02], [1980, 0.05], [1985, 0.07], [1990, 0.3],
    [1995, 0.53], [2000, 0.41], [2005, 1.1], [2010, 1.6],
    [2015, 1.9], [2020, 1.4], [2025, 1.9],
  ),
  turkey: series(
    [1970, 0.02], [1975, 0.06], [1980, 0.05], [1985, 0.1],
    [1990, 0.21], [1995, 0.29], [2000, 0.43], [2005, 0.88],
    [2010, 1.1], [2015, 1.4], [2020, 1.3], [2025, 1.5],
  ),
  ussr: series(
    [1950, 0.36], [1955, 0.45], [1960, 0.52], [1965, 0.6],
    [1970, 0.92], [1975, 1.96], [1980, 2.2], [1985, 2.2],
    [1990, 2.0], [1991, 1.8], [1992, 0],
  ),
  russia: series(
    [1992, 1.1], [1995, 1.1], [2000, 1.2], [2005, 1.4],
    [2008, 1.8], [2009, 0.72], [2010, 1.4], [2012, 2.2],
    [2015, 1.4], [2018, 1.8], [2020, 1.4], [2025, 1.6],
  ),
  indonesia: series(
    [1975, 0.05], [1980, 0.1], [1985, 0.1], [1990, 0.23],
    [1995, 0.38], [2000, 0.29], [2005, 0.5], [2010, 0.7],
    [2015, 1.1], [2020, 0.69], [2025, 1.3],
  ),
  czech_republic: series(
    [1993, 0.17], [1995, 0.2], [2000, 0.46], [2005, 0.6],
    [2010, 1.1], [2015, 1.3], [2020, 1.2], [2025, 1.3],
  ),
  italy: series(
    [1950, 0.13], [1955, 0.27], [1960, 0.65], [1965, 1.2],
    [1970, 1.85], [1975, 1.5], [1980, 1.6], [1985, 1.6],
    [1990, 2.1], [1995, 1.7], [2000, 1.7], [2005, 1.04],
    [2010, 0.84], [2015, 1.0], [2020, 0.78], [2025, 0.88],
  ),
  iran: series(
    [1970, 0.03], [1975, 0.11], [1980, 0.05], [1985, 0.04],
    [1990, 0.08], [1995, 0.2], [2000, 0.28], [2005, 0.82],
    [2010, 1.6], [2013, 0.74], [2015, 0.98], [2017, 1.5],
    [2020, 0.88], [2025, 1.1],
  ),
  poland: series(
    [1960, 0.02], [1965, 0.04], [1970, 0.07], [1975, 0.17],
    [1980, 0.35], [1985, 0.3], [1990, 0.27], [1995, 0.36],
    [2000, 0.5], [2005, 0.61], [2010, 0.87], [2015, 0.66],
    [2020, 0.46], [2025, 0.5],
  ),
  argentina: series(
    [1960, 0.1], [1965, 0.2], [1970, 0.29], [1975, 0.24],
    [1980, 0.28], [1985, 0.16], [1990, 0.1], [1995, 0.29],
    [2000, 0.34], [2005, 0.32], [2010, 0.72], [2015, 0.53],
    [2020, 0.26], [2025, 0.5],
  ),
  south_africa: series(
    [1960, 0.08], [1965, 0.16], [1970, 0.24], [1975, 0.28],
    [1980, 0.35], [1985, 0.3], [1990, 0.28], [1995, 0.39],
    [2000, 0.36], [2005, 0.53], [2010, 0.47], [2015, 0.62],
    [2020, 0.45], [2025, 0.55],
  ),
  malaysia: series(
    [1985, 0.1], [1990, 0.19], [1995, 0.29], [2000, 0.28],
    [2005, 0.51], [2010, 0.57], [2015, 0.61], [2020, 0.49],
    [2025, 0.7],
  ),
  taiwan: series(
    [1970, 0.02], [1975, 0.08], [1980, 0.16], [1985, 0.17],
    [1990, 0.37], [1995, 0.39], [2000, 0.37], [2005, 0.45],
    [2010, 0.3], [2015, 0.33], [2020, 0.25], [2025, 0.28],
  ),
  slovakia: series(
    [1993, 0.03], [1995, 0.03], [2000, 0.18], [2005, 0.22],
    [2010, 0.56], [2015, 1.0], [2020, 0.99], [2025, 1.1],
  ),
  romania: series(
    [1970, 0.03], [1975, 0.08], [1980, 0.11], [1985, 0.14],
    [1990, 0.1], [1995, 0.1], [2000, 0.08], [2005, 0.19],
    [2010, 0.35], [2015, 0.39], [2020, 0.44], [2025, 0.5],
  ),
  australia: series(
    [1950, 0.1], [1955, 0.14], [1960, 0.22], [1965, 0.36],
    [1970, 0.42], [1975, 0.39], [1980, 0.38], [1985, 0.38],
    [1990, 0.37], [1995, 0.32], [2000, 0.35], [2005, 0.39],
    [2010, 0.24], [2015, 0.19], [2017, 0.1],
  ),
  belgium: series(
    [1955, 0.07], [1960, 0.2], [1965, 0.39], [1970, 0.8],
    [1975, 0.75], [1980, 0.9], [1985, 0.9], [1990, 1.2],
    [1995, 1.1], [2000, 1.03], [2005, 0.93], [2010, 0.56],
    [2015, 0.41], [2020, 0.26], [2025, 0.28],
  ),
  sweden: series(
    [1950, 0.06], [1955, 0.1], [1960, 0.16], [1965, 0.23],
    [1970, 0.33], [1975, 0.34], [1980, 0.31], [1985, 0.39],
    [1990, 0.41], [1995, 0.41], [2000, 0.3], [2005, 0.34],
    [2010, 0.2], [2015, 0.19], [2020, 0.28], [2025, 0.3],
  ),
};

function formatValue(n: number): string {
  if (n >= 1) return `${n.toFixed(1)}M`;
  if (n >= 0.01) return `${Math.round(n * 1000)}K`;
  return Math.round(n * 1000).toString();
}

function formatValueFull(n: number): string {
  const units = Math.round(n * 1_000_000);
  return units.toLocaleString("en-US");
}

export const CAR_PRODUCTION_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 AUTOMOBILE PRODUCTION",
  subtitle: "WHICH COUNTRY BUILDS THE MOST CARS?",
  unitLabel: "Annual Vehicle Production (millions)",
  valueUnit: "vehicles",
  startYear: 1950,
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
  unitIcon: CAR_ICON,
  events: {
    1955: "The US auto industry peaks as Detroit produces over half the world's cars — the golden age of American automobiles",
    1980: "Japan overtakes the United States as the world's largest automobile producer for the first time",
    2001: "China joins the World Trade Organization — foreign automakers flood in and production skyrockets",
    2017: "China produces 29 million vehicles in a single year — more than the US, Japan, and Germany combined",
  },
  sourceLabel: "Data: OICA, national statistics",
};
