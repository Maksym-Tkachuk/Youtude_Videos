import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const GRAIN_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M5.5 2 C4 3.5 4 5 5.5 6.5 C7 5 7 3.5 5.5 2Z" fill="rgba(220,180,50,0.3)" stroke="rgba(255,210,80,0.9)" strokeWidth="0.6" />
    <path d="M5.5 4 C3.5 5 3.5 7 5.5 8 C7.5 7 7.5 5 5.5 4Z" fill="rgba(220,180,50,0.3)" stroke="rgba(255,210,80,0.9)" strokeWidth="0.6" />
    <line x1="5.5" y1="6" x2="5.5" y2="10" stroke="rgba(255,210,80,0.9)" strokeWidth="0.7" strokeLinecap="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

// Values are in millions of deaths
const ITEMS: BarRaceItem[] = [
  { id: "great_chinese_famine", name: "Great Chinese Famine",        color: "#ef4444", renderIcon: makeBadgeIcon("GCF", "#5c0000", "#ff9090", "shield") },
  { id: "bengal_1770",          name: "Bengal Famine 1770",          color: "#f97316", renderIcon: makeBadgeIcon("BN7", "#5a2000", "#ffb060", "shield") },
  { id: "chalisa",              name: "Chalisa Famine 1783",         color: "#fb923c", renderIcon: makeBadgeIcon("CHL", "#5a2000", "#ffb880", "shield") },
  { id: "doji_bara",            name: "Doji Bara Famine 1791",       color: "#e09f3e", renderIcon: makeBadgeIcon("DJB", "#4d2e00", "#ffd07a", "shield") },
  { id: "holodomor",            name: "Holodomor",                   color: "#dc2626", renderIcon: makeBadgeIcon("HLD", "#5c0000", "#ff7070", "shield") },
  { id: "chinese_1907",         name: "Chinese Famine 1907",         color: "#f87171", renderIcon: makeBadgeIcon("C07", "#5c0a0a", "#ff9090", "shield") },
  { id: "russian_1921",         name: "Russian Famine 1921",         color: "#b91c1c", renderIcon: makeBadgeIcon("R21", "#450000", "#ff6060", "shield") },
  { id: "indian_1876",          name: "Great Indian Famine 1876",    color: "#f59e0b", renderIcon: makeBadgeIcon("I76", "#4d2e00", "#ffd060", "shield") },
  { id: "chinese_1936",         name: "Chinese Famine 1936",         color: "#e63946", renderIcon: makeBadgeIcon("C36", "#5c0d14", "#ff7b85", "shield") },
  { id: "indian_1896",          name: "Indian Famine 1896",          color: "#fbbf24", renderIcon: makeBadgeIcon("I96", "#4d3200", "#ffe080", "shield") },
  { id: "bengal_1943",          name: "Bengal Famine 1943",          color: "#eab308", renderIcon: makeBadgeIcon("B43", "#4d3a00", "#fff060", "shield") },
  { id: "vietnamese_1945",      name: "Vietnamese Famine 1945",      color: "#dd2d4a", renderIcon: makeBadgeIcon("VN4", "#520d18", "#ff7a8a", "shield") },
  { id: "persian_1917",         name: "Persian Famine 1917",         color: "#d4a373", renderIcon: makeBadgeIcon("PR1", "#4a2e10", "#f3c38c", "shield") },
  { id: "irish_famine",         name: "Irish Potato Famine",         color: "#22c55e", renderIcon: makeBadgeIcon("IRL", "#0c3d18", "#5fe090", "shield") },
  { id: "soviet_1947",          name: "Soviet Famine 1947",          color: "#a855f7", renderIcon: makeBadgeIcon("S47", "#2d1259", "#d09bff", "shield") },
  { id: "north_korean",         name: "North Korean Famine",         color: "#9b5de5", renderIcon: makeBadgeIcon("NKF", "#2d1259", "#c88dff", "shield") },
  { id: "chinese_1928",         name: "Chinese Famine 1928",         color: "#c05070", renderIcon: makeBadgeIcon("C28", "#4a0d1e", "#ff88a8", "shield") },
  { id: "ethiopian_1983",       name: "Ethiopian Famine 1983",       color: "#34d399", renderIcon: makeBadgeIcon("ET8", "#0c3d28", "#60e0b0", "shield") },
  { id: "cambodian",            name: "Cambodian Famine",            color: "#c084fc", renderIcon: makeBadgeIcon("CAM", "#3a1460", "#e0b0ff", "shield") },
  { id: "biafran",              name: "Biafran Famine",              color: "#4ade80", renderIcon: makeBadgeIcon("BFR", "#0c3d18", "#80ffa0", "shield") },
  { id: "java_1944",            name: "Java Famine 1944",            color: "#3b82f6", renderIcon: makeBadgeIcon("JAV", "#0e2744", "#7eb8ff", "shield") },
  { id: "greek_1941",           name: "Greek Famine 1941",           color: "#818cf8", renderIcon: makeBadgeIcon("GRK", "#1a1d5c", "#b5baff", "shield") },
  { id: "indian_1899",          name: "Indian Famine 1899",          color: "#fde047", renderIcon: makeBadgeIcon("I99", "#4d3a00", "#fff060", "shield") },
  { id: "sahel_drought",        name: "Sahel Drought 1968",          color: "#06b6d4", renderIcon: makeBadgeIcon("SAH", "#063a40", "#60e0f0", "shield") },
  { id: "somali_2011",          name: "Somali Famine 2011",          color: "#43c59e", renderIcon: makeBadgeIcon("SOM", "#0e3d33", "#7af0c5", "shield") },
  { id: "yemeni",               name: "Yemeni Famine",              color: "#8fad55", renderIcon: makeBadgeIcon("YEM", "#2a3a10", "#c0dd80", "shield") },
  { id: "dutch_hunger",         name: "Dutch Hunger Winter",         color: "#60a5fa", renderIcon: makeBadgeIcon("DHW", "#0e2744", "#90c8ff", "shield") },
  { id: "madras_1877",          name: "Madras Famine 1877",          color: "#38bdf8", renderIcon: makeBadgeIcon("MAD", "#063652", "#91e0ff", "shield") },
  { id: "rajputana_1868",       name: "Rajputana Famine 1868",       color: "#67e8f9", renderIcon: makeBadgeIcon("RAJ", "#063a40", "#b0f5ff", "shield") },
  { id: "agra_1837",            name: "Agra Famine 1837",            color: "#a3e635", renderIcon: makeBadgeIcon("AGR", "#2a4008", "#d0ff60", "shield") },
  { id: "skull_famine",         name: "Skull Famine 1791 (India)",   color: "#86efac", renderIcon: makeBadgeIcon("SKL", "#0c3d18", "#a0ffc0", "shield") },
  { id: "orissa_1866",          name: "Orissa Famine 1866",          color: "#f9a8d4", renderIcon: makeBadgeIcon("ORS", "#4a0d2e", "#ffb8e0", "shield") },
  { id: "south_sudan",          name: "South Sudan Famine 2017",     color: "#10b981", renderIcon: makeBadgeIcon("SSD", "#063d28", "#40dfa0", "shield") },
  { id: "tigray_2020",          name: "Tigray Famine 2020",          color: "#fb7185", renderIcon: makeBadgeIcon("TGR", "#5c0d1e", "#ff9aaa", "shield") },
];

// Deaths in millions (cumulative)
const MILESTONES: Record<string, Record<number, number>> = {
  bengal_1770:          series([1769,0.2],[1770,3],[1771,7],[1773,10],[1774,10],[2025,10]),
  chalisa:              series([1783,0.5],[1784,8],[1785,11],[1786,11],[2025,11]),
  doji_bara:            series([1791,0.5],[1792,8],[1793,11],[1794,11],[2025,11]),
  // Separate from doji_bara — different region (Mysore/Deccan)
  skull_famine:         series([1791,0.1],[1792,0.5],[1793,0.8],[1794,0.8],[2025,0.8]),
  agra_1837:            series([1837,0.1],[1838,0.5],[1839,0.8],[1840,0.8],[2025,0.8]),
  irish_famine:         series([1845,0.1],[1846,0.3],[1847,0.6],[1848,0.8],[1849,0.9],[1852,1],[1853,1],[2025,1]),
  orissa_1866:          series([1866,0.1],[1867,0.5],[1868,1],[1869,1],[2025,1]),
  rajputana_1868:       series([1868,0.1],[1869,0.5],[1870,1],[1871,1.5],[1872,1.5],[2025,1.5]),
  indian_1876:          series([1876,0.2],[1877,2],[1878,4],[1879,5.5],[1880,5.5],[2025,5.5]),
  // Part of the Great Indian Famine but Madras Presidency specifically
  madras_1877:          series([1877,0.5],[1878,2],[1879,3.5],[1880,3.5],[2025,3.5]),
  indian_1896:          series([1896,0.2],[1897,2],[1898,3.5],[1899,4.5],[1900,4.5],[2025,4.5]),
  indian_1899:          series([1899,0.1],[1900,0.5],[1901,1],[1902,1],[2025,1]),
  // North China famine 1907, estimated 20-25M
  chinese_1907:         series([1907,0.5],[1908,10],[1910,24],[1911,24],[2025,24]),
  persian_1917:         series([1917,0.2],[1918,1],[1919,2],[1920,2],[2025,2]),
  russian_1921:         series([1921,0.5],[1922,3],[1923,5],[1924,5],[2025,5]),
  chinese_1928:         series([1928,0.3],[1929,1.5],[1930,3],[1931,3],[2025,3]),
  holodomor:            series([1932,0.5],[1933,5],[1934,7.5],[1935,7.5],[2025,7.5]),
  chinese_1936:         series([1936,0.5],[1937,3],[1938,5],[1939,5],[2025,5]),
  greek_1941:           series([1941,0.05],[1942,0.15],[1943,0.25],[1944,0.3],[1945,0.3],[2025,0.3]),
  bengal_1943:          series([1943,0.3],[1944,1.5],[1945,2.5],[1946,2.5],[2025,2.5]),
  dutch_hunger:         series([1944,0.003],[1945,0.022],[1946,0.022],[2025,0.022]),
  java_1944:            series([1944,0.3],[1945,1.8],[1946,2.4],[1947,2.4],[2025,2.4]),
  vietnamese_1945:      series([1944,0.2],[1945,1.5],[1946,2],[1947,2],[2025,2]),
  soviet_1947:          series([1946,0.2],[1947,0.8],[1948,1.2],[1949,1.5],[1950,1.5],[2025,1.5]),
  // Using ~45M mid-range estimate for Great Leap Forward famine
  great_chinese_famine: series([1959,1],[1960,15],[1961,35],[1962,45],[1963,45],[2025,45]),
  biafran:              series([1967,0.1],[1968,0.5],[1969,0.8],[1970,1],[1971,1],[2025,1]),
  sahel_drought:        series([1968,0.02],[1970,0.04],[1972,0.08],[1974,0.1],[1975,0.1],[2025,0.1]),
  cambodian:            series([1975,0.05],[1976,0.2],[1977,0.35],[1979,0.5],[1980,0.5],[2025,0.5]),
  ethiopian_1983:       series([1983,0.1],[1984,0.4],[1985,0.8],[1986,1],[1987,1],[2025,1]),
  // Arduous March: estimates range 240K-3.5M, using 3.5M high estimate
  north_korean:         series([1994,0.1],[1995,0.5],[1996,1.5],[1997,2.5],[1998,3],[1999,3.5],[2000,3.5],[2025,3.5]),
  somali_2011:          series([2011,0.05],[2012,0.2],[2013,0.26],[2025,0.26]),
  south_sudan:          series([2017,0.01],[2018,0.03],[2019,0.05],[2020,0.05],[2025,0.05]),
  yemeni:               series([2016,0.01],[2018,0.04],[2020,0.06],[2022,0.08],[2025,0.085]),
  // Tigray War famine
  tigray_2020:          series([2020,0.01],[2021,0.1],[2022,0.3],[2023,0.3],[2025,0.3]),
};

function formatValue(n: number): string {
  if (n >= 1) return `${n.toFixed(1)}M`;
  return `${Math.round(n * 1000)}K`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const FAMINES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 DEADLIEST FAMINES",
  subtitle: "WHEN HUNGER BECOMES A WEAPON 1750\u20132025",
  unitLabel: "Estimated Deaths",
  valueUnit: "deaths",
  startYear: 1750,
  endYear: 2025,
  topN: 10,
  minValue: 0.01,
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
  unitIcon: GRAIN_ICON,
  events: {
    1770: "The Great Bengal Famine kills 10 million as the East India Company forces farmers to grow opium instead of rice",
    1845: "The Irish Potato Famine begins \u2014 a million die and another million flee as Britain exports food out of starving Ireland",
    1932: "Stalin\u2019s forced grain seizures trigger the Holodomor \u2014 up to 7.5 million Ukrainians starve in a man-made catastrophe",
    1959: "Mao\u2019s Great Leap Forward backfires catastrophically \u2014 the worst famine in human history kills up to 55 million Chinese",
  },
  sourceLabel: "Data: Historical demographic studies, \u00D3 Gr\u00E1da (2009), Devereux (2000), and academic estimates",
};
