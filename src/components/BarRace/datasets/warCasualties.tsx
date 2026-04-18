import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const SKULL_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M2.5 6.8 Q2.5 2.2 5.5 2.2 Q8.5 2.2 8.5 6.8 L8.5 7.6 L6.7 7.6 L6.7 9.2 L4.3 9.2 L4.3 7.6 L2.5 7.6 Z" fill="rgba(220,50,50,0.25)" stroke="rgba(255,110,110,0.9)" strokeWidth="0.7" strokeLinejoin="round" />
    <circle cx="4.1" cy="5.8" r="0.85" fill="rgba(255,110,110,0.9)" />
    <circle cx="6.9" cy="5.8" r="0.85" fill="rgba(255,110,110,0.9)" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

// Values are in millions of deaths
const ITEMS: BarRaceItem[] = [
  // ── Core major conflicts ───────────────────────────────────────────────────
  { id: "ww2",             name: "World War II",               color: "#ff4444", renderIcon: makeBadgeIcon("WW2",  "#5c0000", "#ff9090", "crosshair") },
  { id: "taiping",         name: "Taiping Rebellion",          color: "#f97316", renderIcon: makeBadgeIcon("TAP",  "#5a2000", "#ffb060", "crosshair") },
  { id: "ww1",             name: "World War I",                color: "#ff8c00", renderIcon: makeBadgeIcon("WW1",  "#5c2800", "#ffc266", "crosshair") },
  { id: "second_sino",     name: "Second Sino-Japanese War",   color: "#e63946", renderIcon: makeBadgeIcon("JSW",  "#5c0d14", "#ff7b85", "crosshair") },
  { id: "dungan",          name: "Dungan Revolt",              color: "#c1121f", renderIcon: makeBadgeIcon("DNG",  "#4a0006", "#ff6672", "shield") },
  { id: "chinese_civil",   name: "Chinese Civil War",          color: "#ef4444", renderIcon: makeBadgeIcon("CCW",  "#5c0a0a", "#ff9090", "crosshair") },
  { id: "russian_civil",   name: "Russian Civil War",          color: "#b91c1c", renderIcon: makeBadgeIcon("RCW",  "#450000", "#ff6060", "crosshair") },
  { id: "second_congo",    name: "Second Congo War",           color: "#2d9e4f", renderIcon: makeBadgeIcon("2CW",  "#0c3d1e", "#5fd87a", "crosshair") },
  { id: "korean_war",      name: "Korean War",                 color: "#4895ef", renderIcon: makeBadgeIcon("KOR",  "#0e2744", "#7ec1ff", "crosshair") },
  { id: "vietnam_cas",     name: "Vietnam War",                color: "#dd2d4a", renderIcon: makeBadgeIcon("VNM",  "#520d18", "#ff7a8a", "crosshair") },
  { id: "napoleonic",      name: "Napoleonic Wars",            color: "#2a9d8f", renderIcon: makeBadgeIcon("NAP",  "#0c3832", "#5de0d0", "sword") },
  { id: "biafra",          name: "Biafran War",                color: "#fb923c", renderIcon: makeBadgeIcon("BFR",  "#5a1e00", "#ffb370", "shield") },
  { id: "soviet_afghan_c", name: "Soviet-Afghan War",          color: "#e76f51", renderIcon: makeBadgeIcon("S-AF", "#5a1e0a", "#ffaa88", "crosshair") },
  { id: "cambodia",        name: "Cambodian Genocide",         color: "#9b5de5", renderIcon: makeBadgeIcon("CAM",  "#2d1259", "#d09bff", "shield") },
  { id: "mexican_rev",     name: "Mexican Revolution",         color: "#fbbf24", renderIcon: makeBadgeIcon("MEX",  "#4d3200", "#ffe080", "sword") },
  { id: "bangladesh",      name: "Bangladesh Liberation War",  color: "#10b981", renderIcon: makeBadgeIcon("BGD",  "#063d28", "#40dfa0", "shield") },
  { id: "iran_iraq_war",   name: "Iran-Iraq War",              color: "#f59e0b", renderIcon: makeBadgeIcon("I-I",  "#4d2e00", "#ffd060", "crosshair") },
  { id: "angola",          name: "Angolan Civil War",          color: "#d4a373", renderIcon: makeBadgeIcon("ANG",  "#4a2e10", "#f3c38c", "shield") },
  { id: "american_civil",  name: "American Civil War",         color: "#3b82f6", renderIcon: makeBadgeIcon("ACW",  "#0e2744", "#7eb8ff", "sword") },
  { id: "rwandan",         name: "Rwandan Genocide",           color: "#4ade80", renderIcon: makeBadgeIcon("RWA",  "#0c3d18", "#80ffa0", "crosshair") },
  { id: "somalia",         name: "Somali Civil War",           color: "#43c59e", renderIcon: makeBadgeIcon("SOM",  "#0e3d33", "#7af0c5", "shield") },
  { id: "crimean_war",     name: "Crimean War",                color: "#818cf8", renderIcon: makeBadgeIcon("CRM",  "#1a1d5c", "#b5baff", "sword") },
  { id: "ethiopia_war",    name: "Ethiopian Civil War",        color: "#a3e635", renderIcon: makeBadgeIcon("ETH",  "#2a4008", "#d0ff60", "crosshair") },
  { id: "iraq_war",        name: "Iraq War 2003",              color: "#fde047", renderIcon: makeBadgeIcon("IRQ",  "#4d3a00", "#fff060", "crosshair") },
  { id: "syria",           name: "Syrian Civil War",           color: "#e09f3e", renderIcon: makeBadgeIcon("SYR",  "#4d2e00", "#ffd07a", "crosshair") },
  { id: "mozambique",      name: "Mozambican Civil War",       color: "#f4a261", renderIcon: makeBadgeIcon("MOZ",  "#5c2e0e", "#ffc87a", "shield") },
  { id: "greek_turkish",   name: "Greco-Turkish War",          color: "#38bdf8", renderIcon: makeBadgeIcon("G-T",  "#063652", "#91e0ff", "crosshair") },
  { id: "franco_prussian", name: "Franco-Prussian War",        color: "#c084fc", renderIcon: makeBadgeIcon("FPW",  "#3a1460", "#e0b0ff", "sword") },
  { id: "bosnian",         name: "Bosnian War",                color: "#67e8f9", renderIcon: makeBadgeIcon("BOS",  "#063a40", "#b0f5ff", "sword") },
  { id: "us_afghan_c",     name: "US-Afghan War",              color: "#c77dff", renderIcon: makeBadgeIcon("AFG",  "#3a1460", "#e4b5ff", "crosshair") },
  // ── Gap-fillers: early 1800s ───────────────────────────────────────────────
  { id: "haitian_rev",     name: "Haitian Revolution",         color: "#c05070", renderIcon: makeBadgeIcon("HTI",  "#4a0d1e", "#ff88a8", "crosshair") },
  { id: "latin_american",  name: "Latin American Wars of Ind.", color: "#d4a017", renderIcon: makeBadgeIcon("LAI",  "#4d3200", "#ffd84f", "sword") },
  { id: "greek_independence", name: "Greek War of Independence", color: "#4a90d9", renderIcon: makeBadgeIcon("GRK", "#0e2b52", "#8ec8ff", "sword") },
  // ── Gap-fillers: mid 1800s ─────────────────────────────────────────────────
  { id: "mfecane",          name: "Mfecane / Zulu Expansion",   color: "#b5835a", renderIcon: makeBadgeIcon("MFC",  "#3d2010", "#e8b080", "crosshair") },
  { id: "carlist_wars",     name: "Carlist Wars (Spain)",        color: "#c05080", renderIcon: makeBadgeIcon("CAR",  "#4a0d20", "#ff88b0", "sword") },
  { id: "indian_rebellion", name: "Indian Rebellion of 1857",   color: "#ff7733", renderIcon: makeBadgeIcon("IND",  "#5a2000", "#ffaa60", "crosshair") },
  { id: "paraguayan_war",   name: "War of the Triple Alliance",  color: "#3d9e60", renderIcon: makeBadgeIcon("PGY",  "#0e3d20", "#70e090", "crosshair") },
  // ── Gap-fillers: late 1800s ────────────────────────────────────────────────
  { id: "congo_free_state", name: "Congo Free State Atrocities", color: "#8b4513", renderIcon: makeBadgeIcon("CFR",  "#2e1508", "#cc7040", "crosshair") },
  { id: "mahdist_war",      name: "Mahdist War (Sudan)",         color: "#daa520", renderIcon: makeBadgeIcon("MAH",  "#4d3200", "#ffd060", "sword") },
  // ── Gap-fillers: interwar & modern ────────────────────────────────────────
  { id: "spanish_civil",   name: "Spanish Civil War",           color: "#cc3333", renderIcon: makeBadgeIcon("ESP",  "#4a0000", "#ff7070", "crosshair") },
  { id: "partition_india", name: "Partition of India",          color: "#ff6b35", renderIcon: makeBadgeIcon("PAR",  "#5a1e00", "#ffaa70", "crosshair") },
  { id: "chechen_wars",    name: "Chechen Wars",                color: "#a0522d", renderIcon: makeBadgeIcon("CHE",  "#3d1a0a", "#d4836a", "crosshair") },
  { id: "yemeni_civil",    name: "Yemeni Civil War",            color: "#8fad55", renderIcon: makeBadgeIcon("YEM",  "#2a3a10", "#c0dd80", "shield") },
];

// Deaths in millions
const MILESTONES: Record<string, Record<number, number>> = {
  // ── Major conflicts ────────────────────────────────────────────────────────
  ww2:             series([1939,0.1],[1940,5],[1941,15],[1942,25],[1943,40],[1944,55],[1945,70],[1946,70],[2025,70]),
  taiping:         series([1850,0.2],[1855,6],[1860,14],[1864,25],[1865,25],[2025,25]),
  ww1:             series([1914,0.5],[1915,4],[1916,9],[1917,14],[1918,20],[1919,20],[2025,20]),
  second_sino:     series([1937,0.3],[1939,3],[1941,7],[1943,11],[1945,15],[1946,15],[2025,15]),
  dungan:          series([1862,0.2],[1866,3],[1870,7],[1875,10],[1877,12],[1878,12],[2025,12]),
  chinese_civil:   series([1927,0.2],[1930,1],[1935,3],[1940,5],[1945,7.5],[1949,10],[1950,10],[2025,10]),
  russian_civil:   series([1917,0.3],[1919,3],[1921,7],[1922,9],[1923,9],[2025,9]),
  second_congo:    series([1998,0.2],[2000,2],[2002,4],[2003,5.4],[2004,5.4],[2025,5.4]),
  korean_war:      series([1950,0.2],[1951,1.5],[1952,3],[1953,4],[1954,4],[2025,4]),
  vietnam_cas:     series([1955,0.1],[1960,0.3],[1965,0.8],[1968,1.5],[1970,2],[1975,3.5],[1976,3.5],[2025,3.5]),
  napoleonic:      series([1803,0.1],[1807,0.8],[1812,2],[1815,3.5],[1816,3.5],[2025,3.5]),
  biafra:          series([1967,0.2],[1969,1],[1970,2],[1971,2],[2025,2]),
  soviet_afghan_c: series([1979,0.1],[1983,0.6],[1987,1.4],[1989,2],[1990,2],[2025,2]),
  cambodia:        series([1975,0.3],[1977,0.9],[1979,1.7],[1980,1.7],[2025,1.7]),
  mexican_rev:     series([1910,0.1],[1913,0.5],[1917,1],[1920,1.5],[1921,1.5],[2025,1.5]),
  bangladesh:      series([1971,0.2],[1972,1.5],[2025,1.5]),
  iran_iraq_war:   series([1980,0.1],[1983,0.4],[1986,0.7],[1988,1],[1989,1],[2025,1]),
  angola:          series([1975,0.1],[1980,0.2],[1990,0.5],[2002,0.8],[2003,0.8],[2025,0.8]),
  american_civil:  series([1861,0.1],[1863,0.4],[1865,0.75],[1866,0.75],[2025,0.75]),
  rwandan:         series([1994,0.1],[1995,0.7],[2025,0.7]),
  somalia:         series([1991,0.1],[1995,0.2],[2000,0.3],[2007,0.4],[2015,0.5],[2025,0.55]),
  crimean_war:     series([1853,0.1],[1854,0.3],[1856,0.5],[1857,0.5],[2025,0.5]),
  ethiopia_war:    series([1974,0.1],[1978,0.2],[1984,0.35],[1991,0.5],[1992,0.5],[2025,0.5]),
  iraq_war:        series([2003,0.1],[2006,0.3],[2009,0.45],[2011,0.5],[2012,0.5],[2025,0.5]),
  syria:           series([2011,0.1],[2013,0.2],[2015,0.35],[2018,0.46],[2021,0.5],[2025,0.53]),
  mozambique:      series([1977,0.1],[1982,0.2],[1988,0.35],[1992,0.4],[1993,0.4],[2025,0.4]),
  greek_turkish:   series([1919,0.1],[1921,0.2],[1922,0.35],[1923,0.35],[2025,0.35]),
  franco_prussian: series([1870,0.06],[1871,0.18],[1872,0.18],[2025,0.18]),
  bosnian:         series([1992,0.06],[1994,0.08],[1995,0.1],[1996,0.1],[2025,0.1]),
  us_afghan_c:     series([2001,0.06],[2005,0.1],[2010,0.15],[2015,0.18],[2021,0.2],[2025,0.2]),
  // ── Gap-fillers: early 1800s ───────────────────────────────────────────────
  // Haitian Revolution (1791-1804): most deaths in final years; we enter mid-conflict
  haitian_rev:      series([1803,0.2],[1804,0.3],[1805,0.3],[2025,0.3]),
  // Latin American Independence Wars (1810-1825): ~600K across 15 years
  latin_american:   series([1810,0.06],[1815,0.25],[1820,0.45],[1825,0.6],[1826,0.6],[2025,0.6]),
  // Greek War of Independence (1821-1829): ~150K
  greek_independence: series([1821,0.03],[1824,0.08],[1829,0.15],[1830,0.15],[2025,0.15]),
  // ── Gap-fillers: mid 1800s ─────────────────────────────────────────────────
  // Mfecane / Zulu Expansion (1815-1840): ~1M killed across southern Africa — fills 1815-1840 gap
  mfecane:          series([1815,0.05],[1820,0.3],[1825,0.6],[1830,0.85],[1835,0.95],[1840,1.0],[1841,1.0],[2025,1.0]),
  // Carlist Wars Spain (1833-1876): ~0.2M — bridges the 1833-1849 dead zone
  carlist_wars:     series([1833,0.03],[1840,0.08],[1849,0.13],[1860,0.17],[1876,0.2],[1877,0.2],[2025,0.2]),
  // Indian Rebellion of 1857 (Sepoy Mutiny): ~800K in just 2 years
  indian_rebellion: series([1857,0.1],[1858,0.8],[1859,0.8],[2025,0.8]),
  // War of the Triple Alliance / Paraguayan War (1864-1870): ~400K, killed 60% of Paraguay
  paraguayan_war:   series([1864,0.06],[1866,0.15],[1868,0.3],[1870,0.4],[1871,0.4],[2025,0.4]),
  // ── Gap-fillers: late 1800s ────────────────────────────────────────────────
  // Congo Free State atrocities (1885-1908): ~5M deaths under Leopold II — fills 1882-1908 gap
  congo_free_state: series([1885,0.2],[1890,1.0],[1895,2.0],[1900,3.5],[1905,4.5],[1908,5.0],[1909,5.0],[2025,5.0]),
  // Mahdist War / Sudan (1881-1899): ~0.4M — runs parallel to Congo gap period
  mahdist_war:      series([1881,0.04],[1885,0.15],[1890,0.25],[1895,0.35],[1899,0.4],[1900,0.4],[2025,0.4]),
  // ── Gap-fillers: interwar & modern ────────────────────────────────────────
  // Spanish Civil War (1936-1939): ~500K
  spanish_civil:    series([1936,0.06],[1937,0.2],[1938,0.38],[1939,0.5],[1940,0.5],[2025,0.5]),
  // Partition of India (1947): ~1M in sectarian violence — most in single year
  partition_india:  series([1947,0.2],[1948,1.0],[1949,1.0],[2025,1.0]),
  // Chechen Wars — First (1994-1996) + Second (1999-2009): ~200K
  chechen_wars:     series([1994,0.03],[1996,0.08],[1999,0.09],[2003,0.15],[2009,0.2],[2010,0.2],[2025,0.2]),
  // Yemeni Civil War (2014-ongoing): ~400K including disease/famine deaths
  yemeni_civil:     series([2014,0.03],[2016,0.1],[2018,0.22],[2020,0.32],[2022,0.38],[2025,0.4]),
};

function formatValue(n: number): string {
  if (n >= 1) return `${n.toFixed(1)}M`;
  return `${Math.round(n * 1000)}K`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const WAR_CASUALTIES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 DEADLIEST WARS",
  subtitle: "THE TRUE COST OF WAR 1800–2025",
  unitLabel: "Estimated Deaths",
  valueUnit: "deaths",
  startYear: 1803,
  endYear: 2025,
  topN: 10,
  minValue: 0.02,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 25,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: SKULL_ICON,
  events: {
    1850: "The Taiping Rebellion erupts in China — the bloodiest civil war in history claims up to 25 million lives",
    1914: "World War I begins — artillery, gas, and trenches make it the first truly industrial slaughter in history",
    1939: "World War II begins — within six years it will kill over 70 million people, the deadliest conflict in history",
    1994: "Rwanda's genocide kills up to 800,000 people in just 100 days — the fastest mass killing ever recorded",
  },
  sourceLabel: "Data: Estimates from historians, PRIO Battle Deaths Dataset + demographic studies",
};
