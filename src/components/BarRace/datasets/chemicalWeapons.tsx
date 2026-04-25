import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const HAZARD_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    {/* skull */}
    <circle cx="5.5" cy="4" r="3" fill="#a8b820" />
    <circle cx="4.2" cy="3.5" r="0.8" fill="#0d1120" />
    <circle cx="6.8" cy="3.5" r="0.8" fill="#0d1120" />
    <ellipse cx="5.5" cy="5.2" rx="0.5" ry="0.4" fill="#0d1120" />
    {/* crossbones */}
    <line x1="1.5" y1="7" x2="9.5" y2="10" stroke="#a8b820" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="9.5" y1="7" x2="1.5" y2="10" stroke="#a8b820" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "iraq",         name: "Iraq",           color: "#f87171" },
  { id: "syria",        name: "Syria",          color: "#cc3333" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "libya",        name: "Libya",          color: "#fb923c" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "myanmar",      name: "Myanmar",        color: "#14b8a6" },
  { id: "albania",      name: "Albania",        color: "#f43f5e" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
  { id: "canada",       name: "Canada",         color: "#ef4444" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "romania",      name: "Romania",        color: "#a78bfa" },
  { id: "spain",        name: "Spain",          color: "#fb7185" },
  { id: "netherlands",  name: "Netherlands",    color: "#60a5fa" },
  { id: "sweden",       name: "Sweden",         color: "#facc15" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "argentina",    name: "Argentina",      color: "#67e8f9" },
]);

// Chemical weapons stockpiles in tonnes of declared/estimated chemical agents
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: declared 30,610 US tons (~27,770 metric tonnes). Peak Cold War, Nixon halted production 1969, CWC destruction 1997-2023
  usa: series(
    [1920, 0.1], [1925, 500], [1930, 1000], [1935, 1500], [1940, 5000],
    [1942, 15000], [1945, 27000], [1950, 27500], [1955, 27700], [1960, 27770],
    [1965, 27770], [1969, 27770], [1975, 27770], [1980, 27770], [1985, 27770],
    [1990, 27770], [1997, 27770], [2000, 22000], [2005, 15000], [2010, 8000],
    [2015, 4000], [2020, 2000], [2023, 0], [2025, 0]
  ),

  // Germany: WW1 pioneer of chemical warfare → interwar buildup → WW2 nerve agents → destroyed by Allies
  germany: series(
    [1920, 2000], [1925, 1500], [1930, 2000], [1935, 5000], [1938, 8000],
    [1940, 10000], [1943, 12000], [1945, 12000], [1946, 0]
  ),

  // USSR: builds from 1930s → massive Cold War stockpile → world's largest at ~40,000t → collapses 1991
  ussr: series(
    [1930, 0.1], [1935, 500], [1940, 2000], [1945, 5000], [1950, 8000],
    [1955, 12000], [1960, 18000], [1965, 22000], [1970, 28000], [1975, 32000],
    [1980, 35000], [1985, 38000], [1987, 40000], [1990, 40000], [1992, 0]
  ),

  // Russia: inherits 40,000t from USSR → slow OPCW-supervised destruction → fully destroyed 2017
  russia: series(
    [1992, 40000], [1995, 39000], [1997, 39967], [2000, 36000], [2005, 28000],
    [2010, 18000], [2015, 5000], [2017, 0], [2025, 0]
  ),

  // UK: WW1/WW2 stockpile up to ~5,000t → destroyed by 1960s
  uk: series(
    [1920, 1000], [1925, 1500], [1930, 2000], [1935, 2500], [1940, 4000],
    [1945, 5000], [1950, 4500], [1955, 3500], [1960, 2000], [1965, 500],
    [1970, 0]
  ),

  // France: WW1 producer → interwar stockpile → destroyed post-WW2
  france: series(
    [1920, 2000], [1925, 2200], [1930, 2500], [1935, 2800], [1939, 3000],
    [1945, 2500], [1948, 0]
  ),

  // Japan: built stockpile used in China → destroyed post-WW2
  japan: series(
    [1930, 0.1], [1935, 800], [1937, 1200], [1940, 2000], [1943, 2000],
    [1945, 1800], [1946, 0]
  ),

  // Iraq: builds from 1970s → peak ~3,500t (used against Iran & Kurds) → destroyed after Gulf War
  iraq: series(
    [1975, 0.1], [1980, 500], [1983, 1500], [1985, 2500], [1988, 3500],
    [1990, 3000], [1991, 1500], [1995, 800], [1998, 500], [2003, 0]
  ),

  // Syria: builds from 1970s → ~1,000t declared 2013 → mostly destroyed under OPCW
  syria: series(
    [1975, 0.1], [1980, 100], [1985, 300], [1990, 500], [1995, 700],
    [2000, 900], [2005, 1100], [2010, 1300], [2013, 1308], [2014, 50],
    [2020, 10], [2025, 0]
  ),

  // India: declared ~1,044t in 1997 → fully destroyed by 2009
  india: series(
    [1975, 0.1], [1980, 200], [1985, 400], [1990, 700], [1995, 900],
    [1997, 1044], [2000, 800], [2005, 300], [2009, 0]
  ),

  // Libya: small declared stockpile ~23t → destroyed by 2014
  libya: series(
    [1980, 0.1], [1985, 5], [1990, 15], [1995, 20], [2000, 23],
    [2005, 23], [2010, 20], [2014, 0]
  ),

  // South Korea: estimated ~500t (never formally declared)
  south_korea: series(
    [1975, 0.1], [1980, 100], [1985, 200], [1990, 350], [1995, 500],
    [2000, 500], [2005, 400], [2010, 200], [2015, 50], [2020, 0]
  ),

  // North Korea: estimated 2,500–5,000t (unverified), growing since 1960s
  north_korea: series(
    [1960, 0.1], [1965, 100], [1970, 300], [1975, 600], [1980, 1000],
    [1985, 1500], [1990, 2000], [1995, 2500], [2000, 3000], [2005, 3500],
    [2010, 4000], [2015, 4500], [2020, 5000], [2025, 5000]
  ),

  // Egypt: estimated ~500t (unverified, not CWC signatory)
  egypt: series(
    [1965, 0.1], [1970, 100], [1975, 200], [1980, 300], [1985, 400],
    [1990, 500], [1995, 500], [2000, 500], [2005, 500], [2010, 500],
    [2015, 500], [2020, 500], [2025, 500]
  ),

  // Israel: estimated small stockpile ~50t (unverified, not CWC signatory)
  israel: series(
    [1970, 0.1], [1975, 10], [1980, 25], [1985, 40], [1990, 50],
    [1995, 50], [2000, 50], [2005, 50], [2010, 50], [2015, 50],
    [2020, 50], [2025, 50]
  ),

  // Iran: had stockpile during Iran-Iraq War, claims fully destroyed
  iran: series(
    [1983, 0.1], [1985, 100], [1988, 300], [1990, 200], [1995, 100],
    [1997, 50], [2000, 0]
  ),

  // China: small historical amounts, destroyed
  china: series(
    [1935, 0.1], [1940, 100], [1945, 200], [1950, 300], [1955, 200],
    [1960, 100], [1970, 50], [1980, 0]
  ),

  // Myanmar: suspected small amounts
  myanmar: series(
    [1990, 0.1], [1995, 10], [2000, 20], [2005, 20], [2010, 20],
    [2015, 20], [2020, 20], [2025, 20]
  ),

  // Albania: declared 16t, destroyed 2007
  albania: series(
    [1975, 0.1], [1980, 5], [1985, 10], [1990, 14], [1995, 16],
    [2000, 16], [2005, 10], [2007, 0]
  ),

  // Italy: WW1-era stockpile, used in Ethiopia, destroyed post-WW2
  italy: series(
    [1920, 500], [1925, 800], [1930, 1000], [1935, 1500], [1940, 1200],
    [1945, 800], [1948, 0]
  ),

  // Australia: small WW1/WW2 research amounts
  australia: series(
    [1935, 0.1], [1940, 50], [1945, 100], [1950, 50], [1955, 0]
  ),

  // Canada: WW1/WW2 production
  canada: series(
    [1920, 100], [1930, 50], [1940, 300], [1945, 500], [1950, 200],
    [1955, 0]
  ),

  // Poland: Warsaw Pact stockpile
  poland: series(
    [1955, 0.1], [1960, 50], [1965, 100], [1970, 150], [1975, 200],
    [1980, 200], [1985, 200], [1990, 100], [1995, 0]
  ),

  // Romania: Warsaw Pact stockpile
  romania: series(
    [1960, 0.1], [1965, 50], [1970, 100], [1975, 100], [1980, 100],
    [1985, 100], [1990, 50], [1995, 0]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const CHEMICAL_WEAPONS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 CHEMICAL WEAPONS STOCKPILES",
  subtitle: "THE WORLD'S DEADLIEST POISON",
  unitLabel: "Declared Chemical Agents (tonnes)",
  valueUnit: "tonnes",
  startYear: 1920,
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
  unitIcon: HAZARD_ICON,
  events: {
    1925: "The Geneva Protocol bans chemical weapons in war — but nations secretly continue stockpiling",
    1988: "Iraq uses nerve gas on Kurdish civilians at Halabja — the deadliest chemical attack since World War I",
    1997: "The Chemical Weapons Convention enters force — 190 nations agree to destroy all stockpiles",
    2023: "The United States destroys its last chemical weapon — ending 80 years of stockpiling",
  },
  sourceLabel: "Data: OPCW, SIPRI, Arms Control Association",
};
