import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const DURATION_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <line x1="2.2" y1="1.8" x2="8.8" y2="1.8" stroke="rgba(255,210,100,0.95)" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="2.2" y1="9.2" x2="8.8" y2="9.2" stroke="rgba(255,210,100,0.95)" strokeWidth="1.1" strokeLinecap="round" />
    <path d="M2.8 2.5 L8.2 2.5 L5.5 5 L8.2 8.5 L2.8 8.5 L5.5 5 Z" fill="rgba(255,180,50,0.2)" stroke="rgba(255,210,100,0.7)" strokeWidth="0.7" strokeLinejoin="round" />
    <circle cx="5.5" cy="7.2" r="0.85" fill="rgba(255,205,80,0.95)" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = [
  { id: "reconquista",       name: "Reconquista",               color: "#f4a261", renderIcon: makeBadgeIcon("RCQ",  "#5c2e0e", "#ffc87a", "sword") },
  { id: "arab_byzantine",    name: "Arab-Byzantine Wars",        color: "#4895ef", renderIcon: makeBadgeIcon("ABZ",  "#0e2744", "#7ec1ff", "crosshair") },
  { id: "byzantine_bulgar",  name: "Byzantine-Bulgarian Wars",   color: "#9b5de5", renderIcon: makeBadgeIcon("BBG",  "#2d1259", "#d09bff", "shield") },
  { id: "ottoman_venetian",  name: "Ottoman-Venetian Wars",      color: "#43c59e", renderIcon: makeBadgeIcon("O-V",  "#0e3d33", "#7af0c5", "sword") },
  { id: "ottoman_persia",    name: "Ottoman-Persian Wars",       color: "#ff7f50", renderIcon: makeBadgeIcon("O-P",  "#5a1e0e", "#ffb086", "crosshair") },
  { id: "ottoman_habsburg",  name: "Ottoman-Habsburg Wars",      color: "#e63946", renderIcon: makeBadgeIcon("O-H",  "#5c0d14", "#ff7b85", "shield") },
  { id: "crusades",          name: "The Crusades",               color: "#ffd166", renderIcon: makeBadgeIcon("CRU",  "#4d3800", "#fff0a0", "sword") },
  { id: "mughal_exp",        name: "Mughal Wars",                color: "#d4a373", renderIcon: makeBadgeIcon("MGH",  "#4a2e10", "#f3c38c", "crosshair") },
  { id: "mongols",           name: "Mongol Conquests",           color: "#c1121f", renderIcon: makeBadgeIcon("MON",  "#4a0006", "#ff6672", "sword") },
  { id: "byzantine_ottoman", name: "Byzantine-Ottoman Wars",     color: "#4361ee", renderIcon: makeBadgeIcon("BOT",  "#131b5c", "#8b9fff", "shield") },
  { id: "hundred_years",     name: "Hundred Years' War",         color: "#2d9e4f", renderIcon: makeBadgeIcon("100Y", "#0c3d1e", "#5fd87a", "sword") },
  { id: "kashmir",           name: "Kashmir Conflict",           color: "#52b788", renderIcon: makeBadgeIcon("KSH",  "#103d28", "#91e8b8", "shield") },
  { id: "israel_arab",       name: "Arab-Israeli Conflict",      color: "#38bdf8", renderIcon: makeBadgeIcon("IAC",  "#063652", "#91e0ff", "crosshair") },
  { id: "myanmar_civil",     name: "Myanmar Civil War",          color: "#ffd60a", renderIcon: makeBadgeIcon("MYN",  "#4d3c00", "#ffe55c", "shield") },
  { id: "korean_armistice",  name: "Korean War / Armistice",     color: "#8ecae6", renderIcon: makeBadgeIcon("KOR",  "#1c3d4f", "#c9f0ff", "crosshair") },
  { id: "sudan_civil",       name: "Sudanese Civil Wars",        color: "#e09f3e", renderIcon: makeBadgeIcon("SDN",  "#4d2e00", "#ffd57a", "crosshair") },
  { id: "cold_war",          name: "Cold War",                   color: "#86a6c8", renderIcon: makeBadgeIcon("CLD",  "#1c2d3d", "#b9d4ef", "shield") },
  { id: "colombia",          name: "Colombian Conflict",         color: "#6ab187", renderIcon: makeBadgeIcon("COL",  "#1a3d27", "#9ee8b4", "shield") },
  { id: "thirty_years",      name: "Thirty Years' War",          color: "#b5179e", renderIcon: makeBadgeIcon("30Y",  "#46053e", "#f07ee0", "sword") },
  { id: "troubles",          name: "The Troubles",               color: "#118ab2", renderIcon: makeBadgeIcon("TBL",  "#042a3d", "#54c5f0", "shield") },
  { id: "wars_roses",        name: "Wars of the Roses",          color: "#ff6b9d", renderIcon: makeBadgeIcon("WOR",  "#5c1132", "#ffb0cc", "sword") },
  { id: "vietnam_war",       name: "Vietnam War",                color: "#dd2d4a", renderIcon: makeBadgeIcon("VNM",  "#520d18", "#ff7a8a", "crosshair") },
  { id: "us_afghan",         name: "US-Afghan War",              color: "#c77dff", renderIcon: makeBadgeIcon("AFG",  "#3a1460", "#e4b5ff", "crosshair") },
  { id: "napoleon",          name: "Napoleonic Wars",            color: "#2a9d8f", renderIcon: makeBadgeIcon("NAP",  "#0c3832", "#5de0d0", "sword") },
  { id: "soviet_afghan",     name: "Soviet-Afghan War",          color: "#e76f51", renderIcon: makeBadgeIcon("S-AF", "#5a1e0a", "#ffaa88", "crosshair") },
  { id: "ukraine_war",       name: "Russia-Ukraine War",         color: "#ffd700", renderIcon: makeBadgeIcon("UKR",  "#4d3c00", "#ffe55c", "crosshair") },
  { id: "american_rev",      name: "American Revolution",        color: "#457b9d", renderIcon: makeBadgeIcon("REV",  "#122636", "#88c6e8", "sword") },
  { id: "seven_years",       name: "Seven Years' War",           color: "#7c4dff", renderIcon: makeBadgeIcon("7YR",  "#270f5c", "#c09bff", "sword") },
  { id: "world_war_ii",      name: "World War II",               color: "#ff4444", renderIcon: makeBadgeIcon("WW2",  "#5c0000", "#ff9090", "crosshair") },
  { id: "world_war_i",       name: "World War I",                color: "#ff8c00", renderIcon: makeBadgeIcon("WW1",  "#5c2800", "#ffc266", "crosshair") },
];

// Value = years elapsed (growing while ongoing, frozen after end)
const MILESTONES: Record<string, Record<number, number>> = {
  reconquista:      series([711,0.1],[800,89],[900,189],[1000,289],[1100,389],[1200,489],[1300,589],[1400,689],[1492,781],[1600,781],[2025,781]),
  arab_byzantine:   series([634,0.1],[700,66],[800,166],[900,266],[1000,366],[1050,416],[1200,416],[2025,416]),
  byzantine_bulgar: series([680,0.1],[750,70],[850,170],[950,270],[1018,338],[1200,338],[2025,338]),
  ottoman_venetian: series([1396,0.1],[1450,54],[1550,154],[1650,254],[1718,322],[1800,322],[2025,322]),
  ottoman_persia:   series([1514,0.1],[1600,86],[1700,186],[1800,286],[1823,309],[1900,309],[2025,309]),
  ottoman_habsburg: series([1526,0.1],[1600,74],[1700,174],[1791,265],[1900,265],[2025,265]),
  crusades:         series([1096,0.1],[1150,54],[1200,104],[1250,154],[1291,195],[1500,195],[2025,195]),
  mughal_exp:       series([1526,0.1],[1600,74],[1650,124],[1707,181],[1800,181],[2025,181]),
  mongols:          series([1206,0.1],[1250,44],[1300,94],[1368,162],[1500,162],[2025,162]),
  byzantine_ottoman:series([1299,0.1],[1350,51],[1400,101],[1453,154],[1600,154],[2025,154]),
  hundred_years:    series([1337,0.1],[1375,38],[1415,78],[1453,116],[1600,116],[2025,116]),
  kashmir:          series([1947,0.1],[1960,13],[1970,23],[1980,33],[1990,43],[2000,53],[2010,63],[2020,73],[2025,78]),
  israel_arab:      series([1948,0.1],[1960,12],[1970,22],[1980,32],[1990,42],[2000,52],[2010,62],[2020,72],[2025,77]),
  myanmar_civil:    series([1948,0.1],[1960,12],[1970,22],[1980,32],[1990,42],[2000,52],[2010,62],[2020,72],[2025,77]),
  korean_armistice: series([1950,0.1],[1960,10],[1970,20],[1980,30],[1990,40],[2000,50],[2010,60],[2020,70],[2025,75]),
  sudan_civil:      series([1955,0.1],[1965,10],[1975,20],[1985,30],[1995,40],[2005,50],[2011,56],[2020,65],[2025,65]),
  cold_war:         series([1947,0.1],[1957,10],[1967,20],[1977,30],[1987,40],[1991,44],[2025,44]),
  colombia:         series([1964,0.1],[1975,11],[1985,21],[1995,31],[2005,41],[2016,52],[2025,52]),
  thirty_years:     series([1618,0.1],[1625,7],[1635,17],[1648,30],[1700,30],[2025,30]),
  troubles:         series([1968,0.1],[1978,10],[1988,20],[1998,30],[2025,30]),
  wars_roses:       series([1455,0.1],[1465,10],[1475,20],[1487,32],[1600,32],[2025,32]),
  vietnam_war:      series([1955,0.1],[1963,8],[1970,15],[1975,20],[2025,20]),
  us_afghan:        series([2001,0.1],[2007,6],[2013,12],[2021,20],[2025,20]),
  napoleon:         series([1803,0.1],[1808,5],[1812,9],[1815,12],[2025,12]),
  soviet_afghan:    series([1979,0.1],[1983,4],[1987,8],[1989,10],[2025,10]),
  ukraine_war:      series([2014,0.1],[2016,2],[2018,4],[2020,6],[2022,8],[2025,11]),
  american_rev:     series([1775,0.1],[1779,4],[1783,8],[2025,8]),
  seven_years:      series([1756,0.1],[1759,3],[1763,7],[2025,7]),
  world_war_ii:     series([1939,0.1],[1941,2],[1943,4],[1945,6],[2025,6]),
  world_war_i:      series([1914,0.1],[1916,2],[1918,4],[2025,4]),
};

function formatValue(n: number): string {
  return String(Math.round(n));
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const WAR_DURATIONS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 LONGEST WARS IN HISTORY",
  subtitle: "WHICH CONFLICT NEVER ENDED?",
  unitLabel: "Duration (years)",
  valueUnit: "years",
  startYear: 630,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 200,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: DURATION_ICON,
  events: {
    711:  "Muslim armies cross into Iberia — the Reconquista begins a conflict that will last 781 years",
    1096: "Pope Urban II calls the First Crusade — Christendom launches nearly two centuries of holy war",
    1618: "The Thirty Years' War erupts across Europe, killing a third of Germany's population before it ends",
    1914: "World War I begins — four years of industrial slaughter shock a world that thought war was heroic",
  },
  sourceLabel: "Data: Historians' consensus durations + ongoing conflict trackers",
};
