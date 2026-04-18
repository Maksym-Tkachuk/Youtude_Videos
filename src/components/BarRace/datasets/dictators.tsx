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
  { id: "mao",          name: "Mao Zedong",                color: "#ef4444", renderIcon: makeBadgeIcon("MAO", "#5c0000", "#ff9090", "crosshair") },
  { id: "stalin",       name: "Joseph Stalin",             color: "#dc2626", renderIcon: makeBadgeIcon("STL", "#4a0006", "#ff6672", "crosshair") },
  { id: "hitler",       name: "Adolf Hitler",              color: "#eab308", renderIcon: makeBadgeIcon("HTL", "#4d3200", "#ffe080", "crosshair") },
  { id: "leopold",      name: "Leopold II",                color: "#b45309", renderIcon: makeBadgeIcon("LEO", "#3d1a0a", "#d4836a", "crosshair") },
  { id: "tojo",         name: "Hideki Tojo",               color: "#fb7185", renderIcon: makeBadgeIcon("TOJ", "#520d18", "#ff7a8a", "crosshair") },
  { id: "enver",        name: "Ismail Enver Pasha",        color: "#f97316", renderIcon: makeBadgeIcon("ENV", "#5a2000", "#ffb060", "crosshair") },
  { id: "pol_pot",      name: "Pol Pot",                   color: "#9b5de5", renderIcon: makeBadgeIcon("POL", "#2d1259", "#d09bff", "crosshair") },
  { id: "kim_il_sung",  name: "Kim Il-sung",               color: "#a855f7", renderIcon: makeBadgeIcon("KIS", "#3a1460", "#e0b0ff", "crosshair") },
  { id: "mengistu",     name: "Mengistu Haile Mariam",     color: "#22c55e", renderIcon: makeBadgeIcon("MNG", "#0c3d1e", "#5fd87a", "crosshair") },
  { id: "suharto",      name: "Suharto",                   color: "#06b6d4", renderIcon: makeBadgeIcon("SUH", "#063a40", "#b0f5ff", "crosshair") },
  { id: "saddam",       name: "Saddam Hussein",            color: "#fbbf24", renderIcon: makeBadgeIcon("SAD", "#4d3200", "#ffd060", "crosshair") },
  { id: "mussolini",    name: "Benito Mussolini",          color: "#34d399", renderIcon: makeBadgeIcon("MUS", "#0c3d1e", "#5fd87a", "crosshair") },
  { id: "franco",       name: "Francisco Franco",          color: "#818cf8", renderIcon: makeBadgeIcon("FRN", "#1a1d5c", "#b5baff", "crosshair") },
  { id: "yahya_khan",   name: "Yahya Khan",                color: "#10b981", renderIcon: makeBadgeIcon("YAH", "#063d28", "#40dfa0", "crosshair") },
  { id: "amin",         name: "Idi Amin",                  color: "#f59e0b", renderIcon: makeBadgeIcon("AMN", "#4d2e00", "#ffd060", "crosshair") },
  { id: "kim_jong_il",  name: "Kim Jong-il",               color: "#c084fc", renderIcon: makeBadgeIcon("KJI", "#3a1460", "#e4b5ff", "crosshair") },
  { id: "assad",        name: "Bashar al-Assad",           color: "#e09f3e", renderIcon: makeBadgeIcon("ASD", "#4d2e00", "#ffd07a", "crosshair") },
  { id: "kambanda",     name: "Jean Kambanda",             color: "#4ade80", renderIcon: makeBadgeIcon("KBD", "#0c3d18", "#80ffa0", "crosshair") },
  { id: "bashir",       name: "Omar al-Bashir",            color: "#60a5fa", renderIcon: makeBadgeIcon("BSH", "#0e2744", "#7ec1ff", "crosshair") },
  { id: "gowon",        name: "Yakubu Gowon",              color: "#38bdf8", renderIcon: makeBadgeIcon("GOW", "#063652", "#91e0ff", "crosshair") },
  { id: "nguema",       name: "Francisco Macías Nguema",   color: "#dd2d4a", renderIcon: makeBadgeIcon("NGM", "#520d18", "#ff7a8a", "crosshair") },
  { id: "pavelic",      name: "Ante Pavelić",              color: "#86efac", renderIcon: makeBadgeIcon("PAV", "#0c3d1e", "#5fd87a", "crosshair") },
  { id: "mobutu",       name: "Mobutu Sese Seko",          color: "#d4a373", renderIcon: makeBadgeIcon("MOB", "#4a2e10", "#f3c38c", "crosshair") },
  { id: "pinochet",     name: "Augusto Pinochet",          color: "#67e8f9", renderIcon: makeBadgeIcon("PIN", "#063a40", "#b0f5ff", "crosshair") },
  { id: "milosevic",    name: "Slobodan Milošević",        color: "#fde047", renderIcon: makeBadgeIcon("MIL", "#4d3a00", "#fff060", "crosshair") },
  { id: "gaddafi",      name: "Muammar Gaddafi",           color: "#c05070", renderIcon: makeBadgeIcon("GAD", "#4a0d1e", "#ff88a8", "crosshair") },
  { id: "habre",        name: "Hissène Habré",             color: "#43c59e", renderIcon: makeBadgeIcon("HAB", "#0e3d33", "#7af0c5", "crosshair") },
  { id: "rios_montt",   name: "Efraín Ríos Montt",        color: "#a3e635", renderIcon: makeBadgeIcon("RMT", "#2a4008", "#d0ff60", "crosshair") },
  { id: "ho_chi_minh",  name: "Ho Chi Minh",               color: "#dd2d4a", renderIcon: makeBadgeIcon("HCM", "#520d18", "#ff7a8a", "crosshair") },
  { id: "mugabe",       name: "Robert Mugabe",             color: "#8fad55", renderIcon: makeBadgeIcon("MUG", "#2a3a10", "#c0dd80", "crosshair") },
  { id: "ne_win",       name: "Ne Win",                    color: "#4895ef", renderIcon: makeBadgeIcon("NEW", "#0e2744", "#7ec1ff", "crosshair") },
  { id: "marcos",       name: "Ferdinand Marcos",          color: "#f9a8d4", renderIcon: makeBadgeIcon("MRC", "#4a0d2e", "#ffb8e0", "crosshair") },
];

// Deaths in millions — cumulative during regime, frozen after
const MILESTONES: Record<string, Record<number, number>> = {
  // Leopold II — Congo Free State 1885-1908, ~5M deaths
  leopold:      series([1885,0.2],[1890,1],[1895,2],[1900,3.5],[1905,4.5],[1908,5],[1909,5],[2025,5]),

  // Ismail Enver Pasha — Ottoman Empire, Armenian + Assyrian + Greek genocides
  enver:        series([1913,0.1],[1915,0.8],[1916,1.5],[1917,2],[1918,2.5],[1919,2.5],[2025,2.5]),

  // Joseph Stalin — Gulags, purges, Holodomor, forced collectivization ~20M
  stalin:       series([1924,0.1],[1928,0.3],[1930,1],[1932,3],[1933,6],[1935,7],[1937,9],[1938,11],[1940,13],[1943,15],[1945,17],[1950,19],[1953,20],[1954,20],[2025,20]),

  // Benito Mussolini — Ethiopia campaign, colonial atrocities, WWII
  mussolini:    series([1922,0.05],[1925,0.08],[1930,0.15],[1935,0.25],[1936,0.3],[1940,0.35],[1943,0.4],[1945,0.5],[1946,0.5],[2025,0.5]),

  // Adolf Hitler — Holocaust 6M, other genocides, regime killings ~17M total
  hitler:       series([1933,0.1],[1935,0.3],[1938,0.5],[1939,1],[1940,3],[1941,6],[1942,10],[1943,14],[1944,16],[1945,17],[1946,17],[2025,17]),

  // Hideki Tojo — Japanese war crimes, Nanjing, forced labor, POW deaths
  tojo:         series([1941,0.5],[1942,2],[1943,3.5],[1944,5],[1945,6],[1946,6],[2025,6]),

  // Francisco Franco — Spanish Civil War + post-war repression
  franco:       series([1936,0.03],[1937,0.06],[1938,0.1],[1939,0.15],[1945,0.18],[1950,0.2],[1975,0.2],[1976,0.2],[2025,0.2]),

  // Ante Pavelic — Ustasha regime, Jasenovac
  pavelic:      series([1941,0.05],[1942,0.2],[1943,0.35],[1944,0.45],[1945,0.5],[1946,0.5],[2025,0.5]),

  // Mao Zedong — Great Leap Forward (15-55M), Cultural Revolution, land reform ~78M high estimate
  mao:          series([1949,0.5],[1951,2],[1953,4],[1955,5],[1957,6],[1958,8],[1959,15],[1960,30],[1961,45],[1962,50],[1964,55],[1966,58],[1968,62],[1970,65],[1972,68],[1975,72],[1976,78],[1977,78],[2025,78]),

  // Kim Il-sung — Korean War atrocities, political purges
  kim_il_sung:  series([1948,0.05],[1950,0.3],[1951,0.8],[1953,1.2],[1960,1.4],[1970,1.5],[1980,1.6],[1990,1.6],[1994,1.6],[2025,1.6]),

  // Suharto — Anti-communist purge 1965-66, East Timor
  suharto:      series([1965,0.1],[1966,0.5],[1967,0.8],[1968,0.9],[1970,0.95],[1975,1],[1980,1.1],[1990,1.2],[1998,1.2],[2025,1.2]),

  // Ho Chi Minh — Land reform executions, political repression
  ho_chi_minh:  series([1945,0.05],[1950,0.1],[1955,0.2],[1960,0.3],[1965,0.5],[1969,0.8],[1970,0.8],[2025,0.8]),

  // Mengistu Haile Mariam — Red Terror, forced relocations, man-made famine
  mengistu:     series([1974,0.05],[1977,0.3],[1978,0.6],[1980,0.8],[1983,1],[1985,1.2],[1988,1.4],[1991,1.5],[1992,1.5],[2025,1.5]),

  // Pol Pot — Cambodian genocide
  pol_pot:      series([1975,0.1],[1976,0.5],[1977,1],[1978,1.5],[1979,2],[1980,2],[2025,2]),

  // Yahya Khan — Bangladesh Liberation War atrocities ~1.5M
  yahya_khan:   series([1971,0.3],[1972,1.5],[1973,1.5],[2025,1.5]),

  // Idi Amin — Uganda massacres
  amin:         series([1971,0.05],[1973,0.1],[1975,0.2],[1977,0.3],[1979,0.4],[1980,0.4],[2025,0.4]),

  // Saddam Hussein — Anfal genocide, Iran-Iraq war internal, Marsh Arab persecution
  saddam:       series([1979,0.05],[1983,0.1],[1986,0.15],[1988,0.25],[1990,0.3],[1991,0.35],[1995,0.4],[2000,0.45],[2003,0.5],[2004,0.5],[2025,0.5]),

  // Kim Jong-il — North Korean famine (Arduous March) primarily
  kim_jong_il:  series([1994,0.05],[1996,0.5],[1997,1.5],[1998,2.5],[1999,3],[2000,3.2],[2005,3.4],[2011,3.5],[2012,3.5],[2025,3.5]),

  // Yakubu Gowon — Biafran War + famine
  gowon:        series([1967,0.1],[1968,0.4],[1969,0.7],[1970,1],[1971,1],[2025,1]),

  // Francisco Macias Nguema — Equatorial Guinea terror
  nguema:       series([1968,0.02],[1970,0.05],[1973,0.1],[1975,0.15],[1979,0.2],[1980,0.2],[2025,0.2]),

  // Jean Kambanda — Rwandan genocide (PM during genocide period)
  kambanda:     series([1994,0.1],[1994.5,0.5],[1995,0.8],[2025,0.8]),

  // Bashar al-Assad — Syrian Civil War deaths attributed to regime
  assad:        series([2011,0.02],[2013,0.1],[2015,0.25],[2017,0.35],[2019,0.4],[2021,0.45],[2023,0.5],[2025,0.5]),

  // Omar al-Bashir — Darfur genocide
  bashir:       series([2003,0.05],[2005,0.15],[2008,0.25],[2010,0.3],[2019,0.3],[2025,0.3]),

  // Mobutu Sese Seko — Zaire repression
  mobutu:       series([1965,0.03],[1970,0.06],[1975,0.08],[1980,0.1],[1985,0.14],[1990,0.18],[1997,0.23],[1998,0.23],[2025,0.23]),

  // Augusto Pinochet — ~3K direct kill count
  pinochet:     series([1973,0.001],[1975,0.002],[1980,0.003],[1990,0.003],[2025,0.003]),

  // Slobodan Milosevic — Bosnian War + Kosovo
  milosevic:    series([1991,0.01],[1993,0.05],[1995,0.08],[1999,0.1],[2000,0.1],[2025,0.1]),

  // Muammar Gaddafi
  gaddafi:      series([1969,0.005],[1975,0.01],[1980,0.015],[1990,0.02],[2000,0.025],[2011,0.03],[2025,0.03]),

  // Hissene Habre — Chad repression
  habre:        series([1982,0.005],[1985,0.02],[1988,0.03],[1990,0.04],[1991,0.04],[2025,0.04]),

  // Efrain Rios Montt — Guatemalan genocide of Ixil Maya
  rios_montt:   series([1982,0.05],[1983,0.15],[1984,0.2],[2025,0.2]),

  // Robert Mugabe
  mugabe:       series([1980,0.005],[1983,0.01],[1987,0.02],[2000,0.02],[2017,0.02],[2025,0.02]),

  // Ne Win — Burma/Myanmar repression
  ne_win:       series([1962,0.01],[1970,0.03],[1975,0.05],[1980,0.08],[1988,0.1],[1989,0.1],[2025,0.1]),

  // Ferdinand Marcos — Martial law Philippines
  marcos:       series([1972,0.01],[1975,0.02],[1980,0.04],[1985,0.06],[1986,0.07],[2025,0.07]),
};

function formatValue(n: number): string {
  if (n >= 1) return `${n.toFixed(1)}M`;
  return `${Math.round(n * 1000)}K`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const DICTATORS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 DEADLIEST REGIMES",
  subtitle: "POWER THAT KILLS 1885–2025",
  unitLabel: "Estimated Deaths",
  valueUnit: "deaths",
  startYear: 1885,
  endYear: 2025,
  topN: 10,
  minValue: 0.01,
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
  unitIcon: SKULL_ICON,
  events: {
    1932: "Stalin's forced collectivization triggers the Holodomor — millions of Ukrainians starve as grain is seized at gunpoint",
    1958: "Mao launches the Great Leap Forward — the resulting famine kills an estimated 15–55 million people in three years",
    1975: "The Khmer Rouge seizes Phnom Penh — Pol Pot empties the cities and begins a genocide that kills a quarter of Cambodia",
    1994: "Rwanda's Hutu government launches a genocide — 800,000 Tutsis are murdered in just 100 days",
  },
  sourceLabel: "Data: Historical estimates from multiple academic sources — figures are debated and approximate",
};
