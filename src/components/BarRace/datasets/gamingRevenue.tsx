import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const MONEY_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.85))" }}>
    <circle cx="5.5" cy="5.5" r="4.3" fill="#134e4a" stroke="#7af0c5" strokeWidth="0.8" />
    <path d="M5.5 2.7 V8.3" stroke="#d9fff1" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M7.2 3.8 C6.7 3.2 4.6 3.2 4 4 C3.4 4.8 4.2 5.4 5.5 5.6 C6.8 5.8 7.6 6.4 7 7.2 C6.4 8 4.2 8 3.8 7.3" stroke="#d9fff1" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = [
  { id: "arcade", name: "Arcade", color: "#4da3ff", renderIcon: makeBadgeIcon("ARC", "#17365d", "#69c6ff", "arcade") },
  { id: "atari2600", name: "Atari 2600", color: "#ff8c42", renderIcon: makeBadgeIcon("2600", "#5a2b12", "#ffb35c", "console") },
  { id: "nes", name: "NES / Famicom", color: "#f94144", renderIcon: makeBadgeIcon("NES", "#5b1217", "#ff8b8e", "console") },
  { id: "gameboy", name: "Game Boy", color: "#7bd389", renderIcon: makeBadgeIcon("GB", "#1d4631", "#a7efb1", "handheld") },
  { id: "snes", name: "SNES", color: "#d96df0", renderIcon: makeBadgeIcon("SNES", "#472059", "#f09cff", "console") },
  { id: "genesis", name: "Sega Genesis", color: "#43c59e", renderIcon: makeBadgeIcon("GEN", "#123f35", "#7af0c5", "console") },
  { id: "playstation", name: "PlayStation", color: "#5bb8ff", renderIcon: makeBadgeIcon("PS", "#173352", "#8fd2ff", "console") },
  { id: "n64", name: "Nintendo 64", color: "#ff6b6b", renderIcon: makeBadgeIcon("N64", "#501d1d", "#ff9a7a", "console") },
  { id: "dreamcast", name: "Dreamcast", color: "#f7b801", renderIcon: makeBadgeIcon("DC", "#4d3908", "#ffd54f", "console") },
  { id: "ps2", name: "PlayStation 2", color: "#4895ef", renderIcon: makeBadgeIcon("PS2", "#17396a", "#9ed0ff", "console") },
  { id: "xbox", name: "Xbox", color: "#6ab04c", renderIcon: makeBadgeIcon("XB", "#1f4418", "#9ce06e", "console") },
  { id: "gamecube", name: "GameCube", color: "#a29bfe", renderIcon: makeBadgeIcon("GC", "#2e2861", "#cec9ff", "console") },
  { id: "gba", name: "Game Boy Advance", color: "#ffd166", renderIcon: makeBadgeIcon("GBA", "#554117", "#ffe08f", "handheld") },
  { id: "ds", name: "Nintendo DS", color: "#e5989b", renderIcon: makeBadgeIcon("DS", "#54262a", "#ffc1c4", "handheld") },
  { id: "psp", name: "PSP", color: "#86a6c8", renderIcon: makeBadgeIcon("PSP", "#23354d", "#b9d4ef", "handheld") },
  { id: "wii", name: "Wii", color: "#90e0ef", renderIcon: makeBadgeIcon("WII", "#14404b", "#c9f6ff", "console") },
  { id: "xbox360", name: "Xbox 360", color: "#80ed99", renderIcon: makeBadgeIcon("360", "#1d4a27", "#b3ffbf", "console") },
  { id: "ps3", name: "PlayStation 3", color: "#4cc9f0", renderIcon: makeBadgeIcon("PS3", "#123e4f", "#9cecff", "console") },
  { id: "3ds", name: "Nintendo 3DS", color: "#ff70a6", renderIcon: makeBadgeIcon("3DS", "#4e1833", "#ff9ec0", "handheld") },
  { id: "ps4", name: "PlayStation 4", color: "#3a86ff", renderIcon: makeBadgeIcon("PS4", "#143568", "#7fb3ff", "console") },
  { id: "xboxone", name: "Xbox One", color: "#52b788", renderIcon: makeBadgeIcon("ONE", "#173c2e", "#8ae3b4", "console") },
  { id: "switch", name: "Nintendo Switch", color: "#ff595e", renderIcon: makeBadgeIcon("SW", "#5a1a20", "#ff9ea1", "handheld") },
  { id: "ps5", name: "PlayStation 5", color: "#6ea8fe", renderIcon: makeBadgeIcon("PS5", "#1c3f69", "#b5d3ff", "console") },
  { id: "xboxseries", name: "Xbox Series", color: "#95d5b2", renderIcon: makeBadgeIcon("XS", "#1f4731", "#c8ffd8", "console") },
  { id: "pc", name: "PC Gaming", color: "#cdb4db", renderIcon: makeBadgeIcon("PC", "#3b2948", "#eed3ff", "desktop") },
  { id: "browser", name: "Browser Games", color: "#f4a261", renderIcon: makeBadgeIcon("WEB", "#59331a", "#ffc489", "desktop") },
  { id: "steam", name: "Steam", color: "#8ecae6", renderIcon: makeBadgeIcon("STM", "#1b4050", "#c3f0ff", "desktop") },
  { id: "ios", name: "iOS", color: "#ff9f1c", renderIcon: makeBadgeIcon("iOS", "#5a3309", "#ffd17d", "phone") },
  { id: "android", name: "Android", color: "#70e000", renderIcon: makeBadgeIcon("AND", "#244a08", "#b9ff74", "phone") },
  { id: "vr", name: "VR", color: "#9b5de5", renderIcon: makeBadgeIcon("VR", "#351a57", "#c59dff", "vr") },
  { id: "cloud", name: "Cloud Gaming", color: "#48cae4", renderIcon: makeBadgeIcon("CLD", "#113b4a", "#94efff", "cloud") },
];

const MILESTONES: Record<string, Record<number, number>> = {
  arcade: series([1980, 11], [1982, 19], [1985, 10], [1990, 5], [1995, 4], [2000, 3.5], [2005, 3], [2010, 2.4], [2015, 2], [2020, 1.8], [2025, 1.6]),
  atari2600: series([1980, 1.4], [1982, 2.2], [1984, 0.4], [1985, 0.1], [1986, 0]),
  nes: series([1983, 0.2], [1985, 0.8], [1990, 4.4], [1993, 3.2], [1995, 1.1], [1998, 0.2], [1999, 0]),
  gameboy: series([1989, 0.5], [1990, 1.1], [1995, 2.5], [2000, 1.2], [2004, 0.3], [2005, 0]),
  snes: series([1990, 0.6], [1992, 2.2], [1995, 1.8], [1998, 0.4], [1999, 0]),
  genesis: series([1989, 0.3], [1992, 1.9], [1995, 1.5], [1998, 0.2], [1999, 0]),
  playstation: series([1995, 0.8], [1998, 3.2], [2000, 5.1], [2003, 1.4], [2004, 0]),
  n64: series([1996, 0.5], [1998, 1.4], [2000, 1.7], [2002, 0.6], [2003, 0]),
  dreamcast: series([1998, 0.4], [2000, 0.8], [2001, 0.5], [2002, 0]),
  ps2: series([2000, 1.5], [2003, 4.8], [2005, 6.5], [2010, 2.4], [2012, 0.6], [2014, 0]),
  xbox: series([2001, 0.7], [2003, 1.4], [2005, 2], [2006, 1.4], [2008, 0.4], [2009, 0]),
  gamecube: series([2001, 0.5], [2003, 1], [2005, 1.5], [2007, 0.5], [2008, 0]),
  gba: series([2001, 0.4], [2003, 1.1], [2005, 1.8], [2007, 0.8], [2008, 0]),
  ds: series([2004, 0.7], [2005, 1.5], [2008, 3.5], [2010, 4.8], [2013, 2], [2015, 0.8], [2018, 0.1], [2019, 0]),
  psp: series([2004, 0.5], [2006, 1.3], [2010, 2.4], [2012, 1], [2015, 0.3], [2016, 0]),
  wii: series([2006, 0.6], [2008, 2.8], [2010, 4.5], [2012, 3.3], [2015, 0.4], [2016, 0]),
  xbox360: series([2005, 0.8], [2008, 2.5], [2010, 4], [2013, 3.6], [2015, 1.5], [2018, 0.3], [2019, 0]),
  ps3: series([2006, 0.5], [2008, 2.1], [2010, 3.7], [2013, 4.2], [2015, 1.8], [2018, 0.3], [2019, 0]),
  "3ds": series([2011, 0.7], [2013, 1.6], [2015, 2.2], [2018, 1.1], [2020, 0.4], [2022, 0.1], [2023, 0]),
  ps4: series([2013, 1.5], [2015, 4.5], [2018, 9.4], [2020, 12], [2023, 7], [2025, 4.2]),
  xboxone: series([2013, 0.8], [2015, 2.2], [2018, 4.2], [2020, 5.5], [2023, 2.4], [2025, 1.4]),
  switch: series([2017, 1.8], [2018, 3.8], [2020, 8], [2022, 10.3], [2025, 11.2]),
  ps5: series([2020, 1.5], [2021, 3.8], [2022, 5.2], [2023, 6.8], [2025, 9.5]),
  xboxseries: series([2020, 0.7], [2021, 1.6], [2022, 2.1], [2023, 2.5], [2025, 3]),
  pc: series([1980, 0.3], [1985, 0.8], [1990, 2], [1995, 4.2], [2000, 7], [2005, 9.5], [2010, 12.5], [2015, 15], [2020, 18], [2025, 21]),
  browser: series([1997, 0.1], [2000, 0.5], [2005, 1.4], [2010, 4], [2015, 2.4], [2020, 1.3], [2025, 0.8]),
  steam: series([2004, 0.1], [2005, 0.3], [2010, 2.2], [2015, 5.8], [2020, 8.6], [2025, 10.5]),
  ios: series([2008, 0.2], [2010, 2.8], [2012, 8.5], [2015, 16], [2020, 28], [2025, 36]),
  android: series([2008, 0.05], [2010, 1], [2012, 6.2], [2015, 14], [2020, 34], [2025, 44]),
  vr: series([2016, 0.3], [2018, 0.8], [2020, 1.5], [2023, 2.5], [2025, 3.4]),
  cloud: series([2019, 0.1], [2020, 0.3], [2021, 0.5], [2023, 1], [2025, 1.8]),
};

function formatValue(n: number): string {
  if (n >= 1) return `$${n.toFixed(1)}B`;
  return `$${n.toFixed(2)}B`;
}

function formatValueFull(n: number): string {
  return `$${Math.round(n * 1_000_000_000).toLocaleString("en-US")}`;
}

export const GAMING_REVENUE_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 GAMING PLATFORMS",
  subtitle: "CONSOLE VS PC VS MOBILE",
  unitLabel: "Annual Revenue (USD billions)",
  valueUnit: "USD",
  startYear: 1980,
  endYear: 2025,
  topN: 10,
  minValue: 0.05,
  skipEmptyStartFrames: false,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 10,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: MONEY_ICON,
  events: {
    1980: "Arcade cabinets are still minting money, but home hardware is starting to pull gaming into the living room",
    1995: "Sony launches PlayStation and a new console cycle begins around 3D graphics and blockbuster game budgets",
    2010: "The smartphone app economy explodes and mobile gaming becomes the industry's fastest-growing revenue engine",
    2025: "Mobile ecosystems lead global gaming revenue while PlayStation, PC, and Nintendo fight for the rest of the market",
  },
  sourceLabel: "Data: Estimated from company filings, Newzoo-style market splits, app-store spending, and historical platform reconstructions",
};
