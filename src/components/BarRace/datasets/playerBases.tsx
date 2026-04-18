import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeIcon as _makeIcon } from "./makeIcon";

function makeIcon(id: string) {
  return _makeIcon("game-logos", id);
}

const PLAYERS_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.85))" }}>
    <circle cx="3.4" cy="3.4" r="1.6" fill="#9cecff" />
    <circle cx="7.8" cy="3.5" r="1.4" fill="#ffd166" />
    <path d="M1.5 8.9 C1.8 7.3 2.8 6.5 4.2 6.5 C5.6 6.5 6.6 7.3 6.9 8.9" stroke="#9cecff" strokeWidth="1" strokeLinecap="round" />
    <path d="M6.3 8.9 C6.5 7.6 7.2 6.9 8.3 6.9 C9.4 6.9 10 7.6 10.2 8.9" stroke="#ffd166" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = [
  { id: "supermario", name: "Super Mario", color: "#ff5a5f" },
  { id: "sonic", name: "Sonic", color: "#4f8cff" },
  { id: "streetfighter", name: "Street Fighter", color: "#d86dd8" },
  { id: "zelda", name: "Zelda Series", color: "#c7a44d" },
  { id: "doom", name: "Doom", color: "#b85c5c" },
  { id: "warcraft", name: "Warcraft", color: "#8b6bd9" },
  { id: "diablo", name: "Diablo", color: "#c85a7a" },
  { id: "pokemon_gb", name: "Pokemon Mainline", color: "#9d7cff" },
  { id: "ageofempires", name: "Age of Empires", color: "#9b7a52" },
  { id: "halflife", name: "Half-Life", color: "#ff9f43" },
  { id: "starcraft", name: "StarCraft", color: "#57b8ff" },
  { id: "gta", name: "GTA Series", color: "#9bcf53" },
  { id: "sims", name: "The Sims", color: "#43b8a8" },
  { id: "counterstrike", name: "Counter-Strike", color: "#f0b44c" },
  { id: "wow", name: "World of Warcraft", color: "#7f78e6" },
  { id: "needforspeed", name: "Need for Speed", color: "#d6cf52" },
  { id: "halo", name: "Halo Series", color: "#59d1dc" },
  { id: "minecraft", name: "Minecraft", color: "#5f9e4f" },
  { id: "angrybirds", name: "Angry Birds", color: "#ff6b5a" },
  { id: "templerun", name: "Temple Run", color: "#7a66d9" },
  { id: "fruitninja", name: "Fruit Ninja", color: "#db6c8e" },
  { id: "clashclans", name: "Clash of Clans", color: "#d97c4b" },
  { id: "candycrush", name: "Candy Crush", color: "#f07aae" },
  { id: "subway", name: "Subway Surfers", color: "#ffb357" },
  { id: "clashroyal", name: "Clash Royale", color: "#5e8ff0" },
  { id: "roblox", name: "Roblox", color: "#e05b5b" },
  { id: "pokemon", name: "Pokemon GO", color: "#f1ca4f" },
  { id: "pubg", name: "PUBG Mobile", color: "#8ca3b8" },
  { id: "freefire", name: "Free Fire", color: "#9b63e6" },
  { id: "fortnite", name: "Fortnite", color: "#4cc7a1" },
  { id: "brawlstars", name: "Brawl Stars", color: "#ef6a8a" },
  { id: "among", name: "Among Us", color: "#7bd0b0" },
  { id: "genshin", name: "Genshin Impact", color: "#7fc5de" },
].map(item => ({ ...item, renderIcon: makeIcon(item.id) }));

const MILESTONES: Record<string, Record<number, number>> = {
  supermario: series([1985, 2], [1987, 10], [1988, 14], [1990, 18], [1995, 22], [2000, 18], [2005, 20], [2010, 24], [2015, 26], [2020, 32], [2025, 35]),
  sonic: series([1991, 10], [1995, 18], [2000, 12], [2005, 10], [2010, 12], [2015, 15], [2020, 18], [2025, 20]),
  streetfighter: series([1991, 8], [1993, 20], [1995, 14], [2000, 9], [2005, 7], [2010, 11], [2015, 14], [2020, 18], [2025, 20]),
  zelda: series([1986, 0.5], [1988, 1.5], [1991, 2], [1995, 4], [2000, 5], [2005, 6], [2010, 8], [2015, 10], [2020, 16], [2025, 18]),
  doom: series([1993, 15], [1995, 18], [2000, 7], [2005, 5], [2010, 4], [2016, 8], [2020, 12], [2025, 10]),
  warcraft: series([1994, 2], [1996, 6], [2000, 12], [2005, 10], [2010, 6], [2015, 4], [2020, 3], [2025, 3]),
  diablo: series([1996, 3], [2000, 6], [2005, 5], [2010, 4], [2015, 6], [2020, 8], [2023, 14], [2025, 11]),
  pokemon_gb: series([1996, 15], [2000, 26], [2005, 18], [2010, 16], [2015, 20], [2020, 24], [2025, 26]),
  ageofempires: series([1997, 4], [2000, 9], [2005, 8], [2010, 7], [2015, 6], [2020, 8], [2025, 9]),
  halflife: series([1998, 6], [2000, 8], [2005, 5], [2010, 4], [2015, 4], [2020, 6], [2025, 5]),
  starcraft: series([1998, 8], [2000, 15], [2005, 12], [2010, 10], [2015, 9], [2020, 8], [2025, 7]),
  gta: series([1997, 2], [2000, 6], [2005, 12], [2010, 20], [2015, 35], [2020, 60], [2025, 70]),
  sims: series([2000, 10], [2005, 16], [2010, 20], [2015, 24], [2020, 32], [2025, 36]),
  counterstrike: series([2000, 6], [2005, 12], [2010, 18], [2015, 28], [2020, 38], [2023, 42], [2025, 40]),
  wow: series([2004, 4], [2006, 8], [2008, 12], [2010, 11], [2012, 9], [2015, 7], [2020, 6], [2025, 6]),
  needforspeed: series([1994, 5], [2000, 10], [2005, 14], [2010, 11], [2015, 9], [2020, 8], [2025, 7]),
  halo: series([2001, 5], [2005, 12], [2010, 11], [2015, 9], [2020, 12], [2025, 10]),
  minecraft: series([2009, 1], [2011, 8], [2013, 20], [2016, 55], [2018, 75], [2020, 125], [2022, 170], [2025, 195]),
  angrybirds: series([2009, 20], [2011, 80], [2013, 110], [2015, 70], [2018, 45], [2020, 40], [2025, 30]),
  templerun: series([2011, 12], [2012, 55], [2013, 48], [2015, 30], [2020, 18], [2025, 12]),
  fruitninja: series([2010, 8], [2012, 30], [2014, 24], [2016, 16], [2020, 10], [2025, 8]),
  clashclans: series([2012, 15], [2014, 35], [2016, 45], [2018, 42], [2020, 38], [2025, 30]),
  candycrush: series([2012, 18], [2014, 45], [2016, 60], [2018, 55], [2020, 52], [2025, 48]),
  subway: series([2012, 10], [2014, 28], [2016, 42], [2018, 55], [2020, 70], [2023, 82], [2025, 78]),
  clashroyal: series([2016, 18], [2017, 25], [2018, 24], [2020, 22], [2025, 18]),
  roblox: series([2006, 1], [2010, 4], [2014, 12], [2017, 30], [2019, 60], [2020, 120], [2021, 180], [2023, 230], [2025, 260]),
  pokemon: series([2016, 45], [2016.6, 80], [2017, 65], [2018, 60], [2019, 55], [2020, 68], [2021, 72], [2022, 78], [2025, 85]),
  pubg: series([2017, 10], [2018, 50], [2019, 70], [2020, 80], [2021, 78], [2023, 72], [2025, 68]),
  freefire: series([2017, 8], [2018, 40], [2019, 65], [2020, 85], [2021, 100], [2022, 95], [2025, 88]),
  fortnite: series([2017, 12], [2018, 80], [2019, 95], [2020, 105], [2021, 90], [2023, 92], [2025, 95]),
  brawlstars: series([2018, 10], [2019, 25], [2020, 35], [2021, 42], [2023, 50], [2025, 48]),
  among: series([2018, 1], [2019, 4], [2020.6, 35], [2020.75, 80], [2020.9, 120], [2021, 60], [2022, 38], [2025, 22]),
  genshin: series([2020, 15], [2020.8, 35], [2021, 50], [2022, 58], [2023, 62], [2025, 60]),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}B`;
  if (n >= 10) return `${Math.round(n)}M`;
  return `${n.toFixed(1)}M`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const PLAYER_BASES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 MOST PLAYED GAMES",
  subtitle: "ACTIVE PLAYER BASES",
  unitLabel: "Estimated Monthly Active Players (millions)",
  valueUnit: "players",
  startYear: 1993,
  endYear: 2025,
  topN: 10,
  minValue: 0.5,
  skipEmptyStartFrames: false,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 12,
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: PLAYERS_ICON,
  events: {
    1994: "Doom and the early PC online era turn multiplayer gaming from a niche hobby into a mass habit",
    2009: "Minecraft and smartphones make everyday gaming global, social, and always on",
    2024: "Fortnite, Roblox, and Minecraft prove the biggest games are now social platforms as much as games",
  },
  sourceLabel: "Data: Estimated from publisher MAU disclosures, app rankings, Steam-style player trackers, and franchise activity anchors",
};
