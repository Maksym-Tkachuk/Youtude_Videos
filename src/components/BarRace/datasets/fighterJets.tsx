import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const JET_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M5.5 1 L6.3 4 L10 6.5 L10 7.3 L6.3 6 L6 8.5 L7.5 9.5 L7.5 10 L5.5 9.3 L3.5 10 L3.5 9.5 L5 8.5 L4.7 6 L1 7.3 L1 6.5 L4.7 4 Z" fill="#0f1a2e" stroke="#7ab8ff" strokeWidth="0.6" strokeLinejoin="round" />
    <path d="M5.5 1 L4.7 4 L6.3 4 Z" fill="#7ab8ff" opacity="0.5" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",          name: "United States",  color: "#3b82f6" },
  { id: "ussr",         name: "USSR",           color: "#ef4444" },
  { id: "russia",       name: "Russia",         color: "#f87171" },
  { id: "china",        name: "China",          color: "#f97316" },
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "india",        name: "India",          color: "#fbbf24" },
  { id: "japan",        name: "Japan",          color: "#fb7185" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "north_korea",  name: "North Korea",    color: "#991b1b" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "egypt",        name: "Egypt",          color: "#fb923c" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "pakistan",      name: "Pakistan",       color: "#10b981" },
  { id: "turkey",       name: "Turkey",         color: "#f43f5e" },
  { id: "italy",        name: "Italy",          color: "#34d399" },
  { id: "australia",    name: "Australia",      color: "#a3e635" },
  { id: "taiwan",       name: "Taiwan",         color: "#22d3ee" },
  { id: "brazil",       name: "Brazil",         color: "#4ade80" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#86efac" },
  { id: "iran",         name: "Iran",           color: "#d946ef" },
  { id: "indonesia",    name: "Indonesia",      color: "#14b8a6" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "spain",        name: "Spain",          color: "#f9a8d4" },
  { id: "sweden",       name: "Sweden",         color: "#fde047" },
  { id: "canada",       name: "Canada",         color: "#c084fc" },
  { id: "greece",       name: "Greece",         color: "#60a5fa" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "vietnam",      name: "Vietnam",        color: "#a855f7" },
  { id: "iraq",         name: "Iraq",           color: "#fdba74" },
]);

// Number of fighter/combat aircraft in active inventory by country
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: massive WWII peak ~30K fighters, postwar drawdown, Cold War rebuilds, modern ~1,900
  usa: series(
    [1945,28000],[1950,8500],[1955,12000],[1960,10000],[1965,8500],
    [1970,7200],[1975,5200],[1980,4800],[1985,5100],[1990,4600],
    [1995,3800],[2000,3200],[2005,2900],[2010,2600],[2015,2300],
    [2020,2100],[2025,1950]
  ),
  // USSR: rapid postwar buildup, Cold War peak ~10K+, collapses 1991
  ussr: series(
    [1945,15000],[1950,10000],[1955,12000],[1960,10500],[1965,9500],
    [1970,8800],[1975,8200],[1980,7600],[1985,7200],[1990,6200],
    [1991,5000],[1992,0]
  ),
  // Russia: inherits fraction of Soviet fleet, shrinks through 1990s, slowly rebuilds
  russia: series(
    [1992,0],[1993,3500],[1995,2800],[2000,1800],[2005,1400],
    [2010,1200],[2015,1100],[2020,1050],[2025,960]
  ),
  // China: Soviet-supplied early jets, huge expansion under Mao, modernization era
  china: series(
    [1945,0.1],[1950,200],[1955,1800],[1960,2500],[1965,3000],
    [1970,3800],[1975,4200],[1980,4500],[1985,4800],[1990,4600],
    [1995,3800],[2000,3200],[2005,2400],[2010,1800],[2015,1500],
    [2020,1300],[2025,1200]
  ),
  // UK: strong WWII fleet, steady Cold War presence, gradual reduction
  uk: series(
    [1945,9000],[1950,2800],[1955,2400],[1960,2100],[1965,1600],
    [1970,1200],[1975,900],[1980,750],[1985,650],[1990,600],
    [1995,450],[2000,380],[2005,340],[2010,280],[2015,220],
    [2020,170],[2025,137]
  ),
  // France: rebuilds postwar, nuclear force investment, Rafale era
  france: series(
    [1945,3500],[1950,1200],[1955,1500],[1960,1400],[1965,1100],
    [1970,900],[1975,700],[1980,620],[1985,580],[1990,550],
    [1995,480],[2000,420],[2005,360],[2010,300],[2015,260],
    [2020,240],[2025,225]
  ),
  // India: builds air force from 1950s, Soviet-supplied, grows to major fleet
  india: series(
    [1950,0.1],[1955,80],[1960,300],[1965,500],[1970,600],
    [1975,700],[1980,800],[1985,850],[1990,780],[1995,700],
    [2000,650],[2005,600],[2010,580],[2015,570],[2020,540],
    [2025,560]
  ),
  // Japan: disbanded 1945, rebuilds JASDF from 1954
  japan: series(
    [1945,5000],[1946,0.1],[1955,100],[1960,200],[1965,300],
    [1970,380],[1975,400],[1980,420],[1985,450],[1990,430],
    [1995,400],[2000,370],[2005,350],[2010,340],[2015,310],
    [2020,290],[2025,280]
  ),
  // Germany: Luftwaffe destroyed 1945, West Germany rebuilds in NATO from 1955
  germany: series(
    [1945,2500],[1946,0.1],[1955,80],[1960,500],[1965,700],
    [1970,650],[1975,620],[1980,600],[1985,580],[1990,550],
    [1995,400],[2000,300],[2005,260],[2010,220],[2015,180],
    [2020,140],[2025,140]
  ),
  // North Korea: Soviet/Chinese supplied, large fleet for its size
  north_korea: series(
    [1950,0.1],[1955,200],[1960,350],[1965,450],[1970,500],
    [1975,550],[1980,600],[1985,650],[1990,700],[1995,620],
    [2000,580],[2005,560],[2010,540],[2015,520],[2020,500],
    [2025,470]
  ),
  // South Korea: US-supplied, modernizes through decades
  south_korea: series(
    [1950,0.1],[1955,100],[1960,200],[1965,250],[1970,300],
    [1975,330],[1980,370],[1985,400],[1990,420],[1995,460],
    [2000,490],[2005,500],[2010,480],[2015,460],[2020,420],
    [2025,400]
  ),
  // Egypt: Soviet-supplied golden era, Western shift after 1973
  egypt: series(
    [1955,80],[1960,300],[1965,450],[1970,550],[1975,500],
    [1980,480],[1985,450],[1990,420],[1995,380],[2000,350],
    [2005,340],[2010,320],[2015,310],[2020,300],[2025,280]
  ),
  // Israel: rapid buildup after 1948, qualitative edge doctrine
  israel: series(
    [1948,30],[1950,50],[1955,100],[1960,200],[1965,280],
    [1967,300],[1970,400],[1975,500],[1980,560],[1985,580],
    [1990,550],[1995,450],[2000,400],[2005,370],[2010,340],
    [2015,330],[2020,310],[2025,300]
  ),
  // Pakistan: US and Chinese supplied, rivalry with India
  pakistan: series(
    [1950,0.1],[1955,50],[1960,120],[1965,200],[1970,280],
    [1975,300],[1980,350],[1985,400],[1990,420],[1995,380],
    [2000,350],[2005,320],[2010,300],[2015,280],[2020,280],
    [2025,260]
  ),
  // Turkey: NATO member, F-16 fleet backbone
  turkey: series(
    [1950,0.1],[1955,100],[1960,200],[1965,280],[1970,320],
    [1975,330],[1980,340],[1985,360],[1990,380],[1995,400],
    [2000,380],[2005,370],[2010,340],[2015,320],[2020,280],
    [2025,270]
  ),
  // Italy: NATO rebuilds, Eurofighter modernization
  italy: series(
    [1945,1200],[1950,300],[1955,400],[1960,500],[1965,450],
    [1970,400],[1975,380],[1980,370],[1985,360],[1990,340],
    [1995,300],[2000,280],[2005,260],[2010,240],[2015,220],
    [2020,200],[2025,190]
  ),
  // Australia: small but capable, US-equipped
  australia: series(
    [1945,800],[1950,150],[1955,200],[1960,180],[1965,170],
    [1970,160],[1975,140],[1980,130],[1985,130],[1990,130],
    [1995,120],[2000,100],[2005,95],[2010,90],[2015,85],
    [2020,80],[2025,80]
  ),
  // Taiwan (ROC): US-supplied, facing PRC across strait
  taiwan: series(
    [1950,50],[1955,200],[1960,350],[1965,400],[1970,420],
    [1975,440],[1980,460],[1985,480],[1990,480],[1995,450],
    [2000,400],[2005,380],[2010,360],[2015,340],[2020,300],
    [2025,280]
  ),
  // Brazil: gradual buildup, mixed suppliers
  brazil: series(
    [1950,50],[1955,80],[1960,100],[1965,120],[1970,130],
    [1975,140],[1980,150],[1985,160],[1990,160],[1995,140],
    [2000,120],[2005,100],[2010,90],[2015,80],[2020,70],
    [2025,65]
  ),
  // Saudi Arabia: massive purchases since 1970s oil wealth
  saudi_arabia: series(
    [1960,0.1],[1965,20],[1970,60],[1975,120],[1980,180],
    [1985,210],[1990,250],[1995,280],[2000,290],[2005,280],
    [2010,270],[2015,260],[2020,250],[2025,240]
  ),
  // Iran: Shah-era US fleet, post-revolution attrition
  iran: series(
    [1955,30],[1960,60],[1965,100],[1970,200],[1975,350],
    [1978,440],[1980,350],[1985,180],[1990,200],[1995,180],
    [2000,170],[2005,160],[2010,150],[2015,140],[2020,130],
    [2025,130]
  ),
  // Indonesia: Soviet, then Western supplied
  indonesia: series(
    [1955,20],[1960,80],[1965,100],[1970,80],[1975,60],
    [1980,50],[1985,50],[1990,60],[1995,70],[2000,60],
    [2005,50],[2010,50],[2015,50],[2020,50],[2025,55]
  ),
  // Poland: Warsaw Pact fleet, NATO transition
  poland: series(
    [1950,100],[1955,400],[1960,500],[1965,550],[1970,600],
    [1975,580],[1980,560],[1985,550],[1990,480],[1995,300],
    [2000,200],[2005,120],[2010,100],[2015,90],[2020,80],
    [2025,80]
  ),
  // Spain: late modernizer, Eurofighter
  spain: series(
    [1955,80],[1960,120],[1965,150],[1970,160],[1975,170],
    [1980,180],[1985,190],[1990,190],[1995,170],[2000,150],
    [2005,130],[2010,120],[2015,110],[2020,100],[2025,95]
  ),
  // Sweden: domestic Saab industry, Gripen era
  sweden: series(
    [1945,500],[1950,300],[1955,600],[1960,700],[1965,650],
    [1970,450],[1975,400],[1980,380],[1985,350],[1990,340],
    [1995,280],[2000,220],[2005,170],[2010,140],[2015,120],
    [2020,100],[2025,96]
  ),
  // Canada: NATO fleet, steady reduction
  canada: series(
    [1945,1200],[1950,300],[1955,500],[1960,600],[1965,450],
    [1970,350],[1975,250],[1980,200],[1985,180],[1990,160],
    [1995,130],[2000,110],[2005,100],[2010,80],[2015,77],
    [2020,76],[2025,76]
  ),
  // Greece: NATO frontier, large fleet for its size
  greece: series(
    [1950,0.1],[1955,80],[1960,150],[1965,200],[1970,220],
    [1975,250],[1980,280],[1985,310],[1990,330],[1995,340],
    [2000,340],[2005,320],[2010,300],[2015,280],[2020,250],
    [2025,230]
  ),
  // Ukraine: inherits Soviet assets, massive attrition post-2022
  ukraine: series(
    [1992,0],[1993,600],[1995,500],[2000,350],[2005,250],
    [2010,200],[2015,130],[2020,100],[2022,80],[2025,60]
  ),
  // Vietnam: Soviet-supplied, large fleet during American War era
  vietnam: series(
    [1960,30],[1965,100],[1970,200],[1975,400],[1980,350],
    [1985,320],[1990,300],[1995,250],[2000,210],[2005,180],
    [2010,150],[2015,120],[2020,100],[2025,80]
  ),
  // Iraq: Soviet-supplied buildup, destroyed in Gulf War
  iraq: series(
    [1960,40],[1965,100],[1970,180],[1975,300],[1980,400],
    [1985,500],[1988,700],[1990,750],[1991,250],[1995,200],
    [2000,180],[2003,100],[2005,0.1],[2010,5],[2015,15],
    [2020,20],[2025,25]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const FIGHTER_JETS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 FIGHTER AIRCRAFT FLEETS",
  subtitle: "WHICH COUNTRIES HAVE THE MOST COMBAT JETS?",
  unitLabel: "Active Fighter/Combat Aircraft",
  valueUnit: "aircraft",
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
  unitIcon: JET_ICON,
  events: {
    1950: "Korean War begins — jet fighters see their first major combat as MiG-15s clash with F-86 Sabres",
    1967: "Six-Day War — Israel's air force destroys Arab air fleets on the ground in a devastating surprise attack",
    1991: "Gulf War — coalition air power obliterates Iraq's air force in Operation Desert Storm",
    2022: "Russia invades Ukraine — both sides deploy fighter jets in Europe's largest air war since World War II",
  },
  sourceLabel: "Data: IISS Military Balance, FlightGlobal, historical estimates",
};
