import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const BASE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    {/* Pentagon fortress shape */}
    <path d="M5.5 1 L9.5 3.5 L8.5 7.5 L2.5 7.5 L1.5 3.5 Z" fill="#6b7d5e" stroke="#8a9b7e" strokeWidth="0.6" strokeLinejoin="round" />
    {/* Inner wall */}
    <path d="M5.5 2.5 L7.8 4 L7.2 6.5 L3.8 6.5 L3.2 4 Z" fill="none" stroke="#8a9b7e" strokeWidth="0.5" />
    {/* Tower */}
    <rect x="4.8" y="3.5" width="1.4" height="2.5" fill="#8a9b7e" opacity="0.7" />
    {/* Flag on top */}
    <line x1="5.5" y1="1" x2="5.5" y2="0.3" stroke="#8a9b7e" strokeWidth="0.4" />
    <rect x="5.5" y="0.3" width="1.5" height="0.8" fill="#8a9b7e" opacity="0.6" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "uae",          name: "UAE",            color: "#d946ef" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#a3e635" },
  { id: "australia",    name: "Australia",      color: "#fbbf24" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "canada",       name: "Canada",         color: "#f43f5e" },
  { id: "netherlands",  name: "Netherlands",    color: "#fdba74" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "greece",       name: "Greece",         color: "#60a5fa" },
  { id: "cuba",         name: "Cuba",           color: "#cc3333" },
  { id: "qatar",        name: "Qatar",          color: "#8b5cf6" },
  { id: "singapore",    name: "Singapore",      color: "#2dd4bf" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "north_korea",  name: "North Korea",    color: "#f87171" },
  { id: "south_africa", name: "South Africa",   color: "#22c55e" },
  { id: "nigeria",      name: "Nigeria",        color: "#14b8a6" },
]);

// Number of foreign military bases/installations abroad by country
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: ~2,000+ bases post-WW2, massive Cold War expansion, gradual consolidation
  usa: series(
    [1945, 2000], [1947, 2200], [1950, 2500], [1953, 2800], [1955, 3000],
    [1957, 2900], [1960, 2700], [1962, 2600], [1965, 2400], [1967, 2200],
    [1970, 1800], [1973, 1600], [1975, 1400], [1978, 1200], [1980, 1100],
    [1985, 1000], [1988, 950], [1990, 900], [1992, 850], [1995, 800],
    [2000, 780], [2003, 820], [2005, 800], [2008, 780], [2010, 770],
    [2015, 760], [2020, 750], [2025, 750]
  ),
  // USSR: Eastern Bloc + Cuba + Vietnam + Africa, massive network peaks ~400 mid-1980s
  ussr: series(
    [1945, 50], [1947, 80], [1950, 120], [1953, 160], [1955, 200],
    [1958, 230], [1960, 260], [1962, 290], [1965, 310], [1968, 330],
    [1970, 340], [1973, 350], [1975, 360], [1978, 370], [1980, 380],
    [1983, 390], [1985, 400], [1988, 380], [1990, 320], [1991, 200],
    [1992, 0]
  ),
  // Russia: inherits CIS/Syria/Vietnam remnants, declines then slowly rebuilds
  russia: series(
    [1992, 30], [1993, 28], [1995, 25], [1997, 22], [2000, 18],
    [2003, 16], [2005, 15], [2008, 14], [2010, 14], [2012, 15],
    [2015, 18], [2017, 20], [2019, 22], [2021, 24], [2025, 25]
  ),
  // UK: empire remnant ~200 in 1945, rapid decolonization, minimal by 2025
  uk: series(
    [1945, 200], [1947, 180], [1950, 150], [1953, 130], [1955, 110],
    [1958, 90], [1960, 80], [1962, 70], [1965, 60], [1967, 50],
    [1970, 45], [1973, 40], [1975, 35], [1978, 30], [1980, 28],
    [1985, 25], [1990, 22], [1995, 20], [2000, 18], [2005, 17],
    [2010, 16], [2015, 16], [2020, 16], [2025, 16]
  ),
  // France: colonial bases dissolve, retains African network
  france: series(
    [1945, 100], [1947, 95], [1950, 90], [1953, 80], [1955, 70],
    [1958, 60], [1960, 50], [1962, 40], [1965, 35], [1967, 30],
    [1970, 28], [1975, 25], [1978, 22], [1980, 20], [1985, 18],
    [1990, 16], [1995, 14], [2000, 13], [2005, 12], [2010, 11],
    [2015, 11], [2020, 11], [2025, 10]
  ),
  // China: zero until Djibouti 2017, slowly expanding
  china: series(
    [1945, 0.1], [1950, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1],
    [1990, 0.1], [2000, 0.1], [2010, 0.1], [2016, 0.1], [2017, 1],
    [2019, 2], [2022, 3], [2025, 5]
  ),
  // Turkey: NATO bases from 1960s, major expansion 2010s-2020s (Syria, Libya, Qatar, Somalia, N. Cyprus)
  turkey: series(
    [1945, 0.1], [1955, 0.1], [1960, 2], [1965, 3], [1970, 4],
    [1974, 8], [1975, 10], [1980, 10], [1985, 11], [1990, 12],
    [1995, 13], [2000, 14], [2005, 15], [2010, 16], [2013, 18],
    [2015, 20], [2017, 25], [2019, 30], [2020, 33], [2022, 37],
    [2025, 40]
  ),
  // India: very limited foreign basing, Tajikistan facility + Agalega/Mauritius
  india: series(
    [1945, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1], [1990, 0.1],
    [2000, 0.1], [2005, 1], [2010, 1], [2015, 1], [2020, 2], [2025, 2]
  ),
  // Japan: constitutionally limited, only Djibouti from 2011
  japan: series(
    [1945, 0.1], [1950, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1],
    [1990, 0.1], [2000, 0.1], [2010, 0.1], [2011, 1], [2015, 1],
    [2020, 1], [2025, 1]
  ),
  // Germany: zero foreign bases post-WW2, small training facilities abroad from 2000s
  germany: series(
    [1945, 0.1], [1950, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1],
    [1990, 0.1], [2000, 0.1], [2005, 1], [2010, 1], [2015, 2],
    [2020, 2], [2025, 2]
  ),
  // Italy: Djibouti, Lebanon, small presence
  italy: series(
    [1945, 0.1], [1950, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1],
    [1990, 0.1], [1995, 1], [2000, 2], [2005, 3], [2010, 3],
    [2015, 4], [2020, 4], [2025, 4]
  ),
  // UAE: Eritrea, Yemen (Socotra), Libya — new player from 2015
  uae: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2015, 2], [2017, 3], [2019, 4], [2022, 5], [2025, 5]
  ),
  // Saudi Arabia: minimal, some presence in Djibouti area
  saudi_arabia: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2015, 1], [2020, 2], [2025, 2]
  ),
  // Australia: small expeditionary presence (East Timor, Afghanistan era)
  australia: series(
    [1945, 0.1], [1950, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1],
    [1990, 0.1], [2000, 1], [2002, 2], [2005, 2], [2010, 2],
    [2015, 1], [2020, 1], [2025, 1]
  ),
  // South Korea: UAE base from 2011
  south_korea: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2011, 1], [2015, 1], [2020, 1], [2025, 1]
  ),
  // Pakistan: limited, some training presence
  pakistan: series(
    [1945, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1], [1990, 0.1],
    [2000, 0.1], [2010, 0.1], [2015, 0.1], [2020, 0.1], [2025, 0.1]
  ),
  // Iran: Syria/Iraq advisory presence, debatable "bases"
  iran: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2005, 0.1],
    [2010, 1], [2012, 2], [2015, 4], [2017, 6], [2019, 7],
    [2020, 8], [2025, 8]
  ),
  // Israel: minimal foreign basing
  israel: series(
    [1945, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1], [1990, 0.1],
    [2000, 0.1], [2010, 0.1], [2015, 0.1], [2020, 0.1], [2025, 0.1]
  ),
  // Egypt: limited external deployments
  egypt: series(
    [1945, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1], [1990, 0.1],
    [2000, 0.1], [2010, 0.1], [2017, 1], [2020, 1], [2025, 1]
  ),
  // Brazil: minimal foreign military presence
  brazil: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // Canada: some training facilities abroad, minimal
  canada: series(
    [1945, 5], [1950, 8], [1955, 10], [1960, 10], [1965, 8],
    [1970, 6], [1975, 5], [1980, 4], [1985, 3], [1990, 3],
    [1995, 2], [2000, 2], [2005, 2], [2010, 1], [2015, 1],
    [2020, 1], [2025, 1]
  ),
  // Netherlands: small basing footprint (Curacao, Aruba + training)
  netherlands: series(
    [1945, 10], [1950, 8], [1955, 6], [1960, 5], [1965, 4],
    [1970, 3], [1975, 3], [1980, 3], [1985, 3], [1990, 2],
    [1995, 2], [2000, 2], [2005, 2], [2010, 2], [2015, 2],
    [2020, 2], [2025, 2]
  ),
  // Spain: historical African presidios, now minimal
  spain: series(
    [1945, 8], [1950, 7], [1955, 6], [1960, 5], [1965, 4],
    [1970, 3], [1975, 3], [1980, 2], [1985, 2], [1990, 2],
    [1995, 2], [2000, 2], [2005, 2], [2010, 2], [2015, 1],
    [2020, 1], [2025, 1]
  ),
  // Greece: no significant foreign bases
  greece: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // Cuba: hosted Soviet base (Lourdes signals intelligence), not Cuban bases abroad
  cuba: series(
    [1945, 0.1], [1960, 0.1], [1970, 0.1], [1980, 0.1], [1990, 0.1],
    [2000, 0.1], [2010, 0.1], [2020, 0.1], [2025, 0.1]
  ),
  // Qatar: no significant foreign bases
  qatar: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // Singapore: training facilities in Australia, Taiwan, Brunei, France
  singapore: series(
    [1945, 0.1], [1970, 0.1], [1980, 0.1], [1990, 2], [1995, 3],
    [2000, 4], [2005, 5], [2010, 5], [2015, 5], [2020, 5], [2025, 5]
  ),
  // Poland: no significant foreign bases
  poland: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // North Korea: no foreign bases
  north_korea: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // South Africa: limited regional presence
  south_africa: series(
    [1945, 0.1], [1960, 0.1], [1970, 1], [1975, 2], [1980, 3],
    [1985, 3], [1990, 2], [1995, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
  // Nigeria: no significant foreign bases
  nigeria: series(
    [1945, 0.1], [1970, 0.1], [1990, 0.1], [2000, 0.1], [2010, 0.1],
    [2020, 0.1], [2025, 0.1]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const MILITARY_BASES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 FOREIGN MILITARY BASES",
  subtitle: "WHO PROJECTS POWER WORLDWIDE?",
  unitLabel: "Foreign Military Bases & Installations",
  valueUnit: "bases",
  startYear: 1945,
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
  unitIcon: BASE_ICON,
  events: {
    1949: "NATO is founded — the United States begins building a permanent network of military bases across Western Europe",
    1975: "The fall of Saigon ends the Vietnam War — the US closes hundreds of bases across Southeast Asia",
    1991: "The Soviet Union collapses — Russia loses access to nearly all of its overseas military installations overnight",
    2017: "China opens its first overseas military base in Djibouti — signaling a new era of global power projection",
  },
  sourceLabel: "Data: DOD Base Structure Report, SIPRI, Vine (2015), Al Jazeera, national defense reports",
};
