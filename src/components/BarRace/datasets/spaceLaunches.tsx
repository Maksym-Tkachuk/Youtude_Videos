import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const ROCKET_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M5.5 1 L7 4.5 L7 7.5 L5.5 9 L4 7.5 L4 4.5 Z" fill="rgba(255,180,50,0.2)" stroke="#ffaa00" strokeWidth="0.7" />
    <path d="M4 7.5 L3 9.5 L4.2 8.5" fill="none" stroke="#ff6600" strokeWidth="0.6" strokeLinecap="round" />
    <path d="M7 7.5 L8 9.5 L6.8 8.5" fill="none" stroke="#ff6600" strokeWidth="0.6" strokeLinecap="round" />
    <circle cx="5.5" cy="5" r="0.8" fill="#ffcc00" opacity="0.7" />
    <path d="M5.5 9 L5 10.5 L5.5 10 L6 10.5 Z" fill="#ff6600" opacity="0.6" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "ussr",         name: "USSR",           color: "#991b1b" },
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "russia",       name: "Russia",         color: "#ef4444" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "canada",       name: "Canada",         color: "#f43f5e" },
  { id: "new_zealand",  name: "New Zealand",    color: "#84cc16" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "indonesia",    name: "Indonesia",      color: "#14b8a6" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "uae",          name: "UAE",            color: "#d946ef" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "argentina",    name: "Argentina",       color: "#67e8f9" },
  { id: "south_africa", name: "South Africa",   color: "#a3e635" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "taiwan",       name: "Taiwan",         color: "#60a5fa" },
  { id: "mexico",       name: "Mexico",         color: "#86efac" },
  { id: "sweden",       name: "Sweden",         color: "#fdba74" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
]);

// Annual orbital launch attempts by country
// Sources: Space Launch Report, Jonathan McDowell's launch logs, ESA annual reports
const MILESTONES: Record<string, Record<number, number>> = {
  // USSR: dominated 1957–1991, peaked at ~100/year in the late 1970s–early 1980s
  ussr: series(
    [1957, 2], [1958, 1], [1959, 3], [1960, 8], [1961, 9], [1962, 20],
    [1963, 17], [1964, 30], [1965, 36], [1966, 44], [1967, 66], [1968, 74],
    [1969, 70], [1970, 81], [1971, 83], [1972, 74], [1973, 82], [1974, 81],
    [1975, 89], [1976, 99], [1977, 98], [1978, 88], [1979, 87], [1980, 89],
    [1981, 98], [1982, 101], [1983, 98], [1984, 97], [1985, 98], [1986, 91],
    [1987, 95], [1988, 90], [1989, 74], [1990, 75], [1991, 59], [1992, 0],
  ),

  // USA: Apollo era peak, shuttle era steady, SpaceX-driven surge 2020s
  usa: series(
    [1958, 7], [1959, 11], [1960, 16], [1961, 29], [1962, 32], [1963, 26],
    [1964, 33], [1965, 38], [1966, 43], [1967, 33], [1968, 27], [1969, 22],
    [1970, 17], [1971, 18], [1972, 15], [1973, 13], [1974, 13], [1975, 14],
    [1976, 16], [1977, 14], [1978, 18], [1979, 11], [1980, 13], [1981, 11],
    [1982, 11], [1983, 14], [1984, 15], [1985, 12], [1986, 6], [1987, 8],
    [1988, 10], [1989, 13], [1990, 18], [1991, 12], [1992, 14], [1993, 16],
    [1994, 18], [1995, 15], [1996, 18], [1997, 21], [1998, 20], [1999, 18],
    [2000, 16], [2001, 14], [2002, 12], [2003, 14], [2004, 10], [2005, 8],
    [2006, 14], [2007, 13], [2008, 12], [2009, 15], [2010, 11], [2011, 13],
    [2012, 10], [2013, 14], [2014, 14], [2015, 15], [2016, 16], [2017, 22],
    [2018, 31], [2019, 21], [2020, 40], [2021, 51], [2022, 78], [2023, 108],
    [2024, 125], [2025, 130],
  ),

  // Russia: inherited Soviet infrastructure, gradual decline, slight recovery
  russia: series(
    [1992, 30], [1993, 26], [1994, 28], [1995, 25], [1996, 22], [1997, 24],
    [1998, 20], [1999, 21], [2000, 25], [2001, 21], [2002, 20], [2003, 19],
    [2004, 22], [2005, 23], [2006, 20], [2007, 22], [2008, 20], [2009, 24],
    [2010, 21], [2011, 28], [2012, 21], [2013, 25], [2014, 23], [2015, 18],
    [2016, 15], [2017, 17], [2018, 16], [2019, 18], [2020, 15], [2021, 16],
    [2022, 15], [2023, 12], [2024, 12], [2025, 11],
  ),

  // China: slow start, rapid acceleration in the 2010s, surging 2020s
  china: series(
    [1970, 1], [1971, 1], [1975, 3], [1980, 2], [1985, 1], [1990, 5],
    [1995, 3], [1997, 6], [1999, 4], [2000, 5], [2002, 4], [2003, 7],
    [2005, 5], [2006, 6], [2007, 10], [2008, 11], [2009, 6], [2010, 15],
    [2011, 19], [2012, 19], [2013, 15], [2014, 16], [2015, 19], [2016, 22],
    [2017, 18], [2018, 39], [2019, 34], [2020, 39], [2021, 55], [2022, 64],
    [2023, 67], [2024, 68], [2025, 70],
  ),

  // France (including Ariane/ESA launches from Kourou attributed to France)
  france: series(
    [1965, 1], [1966, 1], [1967, 2], [1968, 2], [1970, 2], [1971, 2],
    [1973, 1], [1975, 2], [1977, 1], [1979, 3], [1980, 3], [1981, 3],
    [1982, 2], [1983, 3], [1984, 4], [1985, 4], [1986, 3], [1987, 3],
    [1988, 5], [1989, 5], [1990, 5], [1991, 6], [1992, 6], [1993, 7],
    [1994, 6], [1995, 8], [1996, 8], [1997, 10], [1998, 10], [1999, 9],
    [2000, 10], [2001, 8], [2002, 10], [2003, 5], [2004, 4], [2005, 5],
    [2006, 5], [2007, 6], [2008, 6], [2009, 7], [2010, 6], [2011, 7],
    [2012, 7], [2013, 6], [2014, 7], [2015, 8], [2016, 8], [2017, 9],
    [2018, 8], [2019, 6], [2020, 5], [2021, 6], [2022, 5], [2023, 4],
    [2024, 4], [2025, 3],
  ),

  // Japan: steady small program, JAXA era
  japan: series(
    [1970, 1], [1971, 1], [1972, 1], [1975, 2], [1977, 2], [1978, 1],
    [1979, 2], [1980, 2], [1981, 3], [1982, 2], [1983, 3], [1984, 3],
    [1985, 2], [1986, 3], [1987, 3], [1988, 2], [1989, 2], [1990, 3],
    [1991, 2], [1992, 2], [1993, 2], [1994, 3], [1995, 2], [1996, 1],
    [1997, 2], [1998, 2], [1999, 2], [2000, 2], [2001, 1], [2002, 3],
    [2003, 3], [2005, 2], [2006, 6], [2007, 3], [2008, 1], [2009, 3],
    [2010, 2], [2011, 3], [2012, 4], [2013, 3], [2014, 4], [2015, 4],
    [2016, 4], [2017, 6], [2018, 6], [2019, 4], [2020, 4], [2021, 3],
    [2022, 3], [2023, 4], [2024, 5], [2025, 5],
  ),

  // India: ISRO growing steadily
  india: series(
    [1980, 1], [1981, 1], [1983, 1], [1987, 1], [1988, 1], [1990, 1],
    [1992, 1], [1993, 1], [1994, 2], [1996, 1], [1997, 1], [1999, 1],
    [2001, 2], [2002, 1], [2003, 2], [2004, 1], [2005, 1], [2007, 3],
    [2008, 3], [2009, 2], [2010, 3], [2011, 3], [2012, 2], [2013, 3],
    [2014, 4], [2015, 5], [2016, 7], [2017, 5], [2018, 7], [2019, 6],
    [2020, 2], [2021, 2], [2022, 5], [2023, 7], [2024, 8], [2025, 7],
  ),

  // UK: one orbital launch in 1971, then long gap
  uk: series(
    [1971, 1], [1972, 0], [2025, 0.1],
  ),

  // Israel: occasional Shavit launches
  israel: series(
    [1988, 1], [1989, 0], [1990, 1], [1994, 1], [1995, 1], [1998, 0],
    [2002, 1], [2007, 1], [2008, 0], [2014, 1], [2016, 1], [2020, 1],
    [2021, 0], [2025, 0.1],
  ),

  // Iran: first successful orbital launch 2009
  iran: series(
    [2009, 1], [2010, 0], [2011, 1], [2012, 1], [2013, 0], [2015, 1],
    [2017, 1], [2019, 0], [2020, 2], [2021, 1], [2022, 2], [2023, 1],
    [2024, 1], [2025, 1],
  ),

  // South Korea: KSLV program
  south_korea: series(
    [2009, 1], [2010, 1], [2012, 1], [2013, 1], [2018, 0], [2021, 1],
    [2022, 2], [2023, 2], [2024, 2], [2025, 2],
  ),

  // North Korea: occasional attempts
  north_korea: series(
    [1998, 1], [2006, 1], [2009, 1], [2012, 2], [2016, 1], [2017, 0],
    [2023, 1], [2024, 0], [2025, 0.1],
  ),

  // New Zealand: Rocket Lab from Mahia Peninsula
  new_zealand: series(
    [2017, 1], [2018, 3], [2019, 6], [2020, 7], [2021, 6], [2022, 9],
    [2023, 10], [2024, 16], [2025, 15],
  ),

  // Italy: San Marco launches in 1960s-70s, small modern role
  italy: series(
    [1964, 1], [1967, 1], [1970, 1], [1971, 1], [1974, 1], [1975, 0],
    [1988, 1], [2012, 1], [2020, 1], [2025, 0.1],
  ),

  // Australia: one launch 1967 (Wresat), then long gap
  australia: series(
    [1967, 1], [1968, 0], [2025, 0.1],
  ),

  // Brazil: VLS program attempts
  brazil: series(
    [1997, 0.1], [2003, 1], [2004, 0], [2025, 0.1],
  ),
};

function formatValue(n: number): string {
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const SPACE_LAUNCHES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 SPACE LAUNCHES BY COUNTRY",
  subtitle: "THE ULTIMATE SPACE RACE",
  unitLabel: "Annual Orbital Launch Attempts",
  valueUnit: "launches",
  startYear: 1957,
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
  unitIcon: ROCKET_ICON,
  events: {
    1957: "The Soviet Union launches Sputnik \u2014 humanity's first artificial satellite enters orbit",
    1975: "USSR conducts over 100 orbital launches in a single year \u2014 the peak of the Soviet space program",
    1998: "Construction of the International Space Station begins \u2014 the largest cooperative space project in history",
    2020: "SpaceX launches astronauts to the ISS \u2014 private companies reshape the global launch landscape",
  },
  sourceLabel: "Data: Space Launch Report, Jonathan McDowell's launch logs, ESA",
};
