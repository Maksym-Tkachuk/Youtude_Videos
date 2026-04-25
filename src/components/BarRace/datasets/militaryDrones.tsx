import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const DRONE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    {/* fuselage */}
    <rect x="3.5" y="4.5" width="4" height="2" rx="0.8" fill="#556b3e" />
    {/* wings */}
    <rect x="0.5" y="5" width="10" height="1" rx="0.4" fill="#6e8b5a" />
    {/* tail */}
    <polygon points="3.5,5.5 1.5,3 2.5,3" fill="#6e8b5a" />
    {/* nose */}
    <ellipse cx="7.8" cy="5.5" rx="1" ry="0.8" fill="#8aa86e" />
    {/* tail fin */}
    <rect x="1.5" y="3" width="0.8" height="2" rx="0.3" fill="#556b3e" />
    {/* wing tips */}
    <circle cx="1" cy="5.5" r="0.5" fill="#8aa86e" />
    <circle cx="10" cy="5.5" r="0.5" fill="#8aa86e" />
    {/* fuselage highlight */}
    <rect x="4" y="4.7" width="3" height="0.4" rx="0.2" fill="rgba(255,255,255,0.15)" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#a3e635" },
  { id: "uae",          name: "UAE",            color: "#f9a8d4" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "taiwan",       name: "Taiwan",         color: "#67e8f9" },
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "azerbaijan",   name: "Azerbaijan",     color: "#2dd4bf" },
  { id: "ethiopia",     name: "Ethiopia",       color: "#84cc16" },
  { id: "morocco",      name: "Morocco",        color: "#f87171" },
  { id: "greece",       name: "Greece",         color: "#60a5fa" },
  { id: "netherlands",  name: "Netherlands",    color: "#fdba74" },
  { id: "spain",        name: "Spain",          color: "#d946ef" },
  { id: "canada",       name: "Canada",         color: "#f43f5e" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "indonesia",    name: "Indonesia",      color: "#a855f7" },
]);

// Active military drones (UAVs — combat + reconnaissance) by country
// Sources: IISS Military Balance, Drone Wars UK, national defense reports
const MILESTONES: Record<string, Record<number, number>> = {
  // ── USA — pioneer and dominant drone power ──
  usa: series(
    [1985, 10], [1988, 25], [1990, 50], [1993, 80], [1995, 120],
    [1998, 160], [2000, 200], [2002, 500], [2004, 1500], [2006, 3500],
    [2008, 5500], [2010, 7000], [2012, 9000], [2015, 11000],
    [2018, 12500], [2020, 13000], [2023, 13500], [2025, 14000],
  ),

  // ── Israel — early UAV pioneer, IAI Scout/Heron/Hermes ──
  israel: series(
    [1985, 15], [1988, 30], [1990, 50], [1993, 80], [1995, 100],
    [1998, 140], [2000, 200], [2003, 400], [2005, 600], [2008, 900],
    [2010, 1200], [2013, 1350], [2015, 1400], [2018, 1450],
    [2020, 1500], [2023, 1500], [2025, 1500],
  ),

  // ── China — late start but explosive growth ──
  china: series(
    [1985, 0.1], [1995, 0.1], [2000, 5], [2003, 10], [2005, 30],
    [2008, 100], [2010, 300], [2012, 700], [2015, 2000],
    [2018, 3500], [2020, 5000], [2023, 6500], [2025, 7000],
  ),

  // ── Turkey — Bayraktar revolution ──
  turkey: series(
    [1985, 0.1], [2000, 0.1], [2005, 2], [2008, 5], [2010, 10],
    [2013, 25], [2015, 50], [2017, 100], [2019, 200], [2020, 300],
    [2022, 400], [2024, 500], [2025, 550],
  ),

  // ── Iran — Shahed / Mohajer / Ababil programs ──
  iran: series(
    [1985, 0.1], [1995, 2], [2000, 5], [2003, 10], [2005, 25],
    [2008, 60], [2010, 100], [2013, 250], [2015, 500],
    [2018, 800], [2020, 1200], [2023, 1700], [2025, 2000],
  ),

  // ── Russia — lagged behind, rapid catch-up with Orlan / Lancet ──
  russia: series(
    [1985, 0.1], [1995, 2], [2000, 5], [2005, 8], [2008, 10],
    [2010, 30], [2013, 80], [2015, 200], [2017, 400],
    [2019, 700], [2020, 900], [2022, 1200], [2024, 1800], [2025, 2000],
  ),

  // ── United Kingdom — Watchkeeper / Reaper ──
  uk: series(
    [1985, 2], [1990, 5], [1995, 10], [2000, 25], [2003, 40],
    [2005, 50], [2008, 100], [2010, 200], [2013, 300],
    [2015, 350], [2018, 400], [2020, 420], [2023, 470], [2025, 500],
  ),

  // ── India — growing domestic and imported fleet ──
  india: series(
    [1985, 0.1], [1995, 5], [2000, 10], [2003, 15], [2005, 20],
    [2008, 60], [2010, 200], [2013, 350], [2015, 450],
    [2018, 550], [2020, 600], [2023, 700], [2025, 800],
  ),

  // ── France — Harfang / Reaper ──
  france: series(
    [1985, 1], [1990, 3], [1995, 5], [2000, 15], [2003, 25],
    [2005, 30], [2008, 50], [2010, 100], [2013, 150],
    [2015, 200], [2018, 230], [2020, 260], [2023, 280], [2025, 300],
  ),

  // ── South Korea — domestic development ──
  south_korea: series(
    [1985, 0.1], [1995, 2], [2000, 10], [2003, 15], [2005, 20],
    [2008, 50], [2010, 100], [2013, 150], [2015, 200],
    [2018, 350], [2020, 450], [2023, 550], [2025, 600],
  ),

  // ── Pakistan — Chinese imports and domestic development ──
  pakistan: series(
    [1985, 0.1], [2000, 0.1], [2005, 3], [2008, 8], [2010, 15],
    [2013, 50], [2015, 80], [2018, 120], [2020, 150],
    [2023, 180], [2025, 200],
  ),

  // ── Italy — Predator / Reaper operator ──
  italy: series(
    [1985, 0.1], [2000, 2], [2005, 10], [2008, 25], [2010, 50],
    [2013, 100], [2015, 130], [2018, 160], [2020, 180],
    [2023, 190], [2025, 200],
  ),

  // ── Australia — growing fleet ──
  australia: series(
    [1985, 0.1], [2000, 0.1], [2005, 5], [2008, 15], [2010, 30],
    [2013, 60], [2015, 80], [2018, 100], [2020, 120],
    [2023, 140], [2025, 150],
  ),

  // ── Germany — reconnaissance focused ──
  germany: series(
    [1985, 0.1], [2000, 2], [2005, 8], [2008, 15], [2010, 20],
    [2013, 50], [2015, 80], [2018, 100], [2020, 120],
    [2023, 140], [2025, 150],
  ),

  // ── Japan — surveillance drones ──
  japan: series(
    [1985, 0.1], [2000, 2], [2005, 5], [2008, 10], [2010, 20],
    [2013, 50], [2015, 80], [2018, 120], [2020, 150],
    [2023, 180], [2025, 200],
  ),

  // ── Ukraine — Bayraktar + massive local production for war ──
  ukraine: series(
    [1985, 0.1], [2010, 2], [2013, 8], [2015, 20], [2018, 50],
    [2020, 100], [2021, 150], [2022, 500], [2023, 1200],
    [2024, 1700], [2025, 2000],
  ),

  // ── Saudi Arabia — Wing Loong / Chinese imports ──
  saudi_arabia: series(
    [1985, 0.1], [2010, 5], [2013, 20], [2015, 50], [2018, 120],
    [2020, 180], [2023, 250], [2025, 300],
  ),

  // ── UAE — Wing Loong II and others ──
  uae: series(
    [1985, 0.1], [2010, 5], [2013, 20], [2015, 50], [2018, 100],
    [2020, 140], [2023, 170], [2025, 200],
  ),

  // ── Egypt — Chinese and domestic drones ──
  egypt: series(
    [1985, 0.1], [2010, 5], [2013, 15], [2015, 30], [2018, 80],
    [2020, 120], [2023, 170], [2025, 200],
  ),

  // ── Poland — growing fleet post-2014 ──
  poland: series(
    [1985, 0.1], [2010, 3], [2013, 10], [2015, 20], [2018, 50],
    [2020, 80], [2023, 120], [2025, 150],
  ),

  // ── Taiwan — domestic and imported UAVs ──
  taiwan: series(
    [1985, 0.1], [2010, 5], [2013, 10], [2015, 20], [2018, 40],
    [2020, 60], [2023, 80], [2025, 100],
  ),

  // ── North Korea — cheap surveillance types ──
  north_korea: series(
    [1985, 0.1], [2005, 5], [2008, 15], [2010, 30], [2013, 40],
    [2015, 50], [2018, 100], [2020, 180], [2023, 250], [2025, 300],
  ),

  // ── Azerbaijan — famous Bayraktar user, Nagorno-Karabakh ──
  azerbaijan: series(
    [1985, 0.1], [2010, 2], [2013, 5], [2015, 10], [2018, 30],
    [2020, 100], [2022, 150], [2025, 200],
  ),

  // ── Ethiopia — recent drone buyer ──
  ethiopia: series(
    [1985, 0.1], [2018, 5], [2020, 20], [2023, 40], [2025, 50],
  ),

  // ── Morocco — Turkish and Israeli imports ──
  morocco: series(
    [1985, 0.1], [2018, 5], [2020, 20], [2023, 40], [2025, 50],
  ),

  // ── Greece — small fleet ──
  greece: series(
    [1985, 0.1], [2010, 3], [2015, 10], [2018, 20], [2020, 30],
    [2023, 50], [2025, 60],
  ),

  // ── Netherlands — small fleet ──
  netherlands: series(
    [1985, 0.1], [2010, 3], [2015, 10], [2018, 20], [2020, 30],
    [2023, 40], [2025, 50],
  ),

  // ── Spain — small fleet ──
  spain: series(
    [1985, 0.1], [2010, 3], [2015, 10], [2018, 20], [2020, 30],
    [2023, 50], [2025, 60],
  ),

  // ── Canada — small fleet ──
  canada: series(
    [1985, 0.1], [2010, 2], [2015, 8], [2018, 15], [2020, 25],
    [2023, 40], [2025, 50],
  ),

  // ── Brazil — small fleet ──
  brazil: series(
    [1985, 0.1], [2010, 2], [2015, 8], [2018, 15], [2020, 20],
    [2023, 30], [2025, 40],
  ),

  // ── Indonesia — small fleet ──
  indonesia: series(
    [1985, 0.1], [2010, 2], [2015, 5], [2018, 15], [2020, 20],
    [2023, 25], [2025, 30],
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const MILITARY_DRONES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 MILITARY DRONE FLEETS",
  subtitle: "THE NEW FACE OF WARFARE",
  unitLabel: "Active Military UAVs",
  valueUnit: "drones",
  startYear: 1985,
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
  unitIcon: DRONE_ICON,
  events: {
    1991: "Israel deploys UAVs in the Gulf War \u2014 the first major combat use of military drones",
    2007: "The US Predator fleet exceeds 1,000 \u2014 armed drones become the weapon of choice in the War on Terror",
    2022: "Ukraine and Russia fight the first full-scale drone war \u2014 thousands of UAVs reshape the battlefield",
  },
  sourceLabel: "Data: IISS Military Balance, Drone Wars UK, national defense reports",
};
