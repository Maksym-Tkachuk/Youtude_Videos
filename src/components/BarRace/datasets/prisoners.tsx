import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const BARS_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <rect x="1.5" y="2" width="8" height="7.5" rx="1" fill="rgba(100,100,100,0.2)" stroke="#aaa" strokeWidth="0.6" />
    <line x1="3.5" y1="2" x2="3.5" y2="9.5" stroke="#ccc" strokeWidth="0.7" />
    <line x1="5.5" y1="2" x2="5.5" y2="9.5" stroke="#ccc" strokeWidth="0.7" />
    <line x1="7.5" y1="2" x2="7.5" y2="9.5" stroke="#ccc" strokeWidth="0.7" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "brazil",       name: "Brazil",         color: "#4ade80" },
  { id: "india",        name: "India",          color: "#fbbf24" },
  { id: "indonesia",    name: "Indonesia",      color: "#14b8a6" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "iran",         name: "Iran",           color: "#86efac" },
  { id: "mexico",       name: "Mexico",         color: "#a78bfa" },
  { id: "philippines",  name: "Philippines",     color: "#38bdf8" },
  { id: "south_africa", name: "South Africa",   color: "#22c55e" },
  { id: "colombia",     name: "Colombia",       color: "#c084fc" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "japan",        name: "Japan",          color: "#fb7185" },
  { id: "pakistan",      name: "Pakistan",       color: "#34d399" },
  { id: "vietnam",      name: "Vietnam",        color: "#f43f5e" },
  { id: "nigeria",      name: "Nigeria",        color: "#10b981" },
  { id: "argentina",    name: "Argentina",      color: "#7dd3fc" },
  { id: "ukraine",      name: "Ukraine",        color: "#06b6d4" },
  { id: "kazakhstan",   name: "Kazakhstan",     color: "#d946ef" },
]);

// Prison population in thousands (World Prison Brief + historical estimates)
const MILESTONES: Record<string, Record<number, number>> = {
  usa:          series([1970,330],[1975,380],[1980,501],[1985,740],[1990,1148],[1993,1369],[1995,1585],[2000,1937],[2005,2193],[2008,2310],[2010,2267],[2015,2173],[2020,1800],[2025,1770]),
  china:        series([1970,500],[1975,600],[1980,680],[1985,800],[1990,1200],[1995,1400],[2000,1500],[2005,1548],[2010,1640],[2015,1649],[2020,1710],[2025,1760]),
  ussr:         series([1970,1500],[1975,1600],[1980,1700],[1985,1800],[1988,1500],[1990,1400],[1991,1200],[1992,0]),
  russia:       series([1992,800],[1995,870],[1998,1010],[2000,925],[2005,760],[2010,700],[2015,650],[2020,524],[2025,433]),
  brazil:       series([1970,60],[1975,80],[1980,90],[1985,105],[1990,114],[1995,148],[2000,233],[2005,361],[2010,496],[2015,698],[2020,811],[2025,850]),
  india:        series([1970,200],[1975,220],[1980,240],[1985,260],[1990,280],[1995,300],[2000,313],[2005,358],[2010,376],[2015,420],[2020,479],[2025,530]),
  indonesia:    series([1980,30],[1990,50],[2000,52],[2005,70],[2010,130],[2015,170],[2020,250],[2025,272]),
  turkey:       series([1985,40],[1990,45],[1995,50],[2000,60],[2005,55],[2010,120],[2015,172],[2018,250],[2020,280],[2025,310]),
  iran:         series([1990,80],[1995,100],[2000,120],[2005,150],[2010,220],[2015,230],[2020,240],[2025,250]),
  mexico:       series([1975,50],[1980,60],[1990,85],[1995,100],[2000,155],[2005,200],[2010,225],[2015,215],[2020,215],[2025,230]),
  philippines:  series([1990,30],[2000,30],[2005,45],[2010,80],[2015,120],[2017,180],[2020,215],[2025,190]),
  south_africa: series([1985,80],[1990,100],[1995,110],[2000,170],[2005,157],[2010,160],[2015,160],[2020,150],[2025,145]),
  colombia:     series([1990,30],[1995,35],[2000,52],[2005,60],[2010,80],[2015,120],[2020,98],[2025,100]),
  egypt:        series([1990,30],[2000,55],[2005,60],[2010,80],[2015,100],[2020,114],[2025,120]),
  uk:           series([1970,40],[1975,42],[1980,44],[1985,47],[1990,48],[1995,51],[2000,65],[2005,76],[2010,85],[2015,86],[2020,80],[2025,82]),
  germany:      series([1970,40],[1980,50],[1990,55],[1995,65],[2000,70],[2005,78],[2010,72],[2015,63],[2020,56],[2025,55]),
  japan:        series([1970,40],[1975,42],[1980,47],[1985,50],[1990,48],[1995,50],[2000,60],[2005,79],[2010,74],[2015,60],[2020,49],[2025,45]),
  pakistan:     series([1985,30],[1990,40],[1995,50],[2000,60],[2005,70],[2010,80],[2015,76],[2020,77],[2025,80]),
  vietnam:      series([1990,40],[2000,50],[2005,60],[2010,100],[2015,120],[2020,130],[2025,140]),
  nigeria:      series([1985,30],[1990,35],[2000,40],[2005,40],[2010,48],[2015,65],[2020,75],[2025,80]),
  argentina:    series([1990,20],[2000,40],[2005,55],[2010,59],[2015,72],[2020,100],[2025,105]),
  // ── USSR successor states (1992 dissolution) ──
  ukraine:      series([1992,200],[1995,210],[2000,220],[2005,170],[2010,148],[2015,60],[2020,50],[2025,50]),
  kazakhstan:   series([1992,80],[1995,80],[2000,75],[2005,50],[2010,42],[2015,40],[2020,35],[2025,30]),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}M`;
  return `${Math.round(n)}K`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1000).toLocaleString("en-US");
}

export const PRISONERS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 PRISON POPULATIONS",
  subtitle: "THE WORLD BEHIND BARS",
  unitLabel: "Total Incarcerated Population",
  valueUnit: "prisoners",
  startYear: 1970,
  endYear: 2025,
  topN: 10,
  minValue: 5,
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
  unitIcon: BARS_ICON,
  events: {
    1973: "President Nixon declares the 'War on Drugs' — mandatory minimums begin America's era of mass incarceration",
    1994: "US passes 'Three Strikes' and the 1994 Crime Bill — the prison population doubles within the next decade",
    2014: "Brazil's prison population surpasses 600,000 — overtaking Russia as the world's third-largest",
  },
  sourceLabel: "Data: World Prison Brief + Bureau of Justice Statistics + national reports + estimates for China",
};
