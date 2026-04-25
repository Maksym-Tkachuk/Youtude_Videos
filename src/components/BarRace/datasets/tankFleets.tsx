import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const TANK_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    {/* turret */}
    <rect x="3.5" y="2" width="4" height="2.5" rx="0.6" fill="#556b3e" />
    {/* gun barrel */}
    <rect x="7.5" y="2.8" width="3" height="0.8" rx="0.3" fill="#8aa86e" />
    {/* hull */}
    <rect x="1" y="4.5" width="9" height="2.5" rx="0.8" fill="#556b3e" />
    {/* track left */}
    <ellipse cx="2.5" cy="8" rx="1.8" ry="1.2" fill="#3a4a2a" stroke="#8aa86e" strokeWidth="0.4" />
    {/* track right */}
    <ellipse cx="8.5" cy="8" rx="1.8" ry="1.2" fill="#3a4a2a" stroke="#8aa86e" strokeWidth="0.4" />
    {/* track middle */}
    <rect x="2.5" y="6.8" width="6" height="2.4" rx="0.4" fill="#3a4a2a" stroke="#8aa86e" strokeWidth="0.4" />
    {/* hull highlight */}
    <rect x="1.5" y="4.8" width="8" height="0.5" rx="0.2" fill="rgba(255,255,255,0.15)" />
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
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "syria",        name: "Syria",          color: "#cc3333" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "iraq",         name: "Iraq",           color: "#f87171" },
  { id: "jordan",       name: "Jordan",         color: "#84cc16" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "taiwan",       name: "Taiwan",         color: "#67e8f9" },
  { id: "vietnam",      name: "Vietnam",        color: "#14b8a6" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#a3e635" },
  { id: "greece",       name: "Greece",         color: "#60a5fa" },
  { id: "algeria",      name: "Algeria",        color: "#2dd4bf" },
  { id: "thailand",     name: "Thailand",       color: "#a855f7" },
  { id: "indonesia",    name: "Indonesia",      color: "#d946ef" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
]);

// Active main battle tanks / medium & heavy tanks by country
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: Korean War buildup, Cold War peak, post-Cold-War drawdown, War on Terror era
  usa: series(
    [1950,15000],[1955,14500],[1960,14000],[1965,13500],[1970,12500],
    [1975,10500],[1980,11500],[1985,12800],[1990,15000],[1995,9000],
    [2000,7600],[2005,7000],[2010,6300],[2015,5900],[2020,5500],
    [2025,5500]
  ),
  // USSR: largest tank army in history — colossal buildup through Cold War, peak ~68,000
  ussr: series(
    [1950,30000],[1955,35000],[1960,38000],[1965,40000],[1970,42000],
    [1975,48000],[1980,55000],[1983,60000],[1985,63000],[1988,66000],
    [1990,55000],[1991,50000],[1992,0]
  ),
  // Russia: inherits part of Soviet fleet, rapid decline through neglect and scrapping
  russia: series(
    [1992, 28000],[1995,22000],[2000,18000],[2005,16000],
    [2010,15500],[2015,15500],[2020,12500],[2022,12500],[2025,12000]
  ),
  // China: Soviet aid era, massive domestic production, modernization culling old types
  china: series(
    [1950,400],[1955,3000],[1960,5000],[1965,6500],[1970,8000],
    [1975,9000],[1980,10000],[1985,11000],[1990,10500],[1995,9000],
    [2000,8500],[2005,7500],[2010,7000],[2015,6400],[2020,5900],
    [2025,5800]
  ),
  // India: slow start, steady buildup with Soviet/Russian and domestic tanks
  india: series(
    [1950,50],[1955,200],[1960,600],[1965,1200],[1970,1600],
    [1975,2000],[1980,2500],[1985,3100],[1990,3400],[1995,3600],
    [2000,3900],[2005,4100],[2010,4200],[2015,4400],[2020,4600],
    [2025,4600]
  ),
  // North Korea: builds enormous obsolete fleet, mostly Cold War Soviet/Chinese designs
  north_korea: series(
    [1955,100],[1960,500],[1965,1000],[1970,1500],[1975,2000],
    [1980,2800],[1985,3500],[1990,4000],[1995,4500],[2000,4800],
    [2005,5000],[2010,5200],[2015,5400],[2020,5500],[2025,5500]
  ),
  // Egypt: Soviet-supplied 1960s, US-supplied post-Camp David, large fleet
  egypt: series(
    [1955,100],[1960,500],[1965,1000],[1967,800],[1970,1500],
    [1973,2000],[1975,2500],[1980,3000],[1985,3200],[1990,3500],
    [1995,3800],[2000,4000],[2005,4100],[2010,4200],[2015,4300],
    [2020,4300],[2025,4300]
  ),
  // Turkey: NATO member, steady growth, modernization with Altay program
  turkey: series(
    [1955,500],[1960,1500],[1965,1800],[1970,2000],[1975,2500],
    [1980,2800],[1985,3000],[1990,3300],[1995,3200],[2000,3000],
    [2005,2800],[2010,2600],[2015,2500],[2020,2300],[2025,2200]
  ),
  // Pakistan: grows steadily with Chinese and US supplied tanks
  pakistan: series(
    [1955,50],[1960,200],[1965,700],[1970,900],[1975,1200],
    [1980,1500],[1985,1800],[1990,2000],[1995,2200],[2000,2400],
    [2005,2500],[2010,2600],[2015,2700],[2020,2700],[2025,2700]
  ),
  // South Korea: builds up against NK threat, strong domestic industry (K1/K2)
  south_korea: series(
    [1955,100],[1960,500],[1965,700],[1970,1000],[1975,1200],
    [1980,1500],[1985,1800],[1990,2000],[1995,2200],[2000,2300],
    [2005,2400],[2010,2500],[2015,2500],[2020,2600],[2025,2600]
  ),
  // Israel: tiny start, massive expansion after 1967/1973 wars capturing Arab armor
  israel: series(
    [1950,30],[1955,200],[1960,400],[1965,800],[1967,1100],
    [1970,1700],[1973,2700],[1975,3000],[1980,3500],[1985,3800],
    [1990,3900],[1995,3700],[2000,3500],[2005,3200],[2010,2800],
    [2015,2500],[2020,2200],[2025,2200]
  ),
  // UK: large postwar fleet, steady decline as focus shifts to expeditionary forces
  uk: series(
    [1950,3000],[1955,2800],[1960,2500],[1965,2200],[1970,1800],
    [1975,1600],[1980,1400],[1985,1300],[1990,1200],[1995,800],
    [2000,550],[2005,400],[2010,350],[2015,300],[2020,250],
    [2025,230]
  ),
  // Germany (West/unified): Bundeswehr Cold War fleet, massive post-reunification cuts
  germany: series(
    [1955,200],[1960,2500],[1965,3000],[1970,3200],[1975,3500],
    [1980,3700],[1985,4000],[1990,4700],[1995,2500],[2000,1800],
    [2005,1200],[2010,700],[2015,400],[2020,300],[2025,250]
  ),
  // France: large postwar fleet, gradually shrinks, Leclerc replaces AMX-30
  france: series(
    [1950,2000],[1955,3000],[1960,2800],[1965,2500],[1970,2200],
    [1975,1900],[1980,1800],[1985,1700],[1990,1500],[1995,1200],
    [2000,900],[2005,700],[2010,600],[2015,500],[2020,420],
    [2025,400]
  ),
  // Syria: massive Soviet-supplied buildup, catastrophic losses in civil war
  syria: series(
    [1960,100],[1965,1000],[1970,1500],[1973,2000],[1975,2500],
    [1980,3000],[1985,3600],[1990,4000],[1995,4200],[2000,4400],
    [2005,4600],[2010,4600],[2012,4500],[2014,3500],[2016,2500],
    [2018,2000],[2020,1700],[2025,1500]
  ),
  // Iran: Shah-era buildup with Chieftain/M60, war losses, rebuilds with T-72/Zulfiqar
  iran: series(
    [1955,50],[1960,400],[1965,600],[1970,900],[1975,1400],
    [1978,1700],[1980,1200],[1985,800],[1988,700],[1990,900],
    [1995,1100],[2000,1300],[2005,1500],[2010,1600],[2015,1700],
    [2020,1800],[2025,1800]
  ),
  // Iraq: dramatic rise (Soviet/Chinese supplied), destroyed twice in Gulf Wars
  iraq: series(
    [1960,100],[1965,500],[1970,800],[1975,1500],[1980,2500],
    [1985,4000],[1988,5000],[1990,5500],[1991,1500],[1995,1200],
    [2000,1000],[2003,800],[2004,50],[2010,100],[2015,150],
    [2020,200],[2025,200]
  ),
  // Jordan: small but well-equipped, Khalid/Chieftain tanks
  jordan: series(
    [1955,30],[1960,300],[1965,400],[1970,500],[1975,700],
    [1980,800],[1985,900],[1990,1000],[1995,1050],[2000,1100],
    [2005,1100],[2010,1100],[2015,1200],[2020,1200],[2025,1200]
  ),
  // Japan: JGSDF Type 61/74/90/10 — moderate fleet for defense-only doctrine
  japan: series(
    [1955,50],[1960,200],[1965,350],[1970,500],[1975,600],
    [1980,700],[1985,800],[1990,1000],[1995,900],[2000,800],
    [2005,700],[2010,650],[2015,600],[2020,550],[2025,500]
  ),
  // Italy: NATO fleet, Ariete MBT, gradual downsizing
  italy: series(
    [1950,500],[1955,800],[1960,1200],[1965,1500],[1970,1600],
    [1975,1600],[1980,1500],[1985,1400],[1990,1300],[1995,900],
    [2000,600],[2005,400],[2010,300],[2015,250],[2020,200],
    [2025,200]
  ),
  // Brazil: Leopard 1 / M60 / EE-T1 Osorio attempts, modest fleet
  brazil: series(
    [1955,50],[1960,200],[1965,250],[1970,300],[1975,350],
    [1980,400],[1985,400],[1990,400],[1995,400],[2000,400],
    [2005,400],[2010,400],[2015,400],[2020,400],[2025,400]
  ),
  // Poland: Warsaw Pact fleet, NATO transition, K2 purchases
  poland: series(
    [1950,500],[1955,1500],[1960,2500],[1965,2800],[1970,3000],
    [1975,3200],[1980,3300],[1985,3400],[1990,3000],[1995,2000],
    [2000,1400],[2005,1000],[2010,900],[2015,800],[2020,800],
    [2025,800]
  ),
  // Ukraine: inherits massive Soviet fleet, decades of neglect, heavy 2022 losses
  ukraine: series(
    [1992, 6500],[1995,5000],[2000,4000],[2005,3200],
    [2010,2800],[2015,2500],[2020,2500],[2022,2000],[2023,1500],
    [2025,1000]
  ),
  // Taiwan: M48/M60/CM-11 fleet, gradual modernization
  taiwan: series(
    [1955,50],[1960,300],[1965,500],[1970,700],[1975,800],
    [1980,900],[1985,1000],[1990,1100],[1995,1100],[2000,1100],
    [2005,1000],[2010,900],[2015,800],[2020,750],[2025,700]
  ),
  // Vietnam: Soviet-supplied during/after American War, aging fleet
  vietnam: series(
    [1960,50],[1965,200],[1970,1000],[1972,1500],[1975,2000],
    [1980,2200],[1985,2500],[1990,2300],[1995,2000],[2000,1800],
    [2005,1700],[2010,1600],[2015,1500],[2020,1500],[2025,1500]
  ),
  // Saudi Arabia: oil wealth purchases, M1 Abrams fleet
  saudi_arabia: series(
    [1960,10],[1965,50],[1970,100],[1975,200],[1980,400],
    [1985,600],[1990,700],[1995,800],[2000,900],[2005,1000],
    [2010,1000],[2015,1100],[2020,1100],[2025,1100]
  ),
  // Greece: NATO frontier, large fleet for its size, Leopard 2
  greece: series(
    [1955,100],[1960,500],[1965,700],[1970,900],[1975,1000],
    [1980,1200],[1985,1400],[1990,1600],[1995,1700],[2000,1700],
    [2005,1600],[2010,1500],[2015,1400],[2020,1300],[2025,1200]
  ),
  // Algeria: Soviet-supplied, modernized with T-90
  algeria: series(
    [1962,10],[1965,200],[1970,400],[1975,600],[1980,700],
    [1985,800],[1990,900],[1995,900],[2000,1000],[2005,1000],
    [2010,1100],[2015,1100],[2020,1200],[2025,1200]
  ),
  // Thailand: mixed fleet, Oplot-T, Chinese VT-4
  thailand: series(
    [1960,50],[1965,150],[1970,250],[1975,300],[1980,400],
    [1985,500],[1990,500],[1995,600],[2000,600],[2005,600],
    [2010,650],[2015,700],[2020,700],[2025,700]
  ),
  // Indonesia: Soviet-supplied early, Leopard 2 recent
  indonesia: series(
    [1955,20],[1960,100],[1965,200],[1970,200],[1975,200],
    [1980,250],[1985,250],[1990,300],[1995,300],[2000,300],
    [2005,300],[2010,350],[2015,400],[2020,400],[2025,400]
  ),
  // Australia: Centurion, Leopard AS1, M1 Abrams — tiny fleet
  australia: series(
    [1950,100],[1955,100],[1960,120],[1965,140],[1970,150],
    [1975,140],[1980,130],[1985,120],[1990,110],[1995,90],
    [2000,80],[2005,70],[2010,60],[2015,60],[2020,60],
    [2025,60]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const TANK_FLEETS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 TANK FLEETS BY COUNTRY",
  subtitle: "WHO HAS THE MOST ARMOR?",
  unitLabel: "Active Main Battle Tanks",
  valueUnit: "tanks",
  startYear: 1950,
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
  unitIcon: TANK_ICON,
  events: {
    1956: "Soviet tanks crush the Hungarian Revolution — the USSR demonstrates its armored dominance over Eastern Europe",
    1973: "Yom Kippur War — the largest tank battles since World War II erupt across the Sinai and Golan Heights",
    1991: "Operation Desert Storm obliterates Iraq's massive tank army — over 3,000 Iraqi tanks destroyed in 100 hours",
    2022: "Russia invades Ukraine — the largest tank war in Europe since 1945 begins, with heavy losses on both sides",
  },
  sourceLabel: "Data: IISS Military Balance, SIPRI, national defense reports",
};
