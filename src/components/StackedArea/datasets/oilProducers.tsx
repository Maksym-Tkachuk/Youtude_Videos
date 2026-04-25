import type { StackedAreaConfig, StackedAreaItem } from "../types";

const ITEMS: StackedAreaItem[] = [
  { id: "usa",          name: "USA",          color: "#3b82f6" },
  { id: "saudi_arabia", name: "Saudi Arabia", color: "#22c55e" },
  { id: "ussr",         name: "USSR",         color: "#991b1b" },
  { id: "russia",       name: "Russia",       color: "#ef4444" },
  { id: "china",        name: "China",        color: "#fb7185" },
  { id: "canada",       name: "Canada",       color: "#f43f5e" },
  { id: "iraq",         name: "Iraq",         color: "#fbbf24" },
  { id: "uae",          name: "UAE",          color: "#818cf8" },
  { id: "iran",         name: "Iran",         color: "#a3e635" },
  { id: "brazil",       name: "Brazil",       color: "#06b6d4" },
  { id: "other",        name: "Other",        color: "#4a6a8a" },
];

// Percentage shares of global oil production (should sum to ~100 per year)
const MILESTONES: Record<string, Record<number, number>> = {
  usa: {
    1970: 16, 1975: 13, 1980: 14, 1985: 14, 1990: 12, 1995: 11,
    2000: 10, 2005: 8.5, 2010: 8, 2013: 9, 2015: 12, 2018: 15,
    2020: 16, 2023: 18, 2025: 18,
  },
  saudi_arabia: {
    1970: 6, 1973: 13, 1975: 12, 1978: 14, 1980: 16, 1982: 11,
    1985: 6, 1988: 8, 1990: 11, 1995: 13, 2000: 12, 2005: 13,
    2010: 12, 2015: 13, 2020: 11, 2023: 12, 2025: 12,
  },
  ussr: {
    1970: 18, 1975: 20, 1980: 20, 1985: 21, 1988: 20, 1990: 18,
    1991: 16, 1992: 0,
  },
  russia: {
    1992: 0, 1993: 10, 1995: 10, 2000: 9, 2005: 12, 2010: 13,
    2015: 13, 2018: 13, 2020: 12, 2023: 12, 2025: 12,
  },
  china: {
    1970: 2, 1975: 3, 1980: 3.5, 1985: 4.5, 1990: 4.5, 1995: 5,
    2000: 5, 2005: 5, 2010: 5.5, 2015: 5, 2020: 5, 2025: 5,
  },
  canada: {
    1970: 2, 1975: 2.5, 1980: 2.5, 1985: 2.5, 1990: 2.5, 1995: 3,
    2000: 3.5, 2005: 4, 2010: 4, 2015: 5.5, 2020: 6, 2025: 6,
  },
  iraq: {
    1970: 3, 1975: 4, 1979: 5.5, 1981: 1.5, 1985: 2.5, 1988: 4,
    1990: 4, 1991: 0.5, 1995: 1, 2000: 4, 2003: 2, 2005: 3,
    2010: 3.5, 2015: 5, 2020: 5, 2025: 5,
  },
  uae: {
    1970: 2, 1975: 3, 1980: 3, 1985: 2, 1990: 3.5, 1995: 3.5,
    2000: 3.5, 2005: 4, 2010: 3.5, 2015: 4, 2020: 4, 2025: 4,
  },
  iran: {
    1970: 8, 1974: 10, 1978: 9, 1979: 5, 1980: 2.5, 1985: 4,
    1990: 5.5, 1995: 6, 2000: 5.5, 2005: 5.5, 2010: 5.5, 2012: 4.5,
    2015: 4, 2018: 3, 2020: 3, 2023: 4, 2025: 4,
  },
  brazil: {
    1970: 1, 1975: 0.5, 1980: 0.5, 1985: 1, 1990: 1, 1995: 1,
    2000: 2, 2005: 2.5, 2010: 3, 2015: 3.5, 2020: 4, 2025: 4,
  },
  other: {
    1970: 42, 1975: 39, 1980: 34, 1985: 42, 1988: 37, 1990: 38,
    1993: 35, 1995: 27, 2000: 28, 2005: 27, 2010: 27, 2015: 25,
    2020: 24, 2025: 30,
  },
};

export const OIL_PRODUCERS_CONFIG: StackedAreaConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "WHO CONTROLS THE WORLD'S OIL?",
  subtitle: "Share of Global Production",
  unitLabel: "Share of Global Oil Production (%)",
  startYear: 1970,
  endYear: 2025,
  framesPerYear: 12,
  targetDuration: 45_000,
  videoWidth: 405,
  videoHeight: 720,
  events: {
    1973: "OPEC oil embargo shocks the world \u2014 oil prices quadruple overnight",
    1990: "Iraq invades Kuwait \u2014 Gulf War disrupts Middle East oil supply",
    2008: "Oil hits $147 per barrel \u2014 the highest price in history before the financial crash",
    2023: "US shale revolution makes America the world's top oil producer for the first time since 1970",
  },
  sourceLabel: "Data: EIA / BP Statistical Review (estimates)",
};
