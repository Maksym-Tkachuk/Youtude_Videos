import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeIcon as _makeIcon } from "./makeIcon";

function makeIcon(id: string) {
  return _makeIcon("game-logos", id);
}

const DOWNLOAD_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M5.5 1 L5.5 7.5" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M2.5 5 L5.5 8 L8.5 5" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="1.5" y1="10" x2="9.5" y2="10" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

// ── Items ─────────────────────────────────────────────────────────────────────
const ITEMS: BarRaceItem[] = [
  { id: "pong",          name: "Pong",              color: "#8dd3ff" },
  { id: "breakout",      name: "Breakout",          color: "#ff9f43" },
  { id: "spaceinvaders", name: "Space Invaders",    color: "#5bb8ff" },
  { id: "asteroids",     name: "Asteroids",         color: "#b8c2cc" },
  { id: "galaxian",      name: "Galaxian",          color: "#a78bfa" },
  { id: "pacman",        name: "Pac-Man",           color: "#f4c542" },
  { id: "mspacman",      name: "Ms. Pac-Man",       color: "#ff7ab6" },
  { id: "donkeykong",    name: "Donkey Kong",       color: "#ff8c42" },
  { id: "frogger",       name: "Frogger",           color: "#4fbf7f" },
  { id: "defender",      name: "Defender",          color: "#57b8ff" },
  { id: "qbert",         name: "Q*bert",            color: "#ffb357" },
  { id: "supermario",    name: "Super Mario",       color: "#ff5a5f" },
  { id: "zelda",         name: "Zelda Series",      color: "#c7a44d" },
  { id: "sonic",         name: "Sonic",             color: "#4f8cff" },
  { id: "streetfighter", name: "Street Fighter",    color: "#d86dd8" },
  { id: "mariokar",      name: "Mario Kart",        color: "#f29f3d" },
  { id: "doom",          name: "Doom",              color: "#b85c5c" },
  { id: "warcraft",      name: "Warcraft",          color: "#8b6bd9" },
  { id: "diablo",        name: "Diablo",            color: "#c85a7a" },
  { id: "snake",         name: "Snake (Nokia)",     color: "#4fbf7f" },
  { id: "pokemon_gb",    name: "Pokémon (GB)",      color: "#9d7cff" },
  { id: "ageofempires",  name: "Age of Empires",    color: "#9b7a52" },
  { id: "halflife",      name: "Half-Life",         color: "#ff9f43" },
  { id: "starcraft",     name: "StarCraft",         color: "#57b8ff" },
  { id: "gta",           name: "GTA Series",        color: "#9bcf53" },
  { id: "sims",          name: "The Sims",          color: "#43b8a8" },
  { id: "counterstrike", name: "Counter-Strike",    color: "#f0b44c" },
  { id: "wow",           name: "World of Warcraft", color: "#7f78e6" },
  { id: "needforspeed",  name: "Need for Speed",    color: "#d6cf52" },
  { id: "halo",          name: "Halo Series",       color: "#59d1dc" },
  { id: "minecraft",     name: "Minecraft",         color: "#5f9e4f" },
  { id: "angrybirds",    name: "Angry Birds",       color: "#ff6b5a" },
  { id: "templerun",     name: "Temple Run",        color: "#7a66d9" },
  { id: "fruitninja",    name: "Fruit Ninja",       color: "#db6c8e" },
  { id: "clashclans",    name: "Clash of Clans",    color: "#d97c4b" },
  { id: "candycrush",    name: "Candy Crush",       color: "#f07aae" },
  { id: "subway",        name: "Subway Surfers",    color: "#ffb357" },
  { id: "clashroyal",    name: "Clash Royale",      color: "#5e8ff0" },
  { id: "roblox",        name: "Roblox",            color: "#e05b5b" },
  { id: "pokemon",       name: "Pokémon GO",        color: "#f1ca4f" },
  { id: "pubg",          name: "PUBG Mobile",       color: "#8ca3b8" },
  { id: "freefire",      name: "Free Fire",         color: "#9b63e6" },
  { id: "fortnite",      name: "Fortnite",          color: "#4cc7a1" },
  { id: "brawlstars",    name: "Brawl Stars",       color: "#ef6a8a" },
  { id: "among",         name: "Among Us",          color: "#7bd0b0" },
  { id: "genshin",       name: "Genshin Impact",    color: "#7fc5de" },
].map(item => ({ ...item, renderIcon: makeIcon(item.id) }));

// ── Milestones (downloads in millions) ───────────────────────────────────────
const MILESTONES: Record<string, Record<number, number>> = {
  pong:          { 1972:0.1, 1975:8, 1978:20, 1980:30, 1985:50, 1990:75, 1995:95, 2000:110, 2005:120, 2010:128, 2015:133, 2025:138 },
  breakout:      { 1976:0.1, 1978:5, 1980:12, 1983:25, 1985:35, 1990:48, 1995:60, 2000:70, 2005:78, 2010:84, 2015:88, 2025:92 },
  spaceinvaders: { 1978:0.1, 1980:8, 1985:25, 1990:55, 1995:90, 2000:120, 2005:140, 2010:155, 2015:165, 2020:170, 2025:172 },
  asteroids:     { 1979:0.1, 1980:6, 1982:15, 1985:28, 1990:42, 1995:55, 2000:63, 2005:70, 2010:74, 2015:77, 2025:80 },
  galaxian:      { 1979:0.1, 1981:4, 1983:10, 1985:16, 1990:26, 1995:34, 2000:40, 2005:44, 2010:47, 2015:49, 2025:50 },
  pacman:        { 1980:0.1, 1983:8, 1987:20, 1990:32, 1995:55, 2000:80, 2005:100, 2010:120, 2015:135, 2020:145, 2025:150 },
  mspacman:      { 1981:0.1, 1983:7, 1985:18, 1990:28, 1995:40, 2000:50, 2005:58, 2010:63, 2015:67, 2025:70 },
  donkeykong:    { 1981:0.1, 1984:5, 1988:15, 1990:22, 1994:35, 1998:45, 2002:55, 2007:65, 2012:72, 2018:80, 2025:85 },
  frogger:       { 1981:0.1, 1983:6, 1985:15, 1990:25, 1995:36, 2000:44, 2005:50, 2010:55, 2015:58, 2025:60 },
  defender:      { 1981:0.1, 1983:5, 1985:12, 1990:22, 1995:30, 2000:36, 2005:40, 2010:43, 2015:45, 2025:46 },
  qbert:         { 1982:0.1, 1984:4, 1986:10, 1990:16, 1995:24, 2000:30, 2005:34, 2010:36, 2015:37, 2025:38 },
  supermario:    { 1985:0.5, 1988:8, 1990:20, 1993:32, 1996:42, 2000:55, 2005:65, 2010:80, 2015:100, 2020:130, 2025:150 },
  zelda:         { 1986:0.5, 1989:4, 1992:9, 1995:16, 1998:28, 2002:40, 2006:52, 2010:65, 2014:80, 2018:100, 2022:120, 2025:130 },
  sonic:         { 1991:0.5, 1993:5, 1995:10, 1998:18, 2001:25, 2005:35, 2010:55, 2014:80, 2018:150, 2021:250, 2025:320 },
  streetfighter: { 1991:0.5, 1993:5, 1995:10, 1998:16, 2001:20, 2005:27, 2010:35, 2015:45, 2020:55, 2025:60 },
  mariokar:      { 1992:0.5, 1994:4, 1996:8, 1999:14, 2003:22, 2007:35, 2011:50, 2014:60, 2017:75, 2020:90, 2025:105 },
  doom:          { 1993:0.5, 1995:10, 1998:30, 2002:40, 2007:50, 2012:60, 2016:100, 2020:130, 2025:150 },
  warcraft:      { 1994:0.5, 1996:3, 1998:6, 2001:9, 2004:12, 2007:16, 2010:20, 2014:24, 2018:28, 2022:31, 2025:33 },
  diablo:        { 1996:0.5, 1998:5, 2001:8, 2004:10, 2008:14, 2012:20, 2016:30, 2020:50, 2023:70, 2025:80 },
  snake:         { 1997:1, 1999:10, 2001:40, 2003:100, 2005:200, 2007:300, 2009:350, 2012:380, 2015:390, 2020:400, 2025:410 },
  pokemon_gb:    { 1996:0.5, 1997:10, 1998:22, 2000:40, 2002:60, 2004:80, 2006:100, 2008:120, 2010:140, 2013:160, 2016:200, 2019:250, 2022:280, 2025:300 },
  ageofempires:  { 1997:0.5, 1999:3, 2002:7, 2005:12, 2008:18, 2011:22, 2014:27, 2017:32, 2020:42, 2023:52, 2025:58 },
  halflife:      { 1998:0.5, 2000:4, 2003:10, 2006:16, 2009:22, 2012:30, 2015:38, 2018:44, 2020:50, 2023:56, 2025:60 },
  starcraft:     { 1998:0.5, 2000:5, 2002:8, 2005:10, 2008:12, 2011:14, 2015:17, 2019:20, 2022:22, 2025:24 },
  gta:           { 1997:0.5, 2001:10, 2004:25, 2008:55, 2011:80, 2013:130, 2015:160, 2018:200, 2020:230, 2022:270, 2025:290 },
  sims:          { 2000:0.5, 2002:8, 2004:16, 2007:25, 2009:30, 2012:35, 2015:40, 2020:50, 2025:55 },
  counterstrike: { 2000:0.5, 2002:5, 2005:15, 2008:25, 2012:35, 2015:50, 2018:70, 2021:90, 2025:110 },
  wow:           { 2004:0.5, 2006:8, 2008:12, 2010:12, 2012:10, 2015:7, 2018:5, 2021:5, 2025:5 },
  needforspeed:  { 1994:0.5, 1998:5, 2002:15, 2005:25, 2008:35, 2012:45, 2016:55, 2020:65, 2025:70 },
  halo:          { 2001:0.5, 2003:5, 2005:12, 2008:20, 2010:28, 2013:35, 2016:42, 2019:50, 2022:58, 2025:62 },
  minecraft:     { 2009:0.1, 2011:5, 2013:25, 2016:100, 2018:154, 2020:200, 2022:238, 2024:300, 2025:310 },
  angrybirds:    { 2009:0.5, 2010:100, 2011:500, 2012:1000, 2013:1500, 2014:2000, 2015:2500, 2016:3000, 2017:3200, 2019:3500, 2021:3700, 2025:4000 },
  templerun:     { 2011:0.5, 2012:50, 2013:200, 2014:500, 2015:600, 2017:700, 2019:800, 2021:850, 2025:900 },
  fruitninja:    { 2010:0.5, 2011:30, 2012:100, 2013:200, 2015:400, 2017:700, 2019:1000, 2021:1100, 2025:1200 },
  clashclans:    { 2012:0.5, 2013:50, 2014:100, 2015:150, 2016:200, 2018:300, 2020:400, 2022:500, 2025:600 },
  candycrush:    { 2012:0.5, 2013:50, 2014:200, 2015:300, 2017:500, 2019:800, 2021:1200, 2023:2000, 2025:2500 },
  subway:        { 2012:0.5, 2013:30, 2014:100, 2015:150, 2017:500, 2019:1000, 2021:2000, 2023:3000, 2025:3500 },
  clashroyal:    { 2016:5, 2017:100, 2018:200, 2019:300, 2020:350, 2021:400, 2022:450, 2025:500 },
  roblox:        { 2006:0.5, 2010:5, 2014:20, 2017:60, 2019:100, 2020:200, 2021:350, 2023:500, 2025:600 },
  pokemon:       { 2016:50, 2016.5:100, 2017:650, 2018:800, 2019:900, 2020:1000, 2022:1200, 2024:1300, 2025:1350 },
  pubg:          { 2018:10, 2019:100, 2020:600, 2021:900, 2022:1000, 2023:1100, 2024:1200, 2025:1300 },
  freefire:      { 2017:5, 2018:100, 2019:450, 2020:800, 2021:1000, 2022:1100, 2023:1200, 2025:1300 },
  fortnite:      { 2017:1, 2018:125, 2019:250, 2020:350, 2021:400, 2022:450, 2023:500, 2025:550 },
  brawlstars:    { 2017:1, 2018:5, 2019:50, 2020:150, 2021:250, 2022:350, 2023:450, 2025:550 },
  among:         { 2018:0.5, 2019:5, 2020:10, 2020.7:200, 2020.9:500, 2021:600, 2022:700, 2023:750, 2025:800 },
  genshin:       { 2020:5, 2020.5:40, 2021:100, 2022:150, 2023:200, 2024:250, 2025:280 },
};

// ── Format helpers ────────────────────────────────────────────────────────────
function formatValue(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "B";
  if (n >= 1) return Math.round(n) + "M";
  return "<1M";
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

// ── Dataset config ────────────────────────────────────────────────────────────
export const GAMES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 GAMES",
  subtitle: "BY DOWNLOADS",
  unitLabel: "Total Downloads",
  valueUnit: "downloads",
  startYear: 1982,
  endYear: 2025,
  topN: 10,
  maxTotal: 15000,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  unitIcon: DOWNLOAD_ICON,
  minValue: 0.1,
  framesPerYear: 12,
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  events: { 1985: "Nintendo NES launches in the US, igniting the home console revolution", 2008: "Apple opens the App Store — a new era of mobile gaming begins", 2020: "COVID lockdowns drive a global gaming boom — downloads explode" },
  sourceLabel: "Data: Estimated from public reports + historical arcade install counts",
};
