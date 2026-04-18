import type { BarRaceConfig, BarRaceItem } from "../types";
import { makeBadgeIcon } from "./makeBadgeIcon";

const SALES_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.85))" }}>
    <rect x="1.4" y="2" width="8.2" height="6.8" rx="1.2" fill="#1e2d45" stroke="#ffd166" strokeWidth="0.8" />
    <path d="M3.2 4.2 H5.1 M4.15 3.25 V5.15" stroke="#ffd166" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="7.3" cy="4" r="0.7" fill="#ffd166" />
    <circle cx="8.1" cy="5.2" r="0.7" fill="#ffd166" />
    <path d="M2.5 8.8 H8.5" stroke="#ff9f1c" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = [
  { id: "arcade", name: "Arcade", color: "#4da3ff", renderIcon: makeBadgeIcon("ARC", "#17365d", "#69c6ff", "arcade") },
  { id: "platformer", name: "Platformer", color: "#ff8c42", renderIcon: makeBadgeIcon("PLAT", "#5a2b12", "#ffb35c", "controller") },
  { id: "puzzle", name: "Puzzle", color: "#f7b801", renderIcon: makeBadgeIcon("PUZ", "#4d3908", "#ffd54f", "grid") },
  { id: "sports", name: "Sports", color: "#43c59e", renderIcon: makeBadgeIcon("SPORT", "#123f35", "#7af0c5", "plain") },
  { id: "racing", name: "Racing", color: "#ff6b6b", renderIcon: makeBadgeIcon("RACE", "#501d1d", "#ff9a7a", "wheel") },
  { id: "fighting", name: "Fighting", color: "#d96df0", renderIcon: makeBadgeIcon("FGT", "#472059", "#f09cff", "controller") },
  { id: "beatemup", name: "Beat 'Em Up", color: "#c77d52", renderIcon: makeBadgeIcon("BRAWL", "#4c2714", "#f1a36e", "controller") },
  { id: "adventure", name: "Adventure", color: "#7bd389", renderIcon: makeBadgeIcon("ADV", "#1d4631", "#a7efb1", "sword") },
  { id: "action", name: "Action", color: "#ff7f50", renderIcon: makeBadgeIcon("ACT", "#54261a", "#ffb086", "controller") },
  { id: "stealth", name: "Stealth", color: "#86a6c8", renderIcon: makeBadgeIcon("STL", "#23354d", "#b9d4ef", "shield") },
  { id: "shooter", name: "Shooter", color: "#5bb8ff", renderIcon: makeBadgeIcon("FPS", "#173352", "#8fd2ff", "crosshair") },
  { id: "strategy", name: "Strategy", color: "#b39ddb", renderIcon: makeBadgeIcon("STR", "#33224e", "#d0b7ff", "grid") },
  { id: "rts", name: "Real-Time Strategy", color: "#8892ff", renderIcon: makeBadgeIcon("RTS", "#242d64", "#b5bcff", "grid") },
  { id: "tactics", name: "Tactics", color: "#94d2bd", renderIcon: makeBadgeIcon("TACT", "#203f39", "#bff1dd", "grid") },
  { id: "rpg", name: "RPG", color: "#d4a373", renderIcon: makeBadgeIcon("RPG", "#4e3220", "#f3c38c", "sword") },
  { id: "jrpg", name: "JRPG", color: "#e5989b", renderIcon: makeBadgeIcon("JRPG", "#54262a", "#ffc1c4", "sword") },
  { id: "action_rpg", name: "Action RPG", color: "#f28482", renderIcon: makeBadgeIcon("ARPG", "#5a2423", "#ffb4af", "sword") },
  { id: "simulation", name: "Simulation", color: "#4ecdc4", renderIcon: makeBadgeIcon("SIM", "#134844", "#88f1e6", "grid") },
  { id: "life_sim", name: "Life Sim", color: "#ffd166", renderIcon: makeBadgeIcon("LIFE", "#554117", "#ffe08f", "plain") },
  { id: "mmo", name: "MMO", color: "#9b5de5", renderIcon: makeBadgeIcon("MMO", "#351a57", "#c59dff", "shield") },
  { id: "sandbox", name: "Sandbox", color: "#6ab04c", renderIcon: makeBadgeIcon("SAND", "#1f4418", "#9ce06e", "grid") },
  { id: "survival", name: "Survival", color: "#c1121f", renderIcon: makeBadgeIcon("SURV", "#460d14", "#ff6572", "shield") },
  { id: "horror", name: "Horror", color: "#7c4dff", renderIcon: makeBadgeIcon("HOR", "#29164f", "#b49aff", "shield") },
  { id: "rhythm", name: "Rhythm", color: "#ff70a6", renderIcon: makeBadgeIcon("RHY", "#4e1833", "#ff9ec0", "music") },
  { id: "tower_defense", name: "Tower Defense", color: "#ff9f1c", renderIcon: makeBadgeIcon("TD", "#533109", "#ffcb6e", "shield") },
  { id: "moba", name: "MOBA", color: "#3ec1d3", renderIcon: makeBadgeIcon("MOBA", "#103c47", "#83ecff", "crosshair") },
  { id: "battle_royale", name: "Battle Royale", color: "#f94144", renderIcon: makeBadgeIcon("BR", "#541316", "#ff8b8e", "crosshair") },
  { id: "card_battler", name: "Card Battler", color: "#a29bfe", renderIcon: makeBadgeIcon("CARD", "#2e2861", "#cec9ff", "cards") },
  { id: "party", name: "Party", color: "#f3722c", renderIcon: makeBadgeIcon("PARTY", "#5a2410", "#ffb078", "plain") },
  { id: "roguelike", name: "Roguelike", color: "#90be6d", renderIcon: makeBadgeIcon("ROGUE", "#27431a", "#c0ef97", "sword") },
];

const MILESTONES: Record<string, Record<number, number>> = {
  arcade: series([1980, 40], [1982, 120], [1985, 260], [1990, 420], [1995, 520], [2000, 600], [2005, 660], [2010, 710], [2015, 740], [2020, 760], [2025, 780]),
  platformer: series([1981, 0.5], [1985, 40], [1990, 220], [1995, 480], [2000, 700], [2005, 900], [2010, 1150], [2015, 1350], [2020, 1600], [2025, 1850]),
  puzzle: series([1980, 15], [1985, 60], [1990, 130], [1995, 240], [2000, 380], [2005, 560], [2010, 820], [2015, 1450], [2020, 2150], [2025, 2600]),
  sports: series([1980, 5], [1985, 35], [1990, 120], [1995, 300], [2000, 520], [2005, 760], [2010, 1080], [2015, 1450], [2020, 1820], [2025, 2100]),
  racing: series([1980, 3], [1985, 20], [1990, 85], [1995, 210], [2000, 380], [2005, 560], [2010, 760], [2015, 970], [2020, 1170], [2025, 1350]),
  fighting: series([1987, 0.5], [1990, 45], [1995, 180], [2000, 330], [2005, 470], [2010, 590], [2015, 720], [2020, 820], [2025, 900]),
  beatemup: series([1985, 0.5], [1990, 70], [1995, 170], [2000, 240], [2005, 290], [2010, 320], [2015, 345], [2020, 360], [2025, 370]),
  adventure: series([1980, 6], [1985, 20], [1990, 60], [1995, 150], [2000, 330], [2005, 560], [2010, 820], [2015, 1080], [2020, 1290], [2025, 1460]),
  action: series([1980, 8], [1985, 30], [1990, 110], [1995, 280], [2000, 620], [2005, 1000], [2010, 1450], [2015, 2000], [2020, 2450], [2025, 2820]),
  stealth: series([1987, 0.2], [1990, 3], [1995, 35], [2000, 120], [2005, 210], [2010, 300], [2015, 370], [2020, 410], [2025, 430]),
  shooter: series([1980, 12], [1985, 45], [1990, 120], [1995, 280], [2000, 700], [2005, 1150], [2010, 1600], [2015, 2150], [2020, 2760], [2025, 3200]),
  strategy: series([1980, 5], [1985, 18], [1990, 70], [1995, 180], [2000, 360], [2005, 520], [2010, 690], [2015, 820], [2020, 930], [2025, 990]),
  rts: series([1990, 0.5], [1995, 65], [2000, 210], [2005, 330], [2010, 430], [2015, 500], [2020, 540], [2025, 560]),
  tactics: series([1985, 0.2], [1990, 12], [1995, 55], [2000, 130], [2005, 220], [2010, 320], [2015, 420], [2020, 500], [2025, 560]),
  rpg: series([1980, 2], [1985, 18], [1990, 70], [1995, 210], [2000, 480], [2005, 820], [2010, 1200], [2015, 1650], [2020, 2050], [2025, 2360]),
  jrpg: series([1984, 0.5], [1990, 40], [1995, 140], [2000, 260], [2005, 360], [2010, 470], [2015, 560], [2020, 620], [2025, 650]),
  action_rpg: series([1995, 0.5], [2000, 40], [2005, 140], [2010, 320], [2015, 650], [2020, 1040], [2025, 1350]),
  simulation: series([1980, 2], [1985, 10], [1990, 45], [1995, 140], [2000, 320], [2005, 520], [2010, 760], [2015, 1010], [2020, 1180], [2025, 1300]),
  life_sim: series([2000, 0.5], [2005, 55], [2010, 160], [2015, 280], [2020, 400], [2025, 480]),
  mmo: series([1997, 0.5], [2000, 18], [2005, 120], [2010, 260], [2015, 390], [2020, 470], [2025, 520]),
  sandbox: series([2009, 0.5], [2010, 5], [2015, 260], [2020, 960], [2025, 1720]),
  survival: series([1995, 0.3], [2000, 8], [2005, 30], [2010, 110], [2015, 290], [2020, 490], [2025, 620]),
  horror: series([1983, 0.2], [1985, 2], [1990, 15], [1995, 60], [2000, 140], [2005, 220], [2010, 300], [2015, 390], [2020, 470], [2025, 520]),
  rhythm: series([1996, 0.5], [2000, 40], [2005, 120], [2010, 210], [2015, 280], [2020, 320], [2025, 340]),
  tower_defense: series([2007, 0.5], [2010, 45], [2015, 160], [2020, 250], [2025, 300]),
  moba: series([2003, 0.2], [2005, 5], [2010, 120], [2015, 430], [2020, 690], [2025, 810]),
  battle_royale: series([2017, 1], [2018, 160], [2019, 340], [2020, 620], [2021, 850], [2022, 1040], [2023, 1170], [2025, 1400]),
  card_battler: series([1995, 0.2], [2000, 20], [2005, 65], [2010, 140], [2015, 240], [2020, 340], [2025, 420]),
  party: series([1985, 0.5], [1990, 10], [1995, 35], [2000, 90], [2005, 170], [2010, 280], [2015, 420], [2020, 540], [2025, 640]),
  roguelike: series([1980, 1], [1985, 3], [1990, 8], [1995, 15], [2000, 25], [2005, 45], [2010, 90], [2015, 180], [2020, 290], [2025, 390]),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}B`;
  if (n >= 10) return `${Math.round(n)}M`;
  return `${n.toFixed(1)}M`;
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const BEST_SELLING_GENRES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 VIDEO GAME GENRES",
  subtitle: "FROM ARCADE TO BATTLE ROYALE",
  unitLabel: "Estimated Cumulative Sales (million copies)",
  valueUnit: "copies",
  startYear: 1980,
  endYear: 2025,
  topN: 10,
  minValue: 0.2,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 10,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: SALES_ICON,
  events: {
    1980: "Arcade hits like Pac-Man and Space Invaders prove games can become a global pop-culture obsession",
    1995: "The 32-bit era pushes 3D action, sports, and RPG genres into the mainstream living room",
    2010: "Smartphones and free-to-play design send puzzle and casual genres into the mass market",
    2025: "Battle royale, sandbox, and live-service genres define the late-2020s gaming conversation",
  },
  sourceLabel: "Data: Estimated from publisher unit reports, arcade install counts, and genre-level market reconstructions",
};
