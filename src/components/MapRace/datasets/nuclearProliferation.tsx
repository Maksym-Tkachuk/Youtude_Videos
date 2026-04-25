import type { MapRaceConfig } from "../types";

const MILESTONES: Record<string, Record<number, number>> = {
  usa: {
    1945: 2, 1950: 300, 1955: 2400, 1960: 18600, 1965: 31200,
    1970: 26000, 1975: 27000, 1980: 24000, 1985: 23000,
    1990: 21000, 1995: 12000, 2000: 10500, 2005: 8000,
    2010: 5100, 2015: 4700, 2020: 3800, 2025: 3700,
  },
  ussr: {
    1949: 1, 1953: 120, 1955: 200, 1960: 1600, 1965: 6100,
    1970: 11600, 1975: 19000, 1980: 30000, 1985: 39000,
    1990: 37000, 1991: 35000, 1992: 0,
  },
  russia: {
    1992: 32000, 1995: 27000, 2000: 21000, 2005: 17000,
    2010: 12000, 2015: 7500, 2020: 6400, 2025: 5580,
  },
  uk: {
    1952: 1, 1955: 10, 1960: 30, 1965: 310, 1970: 280,
    1975: 350, 1980: 350, 1985: 300, 1990: 300,
    1995: 300, 2000: 280, 2005: 200, 2010: 225,
    2015: 215, 2020: 195, 2025: 225,
  },
  france: {
    1960: 1, 1965: 32, 1970: 36, 1975: 188, 1980: 250,
    1985: 360, 1990: 505, 1995: 500, 2000: 470,
    2005: 350, 2010: 300, 2015: 300, 2020: 290, 2025: 290,
  },
  china: {
    1964: 1, 1970: 75, 1975: 185, 1980: 280, 1985: 300,
    1990: 320, 1995: 300, 2000: 260, 2005: 260,
    2010: 240, 2015: 260, 2020: 350, 2023: 440, 2025: 500,
  },
  india: {
    1974: 1, 1990: 25, 1998: 30, 2005: 40,
    2010: 60, 2015: 90, 2020: 150, 2025: 172,
  },
  pakistan: {
    1998: 5, 2000: 15, 2005: 30, 2010: 70,
    2015: 110, 2020: 160, 2025: 170,
  },
  israel: {
    1967: 2, 1970: 8, 1975: 20, 1980: 40,
    1990: 60, 2000: 80, 2010: 80, 2020: 90, 2025: 90,
  },
  north_korea: {
    2006: 1, 2009: 3, 2013: 6, 2015: 10,
    2018: 20, 2020: 40, 2025: 50,
  },
  south_africa: {
    1982: 1, 1985: 4, 1989: 6, 1991: 0,
  },
};

function colorScale(value: number, maxValue: number): string {
  if (value <= 0) return "#152238";
  // Log scale for better distribution
  const t = Math.min(1, Math.log10(value + 1) / Math.log10(maxValue + 1));

  // Dark navy → teal → yellow → orange → red
  if (t < 0.2) {
    const s = t / 0.2;
    return `rgb(${Math.round(20 + s * 10)}, ${Math.round(50 + s * 60)}, ${Math.round(90 + s * 40)})`;
  } else if (t < 0.4) {
    const s = (t - 0.2) / 0.2;
    return `rgb(${Math.round(30 + s * 50)}, ${Math.round(110 + s * 80)}, ${Math.round(130 - s * 20)})`;
  } else if (t < 0.6) {
    const s = (t - 0.4) / 0.2;
    return `rgb(${Math.round(80 + s * 175)}, ${Math.round(190 + s * 40)}, ${Math.round(110 - s * 60)})`;
  } else if (t < 0.8) {
    const s = (t - 0.6) / 0.2;
    return `rgb(${Math.round(255)}, ${Math.round(230 - s * 100)}, ${Math.round(50 - s * 20)})`;
  } else {
    const s = (t - 0.8) / 0.2;
    return `rgb(${Math.round(255 - s * 30)}, ${Math.round(130 - s * 100)}, ${Math.round(30 - s * 20)})`;
  }
}

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

export const NUCLEAR_PROLIFERATION_CONFIG: MapRaceConfig = {
  milestones: MILESTONES,
  title: "NUCLEAR WEAPONS",
  subtitle: "SPREADING ACROSS THE GLOBE",
  unitLabel: "Nuclear Warheads by Country",
  valueUnit: "warheads",
  startYear: 1945,
  endYear: 2025,
  topN: 5,
  framesPerYear: 12,
  targetDuration: 45000,
  formatValue,
  colorScale,
  events: {
    1949: "The Soviet Union detonates its first atomic bomb — the nuclear arms race begins",
    1968: "The Nuclear Non-Proliferation Treaty is signed — nations pledge to stop the spread",
    1991: "The Soviet Union collapses — thousands of warheads scatter across four new states",
    2006: "North Korea conducts its first nuclear test — the 9th nation to go nuclear",
  },
  sourceLabel: "Data: FAS Nuclear Notebook, SIPRI",
  channelLabel: "@GlobalPace",
};
