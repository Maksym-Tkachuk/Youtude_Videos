import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const HELICOPTER_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    {/* main rotor */}
    <line x1="0.5" y1="2" x2="10.5" y2="2" stroke="#7a8b6e" strokeWidth="0.6" strokeLinecap="round" />
    {/* rotor hub */}
    <circle cx="5.5" cy="2" r="0.6" fill="#7a8b6e" />
    {/* rotor mast */}
    <line x1="5.5" y1="2.6" x2="5.5" y2="3.8" stroke="#7a8b6e" strokeWidth="0.5" />
    {/* cockpit */}
    <path d="M4 4 L7 4 L7.5 5.5 L6.5 6.5 L4.5 6.5 L3.5 5.5 Z" fill="#4a5a3e" stroke="#7a8b6e" strokeWidth="0.4" />
    {/* tail boom */}
    <rect x="7" y="4.5" width="3" height="0.8" rx="0.3" fill="#4a5a3e" stroke="#7a8b6e" strokeWidth="0.3" />
    {/* tail rotor */}
    <ellipse cx="10" cy="4.2" rx="0.3" ry="1" fill="#7a8b6e" />
    {/* stub wings / weapon pylons */}
    <line x1="3.5" y1="5.5" x2="2" y2="5.8" stroke="#7a8b6e" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="7.5" y1="5.5" x2="9" y2="5.8" stroke="#7a8b6e" strokeWidth="0.5" strokeLinecap="round" />
    {/* skids */}
    <line x1="3.5" y1="7" x2="7" y2="7" stroke="#7a8b6e" strokeWidth="0.4" strokeLinecap="round" />
    <line x1="4" y1="6.5" x2="4" y2="7" stroke="#7a8b6e" strokeWidth="0.3" />
    <line x1="6.5" y1="6.5" x2="6.5" y2="7" stroke="#7a8b6e" strokeWidth="0.3" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "iraq",         name: "Iraq",           color: "#f87171" },
  { id: "australia",    name: "Australia",      color: "#fbbf24" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#a3e635" },
  { id: "taiwan",       name: "Taiwan",         color: "#67e8f9" },
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "algeria",      name: "Algeria",        color: "#2dd4bf" },
  { id: "south_africa", name: "South Africa",   color: "#84cc16" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "netherlands",  name: "Netherlands",    color: "#fdba74" },
  { id: "greece",       name: "Greece",         color: "#60a5fa" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "indonesia",    name: "Indonesia",      color: "#d946ef" },
  { id: "vietnam",      name: "Vietnam",        color: "#14b8a6" },
]);

// Number of active attack/combat helicopters by country
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: AH-1 Cobra from 1967 in Vietnam, AH-64 Apache from 1986, peaks late 1980s
  usa: series(
    [1960, 0.1], [1965, 0.1], [1967, 100], [1968, 300], [1970, 1000],
    [1972, 1100], [1975, 1050], [1978, 1200], [1980, 1300], [1983, 1400],
    [1985, 1500], [1988, 1800], [1990, 1750], [1993, 1600], [1995, 1500],
    [2000, 1300], [2005, 1200], [2010, 1000], [2015, 900], [2020, 850],
    [2025, 800]
  ),
  // USSR: Mi-24 Hind from 1972, massive buildup through Afghanistan era, peaks ~2500 in 1985
  ussr: series(
    [1960, 0.1], [1970, 0.1], [1972, 50], [1974, 200], [1976, 500],
    [1978, 900], [1980, 1400], [1982, 1900], [1984, 2300], [1985, 2500],
    [1987, 2400], [1989, 2200], [1991, 1800], [1992, 0]
  ),
  // Russia: inherits ~1200 from USSR, declines through 1990s, modernizes with Ka-52/Mi-28
  russia: series(
    [1992, 1200], [1995, 900], [1998, 700], [2000, 600], [2003, 500],
    [2005, 450], [2008, 400], [2010, 380], [2013, 400], [2015, 430],
    [2018, 470], [2020, 490], [2022, 500], [2025, 460]
  ),
  // China: late starter, Z-9/Z-10/Z-19 program ramps up from 2000s
  china: series(
    [1960, 0.1], [1975, 0.1], [1980, 10], [1985, 20], [1990, 50],
    [1995, 80], [2000, 120], [2005, 180], [2008, 250], [2010, 320],
    [2013, 400], [2015, 450], [2018, 520], [2020, 560], [2023, 600],
    [2025, 630]
  ),
  // India: HAL Chetak/Cheetah (utility armed), AH-64E Apache from 2019
  india: series(
    [1960, 0.1], [1980, 0.1], [1985, 30], [1990, 35], [1995, 35],
    [2000, 40], [2005, 40], [2010, 45], [2015, 50], [2018, 55],
    [2020, 75], [2022, 90], [2025, 100]
  ),
  // UK: Westland Lynx armed variants from 1977, AH-64 Apache from 2004
  uk: series(
    [1960, 0.1], [1975, 0.1], [1977, 20], [1980, 60], [1985, 100],
    [1988, 120], [1990, 120], [1995, 110], [2000, 100], [2004, 110],
    [2005, 115], [2010, 100], [2015, 80], [2020, 60], [2025, 50]
  ),
  // France: SA.342 Gazelle from 1973, Eurocopter Tiger from 2005
  france: series(
    [1960, 0.1], [1970, 0.1], [1973, 30], [1975, 60], [1978, 100],
    [1980, 140], [1983, 170], [1985, 200], [1988, 210], [1990, 200],
    [1995, 180], [2000, 160], [2005, 140], [2010, 120], [2015, 100],
    [2020, 90], [2025, 80]
  ),
  // Germany: Bo-105 PAH from 1979, Eurocopter Tiger from 2005, declining fleet
  germany: series(
    [1960, 0.1], [1975, 0.1], [1979, 50], [1982, 100], [1985, 160],
    [1988, 200], [1990, 200], [1993, 180], [1995, 160], [2000, 130],
    [2005, 110], [2010, 80], [2015, 65], [2020, 55], [2025, 50]
  ),
  // Japan: AH-1S Cobra from 1979, AH-64D from 2006
  japan: series(
    [1960, 0.1], [1975, 0.1], [1979, 10], [1982, 30], [1985, 50],
    [1988, 70], [1990, 80], [1995, 85], [2000, 85], [2005, 80],
    [2010, 75], [2015, 65], [2020, 55], [2025, 50]
  ),
  // South Korea: AH-1F/J from early 1990s, Korean KAH program
  south_korea: series(
    [1960, 0.1], [1985, 0.1], [1990, 20], [1993, 40], [1995, 50],
    [2000, 60], [2005, 65], [2010, 70], [2015, 80], [2020, 85],
    [2025, 90]
  ),
  // Turkey: AH-1W/P Cobra from 1990s, T129 ATAK from 2014
  turkey: series(
    [1960, 0.1], [1990, 0.1], [1993, 10], [1995, 20], [1998, 30],
    [2000, 35], [2005, 40], [2010, 50], [2014, 55], [2016, 70],
    [2018, 80], [2020, 90], [2025, 100]
  ),
  // Egypt: SA.342 Gazelle from 1975, AH-64D Apache from 1995
  egypt: series(
    [1960, 0.1], [1973, 0.1], [1975, 20], [1978, 40], [1980, 55],
    [1985, 65], [1990, 70], [1995, 75], [2000, 80], [2005, 80],
    [2010, 80], [2015, 80], [2020, 80], [2025, 80]
  ),
  // Israel: AH-1G/S Cobra from 1969, AH-64A/D Apache from 1990
  israel: series(
    [1960, 0.1], [1969, 10], [1971, 25], [1973, 35], [1975, 45],
    [1978, 55], [1980, 60], [1985, 70], [1988, 75], [1990, 80],
    [1995, 75], [2000, 70], [2005, 65], [2010, 60], [2015, 55],
    [2020, 50], [2025, 50]
  ),
  // Italy: A129 Mangusta from 1990
  italy: series(
    [1960, 0.1], [1985, 0.1], [1990, 15], [1993, 30], [1995, 40],
    [1998, 50], [2000, 55], [2005, 60], [2010, 60], [2015, 55],
    [2020, 50], [2025, 45]
  ),
  // Pakistan: AH-1F Cobra from 1984, T129 orders
  pakistan: series(
    [1960, 0.1], [1980, 0.1], [1984, 15], [1987, 25], [1990, 35],
    [1995, 40], [2000, 45], [2005, 45], [2010, 45], [2015, 50],
    [2020, 50], [2025, 50]
  ),
  // Iran: AH-1J SeaCobra from 1971 (Shah era), heavy losses in Iran-Iraq war
  iran: series(
    [1960, 0.1], [1971, 20], [1973, 60], [1975, 120], [1977, 180],
    [1978, 200], [1980, 180], [1982, 140], [1985, 100], [1988, 60],
    [1990, 50], [1995, 45], [2000, 40], [2005, 35], [2010, 35],
    [2015, 30], [2020, 30], [2025, 30]
  ),
  // Iraq: Mi-24/SA.342 Gazelle fleet, massive buildup before Gulf War, destroyed
  iraq: series(
    [1960, 0.1], [1975, 0.1], [1978, 30], [1980, 80], [1982, 120],
    [1985, 200], [1988, 270], [1990, 300], [1991, 100], [1993, 80],
    [1995, 60], [2000, 50], [2003, 40], [2005, 5], [2010, 10],
    [2015, 20], [2020, 25], [2025, 30]
  ),
  // Australia: Tiger ARH from 2004, replaced by AH-64E
  australia: series(
    [1960, 0.1], [2000, 0.1], [2004, 5], [2006, 10], [2008, 15],
    [2010, 18], [2012, 22], [2015, 22], [2020, 22], [2025, 22]
  ),
  // Brazil: AH-2 Sabre (Mi-35), small fleet
  brazil: series(
    [1960, 0.1], [2005, 0.1], [2009, 5], [2012, 10], [2015, 12],
    [2020, 12], [2025, 12]
  ),
  // Poland: Mi-24 from Warsaw Pact era, declining fleet
  poland: series(
    [1960, 0.1], [1978, 0.1], [1980, 15], [1983, 30], [1985, 45],
    [1988, 55], [1990, 60], [1993, 55], [1995, 50], [2000, 40],
    [2005, 35], [2010, 30], [2015, 30], [2020, 30], [2025, 30]
  ),
  // Saudi Arabia: AH-64A/D Apache from 1993
  saudi_arabia: series(
    [1960, 0.1], [1990, 0.1], [1993, 10], [1995, 15], [1998, 20],
    [2000, 22], [2005, 25], [2010, 30], [2015, 35], [2020, 38],
    [2025, 40]
  ),
  // Taiwan: AH-1W SuperCobra from 1993, AH-64E from 2014
  taiwan: series(
    [1960, 0.1], [1990, 0.1], [1993, 20], [1996, 35], [2000, 45],
    [2005, 50], [2010, 55], [2014, 55], [2016, 60], [2020, 60],
    [2025, 60]
  ),
  // North Korea: old Soviet Mi-24/Hughes 500MD types
  north_korea: series(
    [1960, 0.1], [1980, 0.1], [1985, 20], [1988, 30], [1990, 40],
    [1995, 45], [2000, 50], [2005, 50], [2010, 50], [2015, 50],
    [2020, 50], [2025, 50]
  ),
  // Algeria: Mi-24/Mi-28 from Soviet/Russian supply
  algeria: series(
    [1960, 0.1], [1980, 0.1], [1983, 10], [1985, 20], [1988, 30],
    [1990, 35], [1995, 35], [2000, 35], [2005, 35], [2010, 38],
    [2015, 40], [2020, 40], [2025, 40]
  ),
  // South Africa: Rooivalk from 1999, small fleet
  south_africa: series(
    [1960, 0.1], [1995, 0.1], [1999, 5], [2002, 8], [2005, 11],
    [2010, 12], [2015, 12], [2020, 11], [2025, 11]
  ),
  // Spain: Bo-105/Tiger, small fleet
  spain: series(
    [1960, 0.1], [1985, 0.1], [1988, 10], [1990, 15], [1995, 20],
    [2000, 25], [2005, 25], [2010, 24], [2015, 24], [2020, 18],
    [2025, 18]
  ),
  // Netherlands: AH-64D Apache from 1998
  netherlands: series(
    [1960, 0.1], [1995, 0.1], [1998, 10], [2000, 20], [2003, 28],
    [2005, 28], [2010, 28], [2015, 28], [2020, 28], [2025, 28]
  ),
  // Greece: AH-64A/D from 1995
  greece: series(
    [1960, 0.1], [1993, 0.1], [1995, 8], [1998, 15], [2000, 20],
    [2005, 28], [2010, 29], [2015, 29], [2020, 29], [2025, 29]
  ),
  // Ukraine: inherits ~200 Mi-24 from USSR in 1992, attrition over decades
  ukraine: series(
    [1992, 200], [1995, 160], [2000, 120], [2005, 100], [2010, 80],
    [2015, 60], [2020, 50], [2022, 45], [2024, 40], [2025, 40]
  ),
  // Indonesia: Mi-35 from 2003
  indonesia: series(
    [1960, 0.1], [2000, 0.1], [2003, 5], [2006, 8], [2010, 10],
    [2015, 12], [2020, 12], [2025, 12]
  ),
  // Vietnam: Mi-24 from Soviet era
  vietnam: series(
    [1960, 0.1], [1980, 0.1], [1983, 10], [1985, 20], [1988, 30],
    [1990, 30], [1995, 25], [2000, 20], [2005, 20], [2010, 18],
    [2015, 15], [2020, 15], [2025, 15]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const ATTACK_HELICOPTERS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 ATTACK HELICOPTER FLEETS",
  subtitle: "WHO DOMINATES THE SKIES?",
  unitLabel: "Active Attack Helicopters",
  valueUnit: "helicopters",
  startYear: 1960,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  scaleMode: "linear",
  framesPerYear: 12,
  timelineInterval: 5,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: HELICOPTER_ICON,
  events: {
    1967: "The AH-1 Cobra enters combat in Vietnam \u2014 the world's first dedicated attack helicopter proves devastating",
    1984: "Soviet Mi-24 Hinds terrorize Afghan mujahideen \u2014 the USSR deploys history's largest helicopter gunship fleet",
    2003: "AH-64 Apaches lead the charge into Iraq \u2014 helicopter warfare enters a new era of precision strike",
    2022: "Russia loses dozens of helicopters in Ukraine \u2014 anti-air missiles prove devastating against low-flying gunships",
  },
  sourceLabel: "Data: IISS Military Balance, Flight International, national defense reports",
};
