import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const MUSHROOM_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    <ellipse cx="5.5" cy="4.2" rx="3.8" ry="2.5" fill="rgba(255,160,0,0.25)" stroke="#ffaa00" strokeWidth="0.7" />
    <path d="M4.5 6.2 L3.8 10 H7.2 L6.5 6.2" fill="rgba(255,160,0,0.15)" stroke="#ffaa00" strokeWidth="0.6" />
    <ellipse cx="5.5" cy="3.8" rx="1.5" ry="1" fill="#ffcc00" opacity="0.5" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",         name: "United States",  color: "#3b82f6" },
  { id: "ussr",        name: "USSR",           color: "#991b1b" },
  { id: "france",      name: "France",         color: "#818cf8" },
  { id: "uk",          name: "United Kingdom", color: "#e879f9" },
  { id: "china",       name: "China",          color: "#f97316" },
  { id: "india",       name: "India",          color: "#fbbf24" },
  { id: "pakistan",     name: "Pakistan",       color: "#4ade80" },
  { id: "north_korea", name: "North Korea",    color: "#a855f7" },
]);

// Cumulative nuclear test detonations per country (CTBTO / FAS data)
const MILESTONES: Record<string, Record<number, number>> = {
  usa:         series([1945,1],[1946,3],[1948,6],[1951,22],[1952,29],[1953,40],[1954,46],[1955,64],[1957,114],[1958,171],[1960,196],[1962,277],[1965,377],[1968,486],[1970,542],[1975,676],[1980,793],[1985,884],[1990,978],[1992,1032],[2025,1032]),
  // USSR: cumulative — frozen at final count after dissolution
  ussr:        series([1949,1],[1951,3],[1953,7],[1955,19],[1957,34],[1958,67],[1961,122],[1962,183],[1965,215],[1968,270],[1970,310],[1975,410],[1980,502],[1985,599],[1988,670],[1990,715],[2025,715]),
  france:      series([1960,1],[1961,3],[1963,6],[1966,12],[1968,20],[1970,32],[1975,62],[1978,82],[1980,102],[1985,135],[1990,175],[1995,205],[1996,210],[2025,210]),
  uk:          series([1952,1],[1953,2],[1955,10],[1957,13],[1958,21],[1962,29],[1965,33],[1970,37],[1975,40],[1980,42],[1985,43],[1991,45],[2025,45]),
  china:       series([1964,1],[1966,4],[1967,6],[1968,7],[1969,8],[1970,10],[1972,14],[1975,19],[1978,24],[1980,27],[1985,33],[1990,38],[1995,43],[1996,45],[2025,45]),
  india:       series([1974,1],[1997,1],[1998,6],[2025,6]),
  pakistan:    series([1998,6],[2025,6]),
  north_korea: series([2006,1],[2009,2],[2013,3],[2016,5],[2017,6],[2025,6]),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const NUCLEAR_TESTS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 NUCLEAR TEST DETONATIONS",
  subtitle: "THE COLD WAR'S EXPLOSIVE LEGACY",
  unitLabel: "Cumulative Nuclear Test Detonations",
  valueUnit: "tests",
  startYear: 1945,
  endYear: 2025,
  topN: 10,
  minValue: 1,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 10,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: MUSHROOM_ICON,
  events: {
    1945: "The United States detonates Trinity — the world's first nuclear weapon ushers in the atomic age",
    1961: "The USSR detonates Tsar Bomba — at 50 megatons, it remains the largest explosion in human history",
    1996: "The Comprehensive Test Ban Treaty opens for signature — nuclear testing effectively halts worldwide",
    2017: "North Korea tests a hydrogen bomb — the only nation to detonate nuclear weapons in the 21st century",
  },
  sourceLabel: "Data: CTBTO Preparedness Commission + FAS Nuclear Notebook + historical estimates",
};
