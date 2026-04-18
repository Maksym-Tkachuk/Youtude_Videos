import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const BUDGET_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <circle cx="5.5" cy="5.5" r="4" fill="#0f2a14" stroke="#ffd700" strokeWidth="0.8" />
    <path d="M5.5 2.5 V8.5" stroke="#ffd700" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M7 3.8 C6.5 3.2 4.5 3.2 4 4 C3.5 4.8 4.2 5.3 5.5 5.5 C6.8 5.7 7.5 6.2 7 7 C6.5 7.8 4.5 7.8 4 7.2" stroke="#ffd700" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "ussr",         name: "USSR",           color: "#ef4444" },
  { id: "russia",       name: "Russia",         color: "#f87171" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#10b981" },
  { id: "japan",        name: "Japan",          color: "#fb7185" },
  { id: "india",        name: "India",          color: "#fbbf24" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "australia",    name: "Australia",      color: "#a3e635" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "italy",        name: "Italy",          color: "#34d399" },
  { id: "canada",       name: "Canada",         color: "#c084fc" },
  { id: "brazil",       name: "Brazil",         color: "#4ade80" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "uae",          name: "UAE",            color: "#60a5fa" },
  { id: "ukraine",      name: "Ukraine",        color: "#fde047" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "iran",         name: "Iran",           color: "#86efac" },
  { id: "netherlands",  name: "Netherlands",    color: "#7dd3fc" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "norway",       name: "Norway",         color: "#67e8f9" },
]);

// Annual military spending in USD billions (nominal)
const MILESTONES: Record<string, Record<number, number>> = {
  usa:          series([1960,48],[1965,50],[1968,82],[1970,81],[1975,87],[1980,134],[1985,253],[1990,300],[1995,272],[2000,295],[2003,450],[2005,502],[2010,698],[2015,596],[2020,738],[2022,801],[2025,860]),
  ussr:         series([1960,36],[1965,52],[1970,72],[1975,110],[1980,155],[1985,195],[1990,246],[1991,220],[1992,0]),
  russia:       series([1992,0],[1993,13],[1995,9],[2000,9],[2005,27],[2010,59],[2015,66],[2020,62],[2022,86],[2025,130]),
  china:        series([1960,5],[1965,6],[1970,8],[1975,12],[1980,10],[1985,12],[1990,12],[1995,15],[2000,22],[2005,44],[2010,115],[2015,215],[2020,252],[2025,320]),
  uk:           series([1960,15],[1965,18],[1970,22],[1975,24],[1980,38],[1985,38],[1990,43],[1995,34],[2000,35],[2005,50],[2010,57],[2015,55],[2020,59],[2025,75]),
  france:       series([1960,13],[1965,15],[1970,18],[1975,22],[1980,32],[1985,35],[1990,43],[1995,38],[2000,33],[2005,44],[2010,50],[2015,45],[2020,52],[2025,60]),
  germany:      series([1960,5],[1965,12],[1970,19],[1975,24],[1980,34],[1985,39],[1990,45],[1995,34],[2000,32],[2005,36],[2010,45],[2015,37],[2020,53],[2022,56],[2023,66],[2025,100]),
  saudi_arabia: series([1960,0.2],[1965,0.5],[1970,2],[1975,7],[1980,23],[1985,30],[1990,24],[1995,20],[2000,20],[2005,30],[2010,45],[2015,82],[2018,68],[2020,76],[2025,80]),
  japan:        series([1960,0.4],[1965,0.8],[1970,2],[1975,5],[1980,9],[1985,15],[1990,29],[1995,48],[2000,46],[2005,42],[2010,54],[2015,42],[2020,49],[2025,66]),
  india:        series([1960,2],[1965,3],[1970,3],[1975,4],[1980,7],[1985,10],[1990,10],[1995,9],[2000,14],[2005,22],[2010,41],[2015,51],[2020,73],[2025,83]),
  south_korea:  series([1960,0.1],[1965,0.3],[1970,1],[1975,3],[1980,5],[1985,6],[1990,12],[1995,14],[2000,15],[2005,21],[2010,28],[2015,36],[2020,46],[2025,52]),
  australia:    series([1960,1],[1965,1.5],[1970,3],[1975,3],[1980,6],[1985,7],[1990,9],[1995,10],[2000,11],[2005,16],[2010,24],[2015,24],[2020,28],[2025,40]),
  israel:       series([1967,3],[1970,5],[1975,8],[1980,8],[1985,8],[1990,8],[1995,9],[2000,9],[2005,11],[2010,14],[2015,17],[2020,21],[2025,27]),
  italy:        series([1960,3],[1965,5],[1970,8],[1975,12],[1980,18],[1985,22],[1990,25],[1995,22],[2000,22],[2005,28],[2010,27],[2015,22],[2020,26],[2025,31]),
  canada:       series([1960,2],[1965,2.5],[1970,3],[1975,4],[1980,6],[1985,10],[1990,12],[1995,9],[2000,7],[2005,13],[2010,19],[2015,16],[2020,24],[2025,26]),
  brazil:       series([1970,2],[1975,3],[1980,6],[1985,6],[1990,5],[1995,8],[2000,14],[2005,18],[2010,38],[2015,25],[2020,29],[2025,28]),
  turkey:       series([1960,0.5],[1965,1],[1970,1.5],[1975,2],[1980,3],[1985,4],[1990,6],[1995,9],[2000,10],[2005,14],[2010,16],[2015,17],[2020,12],[2025,17]),
  uae:          series([1975,0.2],[1980,1],[1985,2],[1990,3],[1995,3],[2000,3],[2005,8],[2010,16],[2015,22],[2020,23],[2025,24]),
  ukraine:      series([1993,2],[1995,1.5],[2000,1],[2005,1.5],[2010,2],[2014,3],[2015,4],[2020,6],[2022,44],[2025,65]),
  poland:       series([1990,2],[1995,2.5],[2000,4],[2005,5],[2010,8],[2015,10],[2020,13],[2022,16],[2024,30],[2025,38]),
  iran:         series([1980,5],[1985,9],[1990,7],[1995,5],[2000,5],[2005,7],[2010,10],[2015,16],[2020,25],[2025,30]),
  netherlands:  series([1960,2],[1970,4],[1980,7],[1990,9],[2000,9],[2010,11],[2015,10],[2020,13],[2025,22]),
  spain:        series([1975,2],[1980,4],[1985,7],[1990,9],[1995,8],[2000,10],[2010,13],[2015,11],[2020,12],[2025,18]),
  norway:       series([1975,1],[1980,2],[1990,4],[2000,4],[2010,7],[2015,7],[2020,8],[2025,10]),
};

function formatValue(n: number): string {
  if (n >= 100) return `$${Math.round(n)}B`;
  if (n >= 1) return `$${n.toFixed(1)}B`;
  return `$${n.toFixed(2)}B`;
}

function formatValueFull(n: number): string {
  return `$${Math.round(n * 1_000_000_000).toLocaleString("en-US")}`;
}

export const DEFENSE_BUDGET_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 DEFENSE BUDGETS",
  subtitle: "WHO SPENDS THE MOST ON WAR?",
  unitLabel: "Annual Military Spending (USD billions)",
  valueUnit: "USD",
  startYear: 1960,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
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
  unitIcon: BUDGET_ICON,
  events: {
    1965: "Vietnam War escalation drives US defense spending to the highest levels since World War II",
    1985: "Reagan arms buildup peaks — the US outspends the Soviet Union and reshapes the Cold War balance",
    2001: "9/11 attacks trigger a decade-long US military surge — annual spending nearly triples within ten years",
    2022: "Russia invades Ukraine — Germany, Poland, and NATO allies launch the largest European rearmament since World War II",
  },
  sourceLabel: "Data: SIPRI Military Expenditure Database + historical estimates",
};
