import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const WARSHIP_ICON = (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M1 8 L3 4 H11 L13 8 Z" fill="#7a8ea8" stroke="#b0c4de" strokeWidth="0.5" strokeLinejoin="round" />
    <rect x="5" y="2" width="1.2" height="2" fill="#b0c4de" />
    <rect x="7" y="1" width="1" height="3" fill="#b0c4de" />
    <rect x="9" y="2.5" width="0.8" height="1.5" fill="#b0c4de" />
    <path d="M0.5 8 Q7 10.5 13.5 8" fill="none" stroke="#4a6a8a" strokeWidth="0.8" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "uk",              name: "United Kingdom",  color: "#e879f9" },
  { id: "usa",             name: "United States",   color: "#3b82f6" },
  { id: "germany",         name: "Germany",         color: "#eab308" },
  { id: "france",          name: "France",          color: "#818cf8" },
  { id: "japan",           name: "Japan",           color: "#c084fc" },
  { id: "russia",          name: "Russia",          color: "#ef4444" },
  { id: "ussr",            name: "USSR",            color: "#991b1b" },
  { id: "russian_empire",  name: "Russian Empire",  color: "#cc3333" },
  { id: "italy",           name: "Italy",           color: "#34d399" },
  { id: "china",           name: "China",           color: "#f97316" },
  { id: "india",           name: "India",           color: "#22d3ee" },
  { id: "south_korea",     name: "South Korea",     color: "#60a5fa" },
  { id: "turkey",          name: "Turkey",          color: "#fb923c" },
  { id: "australia",       name: "Australia",       color: "#fbbf24" },
  { id: "brazil",          name: "Brazil",          color: "#4ade80" },
  { id: "spain",           name: "Spain",           color: "#f9a8d4" },
  { id: "netherlands",     name: "Netherlands",     color: "#a3e635" },
  { id: "sweden",          name: "Sweden",          color: "#38bdf8" },
  { id: "canada",          name: "Canada",          color: "#f43f5e" },
  { id: "greece",          name: "Greece",          color: "#93c5fd" },
  { id: "egypt",           name: "Egypt",           color: "#fb923c" },
  { id: "iran",            name: "Iran",            color: "#10b981" },
  { id: "taiwan",          name: "Taiwan",          color: "#fde047" },
  { id: "indonesia",       name: "Indonesia",       color: "#f87171" },
  { id: "pakistan",         name: "Pakistan",        color: "#14b8a6" },
  { id: "thailand",        name: "Thailand",        color: "#a855f7" },
  { id: "north_korea",     name: "North Korea",     color: "#d946ef" },
  { id: "ottoman_empire",  name: "Ottoman Empire",  color: "#f472b6" },
  { id: "austria_hungary", name: "Austria-Hungary",  color: "#facc15" },
  { id: "norway",          name: "Norway",          color: "#7dd3fc" },
]);

// Total major warship counts (battleships, cruisers, destroyers, frigates, submarines, carriers)
// Sources: Jane's Fighting Ships, Conway's All the World's Fighting Ships, Naval History archives
const MILESTONES: Record<string, Record<number, number>> = {
  // ── United Kingdom — dominant pre-WWII, declined post-war ──
  uk: series(
    [1900, 330], [1905, 370], [1910, 420], [1914, 460],
    [1918, 580], [1920, 440], [1925, 380], [1930, 340],
    [1935, 310], [1939, 380], [1942, 550], [1945, 900],
    [1950, 460], [1955, 360], [1960, 280], [1965, 210],
    [1970, 160], [1975, 120], [1980, 95], [1985, 80],
    [1990, 65], [1995, 55], [2000, 42], [2005, 38],
    [2010, 33], [2015, 30], [2020, 28], [2025, 26],
  ),

  // ── United States — massive WWII buildup, Cold War superpower ──
  usa: series(
    [1900, 80], [1905, 120], [1910, 160], [1914, 220],
    [1917, 300], [1918, 450], [1920, 370], [1925, 310],
    [1930, 280], [1935, 300], [1939, 380], [1941, 480],
    [1943, 2500], [1945, 6768], [1947, 2000], [1950, 1100],
    [1955, 970], [1960, 830], [1965, 750], [1970, 640],
    [1975, 520], [1980, 460], [1985, 530], [1990, 510],
    [1995, 430], [2000, 350], [2005, 320], [2010, 290],
    [2015, 275], [2020, 296], [2025, 299],
  ),

  // ── Germany — WWI/WWII naval power, post-war minimal ──
  germany: series(
    [1900, 60], [1905, 120], [1908, 180], [1910, 240],
    [1914, 310], [1917, 350], [1918, 180], [1920, 15],
    [1925, 30], [1930, 50], [1935, 120], [1939, 220],
    [1941, 340], [1943, 550], [1945, 0.1], [1950, 0.1],
    [1955, 25], [1960, 45], [1965, 55], [1970, 60],
    [1975, 55], [1980, 50], [1985, 48], [1990, 45],
    [1995, 30], [2000, 25], [2005, 22], [2010, 18],
    [2015, 16], [2020, 14], [2025, 12],
  ),

  // ── France — consistent mid-tier naval power ──
  france: series(
    [1900, 200], [1905, 230], [1910, 250], [1914, 270],
    [1918, 300], [1920, 250], [1925, 220], [1930, 200],
    [1935, 210], [1939, 230], [1940, 120], [1945, 150],
    [1950, 180], [1955, 170], [1960, 160], [1965, 140],
    [1970, 120], [1975, 100], [1980, 90], [1985, 80],
    [1990, 70], [1995, 60], [2000, 50], [2005, 45],
    [2010, 40], [2015, 38], [2020, 36], [2025, 34],
  ),

  // ── Japan — rose to major power, devastated in WWII, rebuilt postwar ──
  japan: series(
    [1900, 40], [1905, 75], [1910, 110], [1914, 140],
    [1918, 180], [1920, 200], [1925, 220], [1930, 250],
    [1935, 280], [1939, 310], [1941, 360], [1942, 400],
    [1944, 300], [1945, 0.1], [1950, 0.1], [1954, 30],
    [1960, 80], [1965, 100], [1970, 120], [1975, 130],
    [1980, 140], [1985, 150], [1990, 155], [1995, 150],
    [2000, 140], [2005, 130], [2010, 120], [2015, 114],
    [2020, 114], [2025, 114],
  ),

  // ── Russian Empire — pre-1917 ──
  russian_empire: series(
    [1900, 130], [1904, 150], [1905, 80], [1910, 100],
    [1914, 120], [1917, 90], [1918, 0.1],
  ),

  // ── USSR — Cold War naval superpower ──
  ussr: series(
    [1922, 25], [1925, 40], [1930, 60], [1935, 120],
    [1939, 200], [1941, 250], [1943, 210], [1945, 280],
    [1950, 350], [1955, 500], [1960, 600], [1965, 700],
    [1970, 800], [1975, 850], [1980, 900], [1985, 1010],
    [1988, 1050], [1990, 960], [1991, 830], [1992, 0.1],
  ),

  // ── Russia (post-Soviet) — inherited fraction of USSR fleet ──
  russia: series(
    [1992, 500], [1995, 380], [2000, 270], [2005, 230],
    [2010, 200], [2015, 190], [2020, 175], [2025, 170],
  ),

  // ── Italy — Mediterranean naval power ──
  italy: series(
    [1900, 80], [1905, 100], [1910, 120], [1914, 150],
    [1918, 170], [1920, 140], [1925, 130], [1930, 140],
    [1935, 170], [1939, 200], [1941, 220], [1943, 100],
    [1945, 50], [1950, 60], [1955, 70], [1960, 80],
    [1965, 75], [1970, 70], [1975, 65], [1980, 60],
    [1985, 55], [1990, 50], [1995, 45], [2000, 40],
    [2005, 38], [2010, 35], [2015, 33], [2020, 31],
    [2025, 30],
  ),

  // ── China — rapid modern expansion ──
  china: series(
    [1900, 30], [1910, 25], [1920, 20], [1930, 25],
    [1940, 20], [1949, 30], [1955, 80], [1960, 150],
    [1965, 200], [1970, 250], [1975, 300], [1980, 350],
    [1985, 400], [1990, 450], [1995, 470], [2000, 480],
    [2005, 490], [2010, 495], [2015, 520], [2018, 560],
    [2020, 600], [2022, 650], [2025, 730],
  ),

  // ── India — growing blue-water navy ──
  india: series(
    [1947, 15], [1950, 20], [1955, 30], [1960, 40],
    [1965, 50], [1970, 65], [1975, 75], [1980, 85],
    [1985, 95], [1990, 110], [1995, 120], [2000, 130],
    [2005, 135], [2010, 140], [2015, 145], [2020, 150],
    [2025, 155],
  ),

  // ── South Korea — modern naval buildup ──
  south_korea: series(
    [1950, 10], [1955, 25], [1960, 40], [1965, 50],
    [1970, 60], [1975, 70], [1980, 85], [1985, 100],
    [1990, 120], [1995, 140], [2000, 150], [2005, 155],
    [2010, 160], [2015, 166], [2020, 170], [2025, 175],
  ),

  // ── Turkey — steady regional navy ──
  turkey: series(
    [1923, 10], [1930, 15], [1935, 20], [1940, 25],
    [1945, 30], [1950, 40], [1955, 55], [1960, 65],
    [1965, 70], [1970, 75], [1975, 80], [1980, 85],
    [1985, 90], [1990, 95], [1995, 100], [2000, 110],
    [2005, 115], [2010, 115], [2015, 115], [2020, 115],
    [2025, 120],
  ),

  // ── Australia — small but capable ──
  australia: series(
    [1900, 0.1], [1910, 8], [1914, 15], [1918, 25],
    [1920, 18], [1930, 15], [1935, 18], [1939, 25],
    [1942, 60], [1945, 80], [1950, 45], [1955, 35],
    [1960, 30], [1965, 25], [1970, 22], [1975, 20],
    [1980, 18], [1985, 16], [1990, 15], [1995, 14],
    [2000, 14], [2005, 13], [2010, 13], [2015, 13],
    [2020, 13], [2025, 13],
  ),

  // ── Brazil — largest in Latin America ──
  brazil: series(
    [1900, 15], [1905, 18], [1910, 25], [1914, 30],
    [1920, 25], [1930, 20], [1940, 25], [1945, 35],
    [1950, 40], [1955, 45], [1960, 50], [1965, 55],
    [1970, 55], [1975, 60], [1980, 65], [1985, 70],
    [1990, 70], [1995, 65], [2000, 55], [2005, 50],
    [2010, 50], [2015, 48], [2020, 46], [2025, 44],
  ),

  // ── Spain — long naval history, modern decline ──
  spain: series(
    [1900, 55], [1905, 50], [1910, 50], [1914, 50],
    [1920, 40], [1930, 35], [1940, 30], [1945, 35],
    [1950, 35], [1955, 40], [1960, 45], [1965, 50],
    [1970, 50], [1975, 50], [1980, 45], [1985, 40],
    [1990, 35], [1995, 30], [2000, 28], [2005, 25],
    [2010, 22], [2015, 20], [2020, 18], [2025, 17],
  ),

  // ── Netherlands — traditional maritime nation ──
  netherlands: series(
    [1900, 50], [1905, 55], [1910, 55], [1914, 60],
    [1918, 50], [1920, 40], [1930, 35], [1935, 40],
    [1939, 45], [1940, 15], [1945, 20], [1950, 35],
    [1955, 40], [1960, 35], [1965, 30], [1970, 25],
    [1975, 22], [1980, 20], [1985, 18], [1990, 16],
    [1995, 14], [2000, 13], [2005, 12], [2010, 10],
    [2015, 8], [2020, 7], [2025, 6],
  ),

  // ── Sweden — neutral but well-armed ──
  sweden: series(
    [1900, 40], [1910, 45], [1914, 50], [1920, 40],
    [1930, 35], [1939, 40], [1945, 45], [1950, 40],
    [1955, 35], [1960, 30], [1965, 28], [1970, 25],
    [1975, 22], [1980, 20], [1985, 18], [1990, 15],
    [1995, 12], [2000, 10], [2005, 9], [2010, 8],
    [2015, 7], [2020, 7], [2025, 7],
  ),

  // ── Canada — convoy escort legacy ──
  canada: series(
    [1900, 0.1], [1910, 5], [1914, 8], [1918, 30],
    [1920, 12], [1930, 10], [1939, 15], [1942, 150],
    [1944, 370], [1945, 400], [1947, 50], [1950, 25],
    [1955, 30], [1960, 30], [1965, 28], [1970, 25],
    [1975, 22], [1980, 20], [1985, 18], [1990, 16],
    [1995, 14], [2000, 13], [2005, 12], [2010, 12],
    [2015, 12], [2020, 12], [2025, 12],
  ),

  // ── Greece — Aegean naval power ──
  greece: series(
    [1900, 15], [1910, 20], [1912, 25], [1914, 30],
    [1918, 25], [1920, 22], [1930, 18], [1940, 20],
    [1945, 10], [1950, 35], [1955, 40], [1960, 45],
    [1965, 50], [1970, 55], [1975, 60], [1980, 65],
    [1985, 65], [1990, 65], [1995, 60], [2000, 55],
    [2005, 50], [2010, 45], [2015, 42], [2020, 40],
    [2025, 38],
  ),

  // ── Egypt — largest Arab navy ──
  egypt: series(
    [1950, 10], [1955, 20], [1960, 40], [1965, 50],
    [1970, 55], [1975, 60], [1980, 65], [1985, 70],
    [1990, 70], [1995, 65], [2000, 60], [2005, 55],
    [2010, 50], [2015, 50], [2020, 55], [2025, 55],
  ),

  // ── Iran — Persian Gulf naval ambitions ──
  iran: series(
    [1950, 5], [1960, 10], [1970, 20], [1975, 30],
    [1979, 25], [1985, 35], [1990, 40], [1995, 50],
    [2000, 55], [2005, 60], [2010, 65], [2015, 70],
    [2020, 75], [2025, 80],
  ),

  // ── Taiwan — defensive navy ──
  taiwan: series(
    [1950, 30], [1955, 50], [1960, 70], [1965, 80],
    [1970, 85], [1975, 85], [1980, 80], [1985, 80],
    [1990, 75], [1995, 70], [2000, 65], [2005, 60],
    [2010, 55], [2015, 50], [2020, 48], [2025, 46],
  ),

  // ── Indonesia — archipelagic navy ──
  indonesia: series(
    [1950, 10], [1955, 15], [1960, 35], [1965, 50],
    [1970, 55], [1975, 50], [1980, 45], [1985, 40],
    [1990, 40], [1995, 38], [2000, 35], [2005, 32],
    [2010, 30], [2015, 30], [2020, 32], [2025, 35],
  ),

  // ── Pakistan — regional presence ──
  pakistan: series(
    [1950, 5], [1955, 8], [1960, 12], [1965, 15],
    [1970, 18], [1975, 20], [1980, 22], [1985, 24],
    [1990, 26], [1995, 28], [2000, 30], [2005, 30],
    [2010, 28], [2015, 26], [2020, 24], [2025, 24],
  ),

  // ── Thailand — Gulf of Thailand patrol fleet ──
  thailand: series(
    [1950, 8], [1960, 12], [1970, 18], [1975, 22],
    [1980, 25], [1985, 28], [1990, 30], [1995, 32],
    [2000, 35], [2005, 35], [2010, 34], [2015, 33],
    [2020, 32], [2025, 30],
  ),

  // ── North Korea — large coastal fleet ──
  north_korea: series(
    [1953, 10], [1960, 40], [1965, 80], [1970, 150],
    [1975, 250], [1980, 350], [1985, 450], [1990, 500],
    [1995, 520], [2000, 530], [2005, 540], [2010, 550],
    [2015, 560], [2020, 570], [2025, 580],
  ),

  // ── Ottoman Empire — dissolved 1923 ──
  ottoman_empire: series(
    [1900, 35], [1905, 30], [1910, 25], [1914, 20],
    [1918, 10], [1923, 0.1],
  ),

  // ── Austria-Hungary — dissolved 1918 ──
  austria_hungary: series(
    [1900, 40], [1905, 50], [1910, 60], [1914, 75],
    [1916, 70], [1918, 0.1],
  ),

  // ── Norway — coastal defense fleet ──
  norway: series(
    [1900, 20], [1910, 22], [1914, 25], [1918, 20],
    [1930, 15], [1940, 12], [1945, 20], [1950, 25],
    [1955, 28], [1960, 25], [1965, 22], [1970, 20],
    [1975, 18], [1980, 15], [1985, 14], [1990, 12],
    [1995, 10], [2000, 8], [2005, 7], [2010, 6],
    [2015, 6], [2020, 6], [2025, 6],
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const NAVAL_WARSHIPS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 NAVAL WARSHIP FLEETS",
  subtitle: "WHICH COUNTRY RULES THE SEAS?",
  unitLabel: "Total Major Warships (battleships, cruisers, destroyers, frigates, submarines, carriers)",
  valueUnit: "ships",
  startYear: 1900,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 12,
  timelineInterval: 10,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: WARSHIP_ICON,
  events: {
    1916: "Battle of Jutland \u2014 the largest naval battle of WWI between British and German fleets",
    1941: "Pearl Harbor attack \u2014 Japan strikes the US Pacific Fleet, drawing America into WWII",
    1962: "Cuban Missile Crisis \u2014 US Navy blockades Cuba in nuclear standoff with Soviet Union",
    1982: "Falklands War \u2014 British Royal Navy sails 8,000 miles to reclaim the islands from Argentina",
  },
  sourceLabel: "Data: Jane's Fighting Ships, Naval History archives",
};
