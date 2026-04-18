import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const GOLD_BAR_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M2.5 7.5 L4 4 H7 L8.5 7.5 Z" fill="#d4a017" stroke="#ffd700" strokeWidth="0.6" strokeLinejoin="round" />
    <path d="M4 4 L4.5 3 H6.5 L7 4" fill="#e6b422" stroke="#ffd700" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="4" y1="4" x2="7" y2="4" stroke="#b8860b" strokeWidth="0.4" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "italy",        name: "Italy",          color: "#34d399" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "switzerland",  name: "Switzerland",    color: "#f43f5e" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "netherlands",  name: "Netherlands",    color: "#a3e635" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#10b981" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "kazakhstan",   name: "Kazakhstan",     color: "#38bdf8" },
]);

// Central bank gold reserves in metric tonnes (World Gold Council data)
const MILESTONES: Record<string, Record<number, number>> = {
  usa:          series([1950,20279],[1955,19331],[1960,15822],[1965,12499],[1970,9839],[1975,8544],[1980,8221],[1985,8177],[1990,8146],[1995,8140],[2000,8137],[2005,8134],[2010,8133],[2015,8133],[2020,8133],[2025,8133]),
  germany:      series([1950,0.1],[1955,200],[1960,1500],[1965,3200],[1968,4034],[1970,3900],[1975,3658],[1980,3701],[1985,3701],[1990,3701],[1995,3701],[2000,3468],[2005,3427],[2010,3401],[2015,3381],[2020,3364],[2025,3352]),
  italy:        series([1950,200],[1955,500],[1960,1600],[1965,2200],[1970,2565],[1975,2565],[1980,2074],[1985,2074],[1990,2074],[1995,2074],[2000,2452],[2005,2452],[2010,2452],[2015,2452],[2020,2452],[2025,2452]),
  france:       series([1950,500],[1955,800],[1960,1500],[1965,3000],[1968,3800],[1970,3139],[1975,3139],[1980,2546],[1985,2546],[1990,2546],[1995,2546],[2000,3025],[2005,2780],[2010,2435],[2015,2436],[2020,2436],[2025,2437]),
  ussr:         series([1950,2000],[1955,1800],[1960,1500],[1965,1200],[1970,1000],[1975,800],[1980,700],[1985,600],[1990,400],[1991,240],[1992,0]),
  russia:       series([1992,240],[1995,300],[2000,384],[2005,400],[2007,450],[2010,790],[2013,1035],[2015,1275],[2018,2036],[2020,2272],[2025,2333]),
  china:        series([1950,50],[1960,150],[1970,200],[1980,395],[1985,395],[1990,395],[1995,395],[2000,395],[2003,600],[2009,1054],[2013,1054],[2015,1762],[2018,1842],[2020,1948],[2023,2200],[2025,2280]),
  japan:        series([1950,50],[1955,100],[1960,300],[1965,400],[1970,657],[1975,754],[1980,754],[1990,754],[2000,765],[2010,765],[2020,765],[2021,846],[2025,846]),
  switzerland:  series([1950,1200],[1955,1400],[1960,1800],[1965,2200],[1970,2590],[1975,2590],[1980,2590],[1985,2590],[1990,2590],[1995,2590],[2000,2590],[2005,1290],[2008,1040],[2010,1040],[2015,1040],[2020,1040],[2025,1040]),
  india:        series([1950,200],[1960,200],[1970,200],[1980,250],[1990,333],[2000,357],[2009,558],[2015,557],[2018,600],[2020,668],[2022,760],[2025,854]),
  netherlands:  series([1950,100],[1955,400],[1960,1000],[1965,1700],[1970,1700],[1975,1700],[1980,1367],[1990,1367],[1995,912],[2000,912],[2005,720],[2008,612],[2015,612],[2020,612],[2025,612]),
  uk:           series([1950,2543],[1955,2012],[1960,1800],[1965,1600],[1970,1300],[1975,1000],[1980,600],[1985,590],[1990,570],[1995,570],[2000,500],[2005,310],[2010,310],[2015,310],[2020,310],[2025,310]),
  turkey:       series([1955,100],[1960,120],[1970,130],[1980,116],[1990,116],[2000,116],[2010,116],[2015,416],[2018,275],[2020,527],[2023,570],[2025,570]),
  poland:       series([1960,60],[1970,80],[1980,100],[1990,102],[2000,103],[2010,103],[2018,103],[2019,229],[2022,334],[2025,420]),
  saudi_arabia: series([1960,50],[1970,100],[1980,143],[1990,143],[2000,143],[2008,143],[2010,323],[2015,323],[2020,323],[2025,323]),
  spain:        series([1960,100],[1965,200],[1970,400],[1975,500],[1980,460],[1990,440],[1995,440],[2000,440],[2005,416],[2008,282],[2010,282],[2015,282],[2020,282],[2025,282]),
  // ── USSR successor states (1992 dissolution) ──
  ukraine:      series([1992,17],[1995,17],[2000,17],[2005,20],[2010,27],[2015,24],[2020,25],[2025,27]),
  kazakhstan:   series([1992,20],[1995,25],[2000,40],[2005,55],[2010,67],[2012,100],[2015,210],[2018,340],[2020,380],[2025,300]),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return `${Math.round(n).toLocaleString("en-US")} t`;
}

export const GOLD_RESERVES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 GOLD RESERVES",
  subtitle: "WHO HOLDS THE WORLD'S GOLD?",
  unitLabel: "Central Bank Gold Reserves (metric tonnes)",
  valueUnit: "tonnes",
  startYear: 1950,
  endYear: 2025,
  topN: 10,
  minValue: 10,
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
  unitIcon: GOLD_BAR_ICON,
  events: {
    1955: "Post-war European economies recover — nations demand gold from the US under the Bretton Woods fixed-rate system",
    1971: "President Nixon ends the gold standard — the US closes the gold window and the dollar becomes fiat currency",
    1999: "Switzerland and the UK begin selling massive gold reserves — gold prices crash to 20-year lows",
    2015: "China reveals it has secretly tripled its gold reserves — Russia and China lead a global de-dollarization push",
  },
  sourceLabel: "Data: World Gold Council + IMF IFS + central bank disclosures + historical estimates",
};
