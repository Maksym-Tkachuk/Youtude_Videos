import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const STEEL_INGOT_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M2 8 L3.5 4 H7.5 L9 8 Z" fill="#8a9bb5" stroke="#b0c4de" strokeWidth="0.5" strokeLinejoin="round" />
    <path d="M3.5 4 L4 2.5 H7 L7.5 4" fill="#a0b0c8" stroke="#b0c4de" strokeWidth="0.4" strokeLinejoin="round" />
    <line x1="3.5" y1="4" x2="7.5" y2="4" stroke="#6a7d96" strokeWidth="0.4" />
    <line x1="5.5" y1="2.5" x2="5.5" y2="8" stroke="#6a7d96" strokeWidth="0.3" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",            name: "United States",   color: "#3b82f6" },
  { id: "ussr",           name: "USSR",            color: "#991b1b" },
  { id: "russia",         name: "Russia",          color: "#ef4444" },
  { id: "china",          name: "China",           color: "#f97316" },
  { id: "japan",          name: "Japan",           color: "#c084fc" },
  { id: "germany",        name: "Germany",         color: "#eab308" },
  { id: "india",          name: "India",           color: "#22d3ee" },
  { id: "south_korea",    name: "South Korea",     color: "#818cf8" },
  { id: "brazil",         name: "Brazil",          color: "#34d399" },
  { id: "uk",             name: "United Kingdom",  color: "#e879f9" },
  { id: "france",         name: "France",          color: "#a78bfa" },
  { id: "italy",          name: "Italy",           color: "#4ade80" },
  { id: "turkey",         name: "Turkey",          color: "#fb923c" },
  { id: "taiwan",         name: "Taiwan",          color: "#38bdf8" },
  { id: "ukraine",        name: "Ukraine",         color: "#facc15" },
  { id: "spain",          name: "Spain",           color: "#f9a8d4" },
  { id: "canada",         name: "Canada",          color: "#fbbf24" },
  { id: "mexico",         name: "Mexico",          color: "#86efac" },
  { id: "iran",           name: "Iran",            color: "#10b981" },
  { id: "poland",         name: "Poland",          color: "#ff6b6b" },
  { id: "australia",      name: "Australia",       color: "#60a5fa" },
  { id: "austria",        name: "Austria",         color: "#f43f5e" },
  { id: "belgium",        name: "Belgium",         color: "#d946ef" },
  { id: "sweden",         name: "Sweden",          color: "#06b6d4" },
  { id: "south_africa",   name: "South Africa",    color: "#a3e635" },
  { id: "egypt",          name: "Egypt",           color: "#fde047" },
  { id: "indonesia",      name: "Indonesia",       color: "#14b8a6" },
  { id: "vietnam",        name: "Vietnam",         color: "#f87171" },
  { id: "saudi_arabia",   name: "Saudi Arabia",    color: "#84cc16" },
  { id: "czech_republic", name: "Czech Republic",  color: "#67e8f9" },
]);

// Annual crude steel production in million tonnes (Mt)
// Sources: World Steel Association, USGS Mineral Commodity Summaries, historical estimates
const MILESTONES: Record<string, Record<number, number>> = {
  usa: series(
    [1950, 87.8], [1955, 106.2], [1960, 90.1], [1965, 119.3], [1970, 119.3],
    [1973, 136.8], [1975, 105.8], [1980, 101.5], [1985, 80.1], [1990, 89.7],
    [1995, 95.2], [2000, 101.8], [2005, 94.9], [2010, 80.5], [2015, 78.8],
    [2020, 72.7], [2025, 80.0],
  ),
  ussr: series(
    [1950, 27.3], [1955, 45.3], [1960, 65.3], [1965, 91.0], [1970, 115.9],
    [1975, 141.3], [1980, 148.0], [1985, 155.0], [1988, 163.0],
    [1990, 154.0], [1991, 133.0], [1992, 0],
  ),
  russia: series(
    [1992, 67.0], [1995, 51.6], [1998, 43.8], [2000, 59.1], [2005, 66.2],
    [2007, 72.4], [2010, 66.8], [2015, 71.1], [2020, 73.4], [2025, 70.0],
  ),
  china: series(
    [1950, 0.6], [1955, 2.9], [1958, 8.0], [1960, 18.7], [1962, 6.7],
    [1965, 12.2], [1970, 17.8], [1975, 23.9], [1980, 37.1], [1985, 46.8],
    [1990, 66.3], [1995, 95.4], [2000, 128.5], [2002, 182.2],
    [2005, 355.8], [2008, 500.5], [2010, 638.7], [2013, 822.0],
    [2015, 803.8], [2018, 928.3], [2020, 1064.8], [2023, 1019.1], [2025, 1020.0],
  ),
  japan: series(
    [1950, 4.8], [1955, 9.4], [1960, 22.1], [1965, 41.2], [1970, 93.3],
    [1973, 119.3], [1975, 102.3], [1980, 111.4], [1985, 105.3], [1990, 110.3],
    [1995, 101.6], [2000, 106.4], [2005, 112.5], [2010, 109.6],
    [2015, 105.1], [2020, 83.2], [2025, 83.0],
  ),
  germany: series(
    [1950, 20.8], [1955, 33.5], [1960, 40.3], [1965, 43.4], [1970, 45.0],
    [1975, 40.4], [1980, 43.8], [1985, 40.5], [1990, 44.0], [1995, 42.1],
    [2000, 46.4], [2005, 44.5], [2010, 43.8], [2015, 42.7],
    [2020, 35.7], [2025, 40.0],
  ),
  india: series(
    [1950, 1.5], [1955, 1.7], [1960, 3.5], [1965, 6.5], [1970, 6.3],
    [1975, 7.9], [1980, 9.5], [1985, 11.9], [1990, 14.9], [1995, 22.0],
    [2000, 26.9], [2005, 45.8], [2010, 68.3], [2015, 89.6],
    [2018, 109.3], [2020, 100.3], [2023, 140.2], [2025, 120.0],
  ),
  south_korea: series(
    [1950, 0.1], [1960, 0.1], [1970, 0.5], [1975, 2.0], [1980, 8.6],
    [1985, 13.5], [1990, 23.1], [1995, 36.8], [2000, 43.1],
    [2005, 47.8], [2010, 58.9], [2015, 69.7], [2020, 67.1], [2025, 68.0],
  ),
  brazil: series(
    [1950, 0.8], [1955, 1.2], [1960, 2.3], [1965, 3.0], [1970, 5.4],
    [1975, 8.3], [1980, 15.3], [1985, 20.5], [1990, 20.6], [1995, 25.1],
    [2000, 27.9], [2005, 31.6], [2010, 32.9], [2015, 33.3],
    [2020, 31.0], [2025, 34.0],
  ),
  uk: series(
    [1950, 16.3], [1955, 20.1], [1960, 24.7], [1965, 27.4], [1970, 28.3],
    [1975, 20.2], [1980, 11.3], [1985, 15.7], [1990, 17.8], [1995, 17.6],
    [2000, 15.2], [2005, 13.2], [2010, 9.7], [2015, 10.9],
    [2020, 7.2], [2025, 6.0],
  ),
  france: series(
    [1950, 8.6], [1955, 12.6], [1960, 17.3], [1965, 19.6], [1970, 23.8],
    [1975, 21.5], [1980, 23.2], [1985, 18.8], [1990, 19.0], [1995, 18.1],
    [2000, 20.5], [2005, 19.5], [2010, 15.4], [2015, 15.0],
    [2020, 11.8], [2025, 13.0],
  ),
  italy: series(
    [1950, 2.4], [1955, 5.5], [1960, 8.2], [1965, 12.7], [1970, 17.3],
    [1975, 21.8], [1980, 26.5], [1985, 23.9], [1990, 25.5], [1995, 27.8],
    [2000, 26.8], [2005, 29.3], [2010, 25.8], [2015, 22.0],
    [2020, 20.2], [2025, 22.0],
  ),
  turkey: series(
    [1950, 0.1], [1960, 0.3], [1970, 1.5], [1975, 2.4], [1980, 4.0],
    [1985, 5.6], [1990, 9.3], [1995, 13.2], [2000, 14.3],
    [2005, 21.0], [2010, 29.1], [2015, 31.5], [2020, 35.8], [2025, 33.7],
  ),
  taiwan: series(
    [1960, 0.1], [1970, 0.7], [1975, 1.5], [1980, 3.4], [1985, 5.1],
    [1990, 9.8], [1995, 11.6], [2000, 16.9], [2005, 18.9],
    [2010, 19.8], [2015, 21.4], [2020, 21.8], [2025, 22.0],
  ),
  ukraine: series(
    [1992, 42.0], [1995, 22.3], [2000, 31.8], [2005, 38.6],
    [2010, 33.4], [2015, 22.9], [2020, 20.6], [2025, 6.2],
  ),
  spain: series(
    [1950, 0.8], [1955, 1.4], [1960, 1.9], [1965, 3.5], [1970, 7.4],
    [1975, 11.1], [1980, 12.6], [1985, 14.2], [1990, 12.9], [1995, 13.8],
    [2000, 15.9], [2005, 17.8], [2010, 16.3], [2015, 14.8],
    [2020, 10.9], [2025, 12.0],
  ),
  canada: series(
    [1950, 3.1], [1955, 4.5], [1960, 5.3], [1965, 9.1], [1970, 11.2],
    [1975, 13.0], [1980, 15.9], [1985, 14.7], [1990, 15.0], [1995, 14.4],
    [2000, 16.6], [2005, 15.3], [2010, 13.0], [2015, 12.5],
    [2020, 11.1], [2025, 12.5],
  ),
  mexico: series(
    [1960, 1.5], [1965, 2.5], [1970, 3.9], [1975, 5.3], [1980, 7.2],
    [1985, 7.4], [1990, 8.7], [1995, 12.1], [2000, 15.6],
    [2005, 16.2], [2010, 16.9], [2015, 18.2], [2020, 16.9], [2025, 18.0],
  ),
  iran: series(
    [1970, 0.2], [1975, 0.6], [1980, 1.2], [1985, 0.8], [1990, 2.9],
    [1995, 6.3], [2000, 6.6], [2005, 9.4], [2010, 12.0],
    [2015, 16.1], [2020, 29.0], [2025, 31.0],
  ),
  poland: series(
    [1950, 2.5], [1955, 4.4], [1960, 6.7], [1965, 8.6], [1970, 11.7],
    [1975, 15.0], [1980, 19.5], [1985, 16.1], [1990, 13.6], [1995, 11.9],
    [2000, 10.5], [2005, 8.4], [2010, 8.0], [2015, 9.2],
    [2020, 7.9], [2025, 7.5],
  ),
  australia: series(
    [1950, 1.2], [1955, 2.1], [1960, 3.6], [1965, 5.3], [1970, 6.2],
    [1975, 7.9], [1980, 7.6], [1985, 6.3], [1990, 6.7], [1995, 8.5],
    [2000, 7.0], [2005, 7.8], [2010, 7.3], [2015, 5.0],
    [2020, 5.5], [2025, 5.6],
  ),
  austria: series(
    [1950, 1.0], [1955, 2.4], [1960, 3.2], [1965, 3.2], [1970, 4.1],
    [1975, 4.1], [1980, 4.6], [1985, 4.7], [1990, 4.3], [1995, 5.0],
    [2000, 5.7], [2005, 7.0], [2010, 7.2], [2015, 7.7],
    [2020, 6.8], [2025, 7.0],
  ),
  belgium: series(
    [1950, 3.8], [1955, 5.9], [1960, 7.2], [1965, 9.2], [1970, 12.6],
    [1975, 11.6], [1980, 12.3], [1985, 10.7], [1990, 11.4], [1995, 11.6],
    [2000, 11.6], [2005, 10.4], [2010, 7.9], [2015, 7.3],
    [2020, 6.1], [2025, 6.0],
  ),
  sweden: series(
    [1950, 1.4], [1955, 2.5], [1960, 3.2], [1965, 4.5], [1970, 5.5],
    [1975, 5.6], [1980, 4.2], [1985, 4.8], [1990, 4.5], [1995, 4.9],
    [2000, 5.2], [2005, 5.7], [2010, 4.9], [2015, 4.6],
    [2020, 4.4], [2025, 4.5],
  ),
  south_africa: series(
    [1955, 1.6], [1960, 2.7], [1965, 3.3], [1970, 4.8], [1975, 7.1],
    [1980, 9.0], [1985, 8.6], [1990, 8.5], [1995, 8.7], [2000, 8.5],
    [2005, 9.5], [2010, 7.6], [2015, 6.4], [2020, 4.2], [2025, 5.0],
  ),
  egypt: series(
    [1970, 0.2], [1975, 0.3], [1980, 0.6], [1985, 1.2], [1990, 2.5],
    [1995, 3.0], [2000, 3.0], [2005, 5.6], [2010, 6.7],
    [2015, 5.5], [2020, 7.8], [2025, 9.0],
  ),
  indonesia: series(
    [1970, 0.1], [1975, 0.2], [1980, 0.5], [1985, 1.5], [1990, 3.0],
    [1995, 4.2], [2000, 2.8], [2005, 3.7], [2010, 3.7],
    [2015, 4.7], [2020, 6.2], [2025, 7.0],
  ),
  vietnam: series(
    [1990, 0.1], [1995, 0.3], [2000, 0.5], [2005, 2.0],
    [2010, 5.5], [2015, 7.8], [2020, 19.8], [2025, 20.0],
  ),
  saudi_arabia: series(
    [1985, 1.4], [1990, 2.2], [1995, 2.8], [2000, 3.5],
    [2005, 4.7], [2010, 5.0], [2015, 5.3], [2020, 8.3], [2025, 9.5],
  ),
  czech_republic: series(
    [1993, 6.8], [1995, 7.1], [2000, 6.3], [2005, 6.2],
    [2010, 5.2], [2015, 5.3], [2020, 4.4], [2025, 4.5],
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const STEEL_PRODUCTION_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 STEEL PRODUCTION BY COUNTRY",
  subtitle: "WHO FORGES THE WORLD?",
  unitLabel: "Annual Crude Steel Production (million tonnes)",
  valueUnit: "Mt",
  startYear: 1950,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 12,
  timelineInterval: 5,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: STEEL_INGOT_ICON,
  events: {
    1952: "Post-war industrial boom begins — the United States produces nearly half of the world's steel",
    1971: "Japan's economic miracle peaks — Japanese steel output surpasses 100 million tonnes for the first time",
    1988: "The Soviet Union reaches its all-time record of 163 million tonnes — the Cold War steel race ends",
    2006: "China surpasses 400 million tonnes — an unprecedented surge makes it the world's steel superpower",
  },
  sourceLabel: "Data: World Steel Association, USGS",
};
