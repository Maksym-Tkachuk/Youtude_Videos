import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const VIRUS_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <circle cx="5.5" cy="5.5" r="3" fill="rgba(80,200,80,0.25)" stroke="rgba(80,220,80,0.9)" strokeWidth="0.7" />
    <line x1="5.5" y1="1.2" x2="5.5" y2="3" stroke="rgba(80,220,80,0.9)" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="5.5" y1="8" x2="5.5" y2="9.8" stroke="rgba(80,220,80,0.9)" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="1.2" y1="5.5" x2="3" y2="5.5" stroke="rgba(80,220,80,0.9)" strokeWidth="0.7" strokeLinecap="round" />
    <line x1="8" y1="5.5" x2="9.8" y2="5.5" stroke="rgba(80,220,80,0.9)" strokeWidth="0.7" strokeLinecap="round" />
    <circle cx="5.5" cy="5.5" r="1" fill="rgba(80,220,80,0.9)" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

// Values are in millions of deaths
const ITEMS: BarRaceItem[] = [
  { id: "black_death",       name: "Black Death",              color: "#a855f7", renderIcon: makeBadgeIcon("BDT", "#2d0854", "#c98aff", "shield") },
  { id: "smallpox_americas", name: "Smallpox in Americas",     color: "#ef4444", renderIcon: makeBadgeIcon("SPX", "#5c0a0a", "#ff9090", "shield") },
  { id: "spanish_flu",       name: "Spanish Flu",              color: "#f97316", renderIcon: makeBadgeIcon("SFL", "#5a2000", "#ffb060", "shield") },
  { id: "hiv_aids",          name: "HIV / AIDS",               color: "#dc2626", renderIcon: makeBadgeIcon("HIV", "#5c0000", "#ff6060", "shield") },
  { id: "plague_third",      name: "Third Plague Pandemic",    color: "#8b5cf6", renderIcon: makeBadgeIcon("3PL", "#261259", "#b99aff", "shield") },
  { id: "cocoliztli_1545",   name: "Cocoliztli 1545",         color: "#d946ef", renderIcon: makeBadgeIcon("CCZ", "#4a0d54", "#ee88ff", "shield") },
  { id: "covid19",           name: "COVID-19",                 color: "#3b82f6", renderIcon: makeBadgeIcon("C19", "#0e2744", "#7eb8ff", "shield") },
  { id: "cocoliztli_1576",   name: "Cocoliztli 1576",         color: "#c084fc", renderIcon: makeBadgeIcon("CC2", "#3a1460", "#e0b0ff", "shield") },
  { id: "typhus_russia",     name: "Russian Typhus",           color: "#b91c1c", renderIcon: makeBadgeIcon("TYP", "#450000", "#ff6060", "shield") },
  { id: "persian_plague",    name: "Persian Plague",           color: "#e09f3e", renderIcon: makeBadgeIcon("PRS", "#4d2e00", "#ffd07a", "shield") },
  { id: "cholera_3",         name: "Third Cholera Pandemic",   color: "#06b6d4", renderIcon: makeBadgeIcon("CH3", "#063a40", "#40d8e8", "shield") },
  { id: "asian_flu",         name: "Asian Flu 1957",           color: "#f472b6", renderIcon: makeBadgeIcon("ASN", "#4a0d2e", "#ff88c8", "shield") },
  { id: "italian_plague",    name: "Italian Plague 1629",      color: "#34d399", renderIcon: makeBadgeIcon("ITP", "#0c3d28", "#60e8b0", "shield") },
  { id: "hong_kong_flu",     name: "Hong Kong Flu",            color: "#fb923c", renderIcon: makeBadgeIcon("HKF", "#5a2800", "#ffc070", "shield") },
  { id: "russian_flu_1889",  name: "Russian Flu 1889",         color: "#f87171", renderIcon: makeBadgeIcon("RFL", "#5c1414", "#ffa0a0", "shield") },
  { id: "cholera_6",         name: "Sixth Cholera Pandemic",   color: "#22d3ee", renderIcon: makeBadgeIcon("CH6", "#063a44", "#60e8f8", "shield") },
  { id: "cholera_4",         name: "Fourth Cholera Pandemic",  color: "#67e8f9", renderIcon: makeBadgeIcon("CH4", "#0a3d44", "#90f0ff", "shield") },
  { id: "encephalitis",      name: "Encephalitis Lethargica",  color: "#a3e635", renderIcon: makeBadgeIcon("ENC", "#2a4008", "#d0ff60", "shield") },
  { id: "plague_seville",    name: "Plague of Seville",        color: "#10b981", renderIcon: makeBadgeIcon("SEV", "#063d28", "#40dfa0", "shield") },
  { id: "cholera_5",         name: "Fifth Cholera Pandemic",   color: "#38bdf8", renderIcon: makeBadgeIcon("CH5", "#063652", "#80d8ff", "shield") },
  { id: "swine_flu",         name: "Swine Flu H1N1",           color: "#fbbf24", renderIcon: makeBadgeIcon("H1N", "#4d3200", "#ffe080", "shield") },
  { id: "cholera_2",         name: "Second Cholera Pandemic",  color: "#7dd3fc", renderIcon: makeBadgeIcon("CH2", "#0a3050", "#a0e0ff", "shield") },
  { id: "cholera_1",         name: "First Cholera Pandemic",   color: "#60a5fa", renderIcon: makeBadgeIcon("CH1", "#0e2744", "#90c4ff", "shield") },
  { id: "plague_london",     name: "Great Plague of London",   color: "#fde047", renderIcon: makeBadgeIcon("LDN", "#4d3a00", "#fff060", "shield") },
  { id: "plague_marseille",  name: "Plague of Marseille",      color: "#86efac", renderIcon: makeBadgeIcon("MRS", "#0c3d18", "#a0ffc0", "shield") },
  { id: "plague_moscow",     name: "Moscow Plague 1771",       color: "#4ade80", renderIcon: makeBadgeIcon("MSC", "#0c3d18", "#80ffa0", "shield") },
  { id: "cholera_7",         name: "Seventh Cholera Pandemic", color: "#2dd4bf", renderIcon: makeBadgeIcon("CH7", "#0a3d33", "#60e8d0", "shield") },
  { id: "ebola_west",        name: "Ebola West Africa",        color: "#facc15", renderIcon: makeBadgeIcon("EBO", "#4d3a00", "#ffe850", "shield") },
  { id: "yellow_fever",      name: "Yellow Fever Epidemics",   color: "#fcd34d", renderIcon: makeBadgeIcon("YLF", "#4d3a00", "#ffe870", "shield") },
  { id: "sars",              name: "SARS 2003",                color: "#c4b5fd", renderIcon: makeBadgeIcon("SAR", "#2d1a5c", "#ddd0ff", "shield") },
  { id: "mers",              name: "MERS",                     color: "#fdba74", renderIcon: makeBadgeIcon("MER", "#5a2800", "#ffd0a0", "shield") },
  { id: "ebola_drc",         name: "Ebola DRC 2018",           color: "#bef264", renderIcon: makeBadgeIcon("EDC", "#2a4008", "#e0ff90", "shield") },
  { id: "typhus_napoleon",   name: "Napoleonic Typhus",        color: "#f9a8d4", renderIcon: makeBadgeIcon("NTY", "#4a0d2e", "#ffc8e0", "shield") },
];

// Deaths in millions (cumulative)
const MILESTONES: Record<string, Record<number, number>> = {
  black_death:       series([1346,0.5],[1348,20],[1349,40],[1350,55],[1351,65],[1353,75],[1400,75],[2025,75]),
  smallpox_americas: series([1520,0.5],[1530,8],[1540,18],[1550,28],[1560,35],[1570,42],[1580,48],[1600,56],[1650,56],[2025,56]),
  spanish_flu:       series([1918,0.5],[1918.5,15],[1919,35],[1920,50],[1921,50],[2025,50]),
  hiv_aids:          series([1981,0.1],[1985,0.5],[1990,3],[1995,8],[2000,15],[2005,22],[2010,28],[2015,34],[2020,38],[2025,42]),
  plague_third:      series([1855,0.2],[1860,0.5],[1870,2],[1880,4],[1890,6],[1900,8],[1910,10],[1920,12],[1940,14],[1960,15],[2025,15]),
  cocoliztli_1545:   series([1545,0.5],[1546,4],[1547,8],[1548,12],[1549,12],[2025,12]),
  covid19:           series([2020,0.1],[2020.5,0.5],[2021,2],[2021.5,4],[2022,6],[2023,7],[2025,7]),
  cocoliztli_1576:   series([1576,0.3],[1577,1],[1578,1.5],[1580,2],[1581,2],[2025,2]),
  typhus_russia:     series([1918,0.3],[1919,1],[1920,2],[1922,3],[1923,3],[2025,3]),
  persian_plague:    series([1772,0.3],[1773,2],[1774,2],[2025,2]),
  cholera_3:         series([1852,0.1],[1854,0.3],[1856,0.6],[1858,0.8],[1860,1],[1861,1],[2025,1]),
  asian_flu:         series([1957,0.2],[1958,1.5],[1959,2],[1960,2],[2025,2]),
  italian_plague:    series([1629,0.2],[1630,0.6],[1631,1],[1632,1],[2025,1]),
  hong_kong_flu:     series([1968,0.2],[1969,0.8],[1970,1],[1971,1],[2025,1]),
  russian_flu_1889:  series([1889,0.1],[1890,0.8],[1891,1],[1892,1],[2025,1]),
  cholera_6:         series([1899,0.1],[1905,0.3],[1910,0.5],[1915,0.6],[1920,0.75],[1923,0.8],[1924,0.8],[2025,0.8]),
  cholera_4:         series([1863,0.1],[1866,0.2],[1870,0.4],[1875,0.6],[1876,0.6],[2025,0.6]),
  encephalitis:      series([1915,0.1],[1918,0.2],[1920,0.4],[1923,0.5],[1926,0.5],[2025,0.5]),
  plague_seville:    series([1647,0.1],[1649,0.3],[1652,0.5],[1653,0.5],[2025,0.5]),
  cholera_5:         series([1881,0.05],[1885,0.1],[1890,0.2],[1896,0.3],[1897,0.3],[2025,0.3]),
  swine_flu:         series([2009,0.05],[2010,0.3],[2011,0.3],[2025,0.3]),
  cholera_2:         series([1829,0.02],[1835,0.08],[1840,0.12],[1845,0.16],[1851,0.2],[1852,0.2],[2025,0.2]),
  cholera_1:         series([1817,0.02],[1819,0.06],[1821,0.1],[1824,0.15],[1825,0.15],[2025,0.15]),
  plague_london:     series([1665,0.02],[1666,0.1],[1667,0.1],[2025,0.1]),
  plague_marseille:  series([1720,0.02],[1721,0.06],[1722,0.1],[1723,0.1],[2025,0.1]),
  plague_moscow:     series([1770,0.02],[1771,0.06],[1772,0.1],[1773,0.1],[2025,0.1]),
  cholera_7:         series([1961,0.02],[1965,0.04],[1970,0.06],[1975,0.1],[1976,0.1],[2025,0.1]),
  ebola_west:        series([2013,0.001],[2014,0.005],[2015,0.01],[2016,0.011],[2025,0.011]),
  yellow_fever:      series([1700,0.05],[1750,0.1],[1800,0.2],[1850,0.3],[1900,0.35],[1950,0.35],[2025,0.35]),
  sars:              series([2002,0.0001],[2003,0.0008],[2004,0.0008],[2025,0.0008]),
  mers:              series([2012,0.0001],[2015,0.0005],[2020,0.0009],[2025,0.0009]),
  ebola_drc:         series([2018,0.0005],[2019,0.002],[2020,0.0023],[2025,0.0023]),
  typhus_napoleon:   series([1812,0.05],[1813,0.25],[1814,0.4],[1815,0.4],[2025,0.4]),
};

function formatValue(n: number): string {
  if (n >= 1) return `${n.toFixed(1)}M`;
  return `${Math.round(n * 1000)}K`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const PANDEMICS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 DEADLIEST PANDEMICS",
  subtitle: "THE INVISIBLE KILLERS 1340–2025",
  unitLabel: "Estimated Deaths",
  valueUnit: "deaths",
  startYear: 1340,
  endYear: 2025,
  topN: 10,
  minValue: 0.01,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 100,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: VIRUS_ICON,
  events: {
    1347: "The Black Death arrives in Europe via Genoese ships from the Crimea — within five years it kills a third of the continent",
    1520: "Spanish conquistadors carry smallpox to the Americas — native populations with no immunity are devastated within decades",
    1918: "The Spanish Flu sweeps the globe as World War I ends — it kills more people in two years than the war killed in four",
    2020: "COVID-19 spreads from Wuhan to every country on Earth — the first pandemic of the social media age kills millions",
  },
  sourceLabel: "Data: WHO, historical epidemiology estimates, and demographic reconstructions",
};
