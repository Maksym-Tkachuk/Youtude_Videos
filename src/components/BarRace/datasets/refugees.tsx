import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const PERSON_ICON = (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <circle cx="10" cy="5" r="3.5" fill="#ffffff" opacity="0.9" />
    <path d="M3 18 C3 13 6 10.5 10 10.5 C14 10.5 17 13 17 18" fill="#ffffff" opacity="0.9" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

// Refugee populations by country of origin (in thousands)
// Sources: UNHCR, World Bank
const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "afghanistan",              name: "Afghanistan",           color: "#ef4444" },
  { id: "syria",                    name: "Syria",                 color: "#f97316" },
  { id: "ukraine",                  name: "Ukraine",               color: "#3b82f6" },
  { id: "south_sudan",              name: "South Sudan",           color: "#22d3ee" },
  { id: "myanmar",                  name: "Myanmar",               color: "#a855f7" },
  { id: "somalia",                  name: "Somalia",               color: "#10b981" },
  { id: "congo",                    name: "DR Congo",              color: "#facc15" },
  { id: "sudan",                    name: "Sudan",                 color: "#fb923c" },
  { id: "iraq",                     name: "Iraq",                  color: "#f43f5e" },
  { id: "vietnam",                  name: "Vietnam",               color: "#eab308" },
  { id: "eritrea",                  name: "Eritrea",               color: "#34d399" },
  { id: "burundi",                  name: "Burundi",               color: "#818cf8" },
  { id: "central_african_republic", name: "Central African Rep.",  color: "#e879f9" },
  { id: "rwanda",                   name: "Rwanda",                color: "#06b6d4" },
  { id: "colombia",                 name: "Colombia",              color: "#fbbf24" },
  { id: "north_korea",              name: "North Korea",           color: "#991b1b" },
  { id: "palestine",                name: "Palestine",             color: "#84cc16" },
  { id: "pakistan",                  name: "Pakistan",              color: "#14b8a6" },
  { id: "iran",                     name: "Iran",                  color: "#d946ef" },
  { id: "ethiopia",                 name: "Ethiopia",              color: "#4ade80" },
  { id: "nigeria",                  name: "Nigeria",               color: "#60a5fa" },
  { id: "yemen",                    name: "Yemen",                 color: "#f87171" },
  { id: "libya",                    name: "Libya",                 color: "#67e8f9" },
  { id: "mali",                     name: "Mali",                  color: "#a3e635" },
  { id: "chad",                     name: "Chad",                  color: "#fde047" },
  { id: "bosnia",                   name: "Bosnia",                color: "#c084fc" },
  { id: "sri_lanka",                name: "Sri Lanka",             color: "#fb7185" },
  { id: "tibet",                    name: "Tibet",                 color: "#38bdf8" },
  { id: "cambodia",                 name: "Cambodia",              color: "#f9a8d4" },
  { id: "mozambique",               name: "Mozambique",            color: "#bef264" },
]);

const MILESTONES: Record<string, Record<number, number>> = {
  // Afghanistan: Soviet invasion 1979, civil war, Taliban, US invasion, Taliban return 2021
  afghanistan: series(
    [1960,0.1],[1970,0.1],[1975,50],[1979,400],[1980,1900],[1981,3800],[1983,4800],
    [1985,5100],[1987,5700],[1990,6220],[1992,4600],[1995,2680],[1997,2650],[2000,3580],
    [2002,3800],[2005,2100],[2007,2000],[2010,2800],[2013,2600],[2015,2700],[2018,2700],
    [2020,2600],[2021,2700],[2022,5700],[2023,6400],[2025,6900]
  ),
  // Syria: civil war erupts 2011
  syria: series(
    [1960,0.1],[1970,10],[1980,15],[1990,20],[2000,18],[2005,15],[2010,25],
    [2011,100],[2012,730],[2013,2470],[2014,3880],[2015,4900],[2016,5520],
    [2017,6300],[2018,6650],[2019,6600],[2020,6700],[2022,6600],[2023,6500],[2025,6200]
  ),
  // Ukraine: 2014 Crimea/Donbas, 2022 full-scale invasion
  ukraine: series(
    [1960,0.1],[1980,0.1],[1990,0.1],[2000,15],[2010,20],[2014,200],[2015,320],
    [2017,250],[2020,200],[2022,5900],[2023,6300],[2025,6500]
  ),
  // South Sudan: independence 2011, civil war 2013
  south_sudan: series(
    [1960,0.1],[1980,0.1],[1990,0.1],[2000,0.1],[2011,50],[2013,300],[2014,740],
    [2015,780],[2016,1440],[2017,2400],[2018,2280],[2020,2190],[2022,2340],[2025,2300]
  ),
  // Myanmar: Rohingya crisis 2017, coup 2021
  myanmar: series(
    [1960,0.1],[1970,10],[1980,80],[1985,120],[1990,200],[1995,280],[2000,270],
    [2005,190],[2010,150],[2015,420],[2017,900],[2018,1100],[2020,1100],
    [2022,1200],[2025,1300]
  ),
  // Somalia: civil war from 1988+
  somalia: series(
    [1960,0.1],[1970,5],[1978,30],[1980,100],[1985,40],[1988,400],[1990,650],
    [1992,870],[1995,530],[1998,450],[2000,400],[2005,390],[2008,550],
    [2010,770],[2012,1100],[2015,1120],[2018,950],[2020,810],[2022,810],[2025,850]
  ),
  // DR Congo: ongoing conflict since 1990s
  congo: series(
    [1960,0.1],[1970,10],[1980,15],[1990,30],[1993,400],[1996,540],[1998,350],
    [2000,370],[2003,450],[2005,430],[2008,370],[2010,470],[2013,500],[2015,540],
    [2017,620],[2020,810],[2022,920],[2025,1050]
  ),
  // Sudan: Darfur 2003, new civil war 2023
  sudan: series(
    [1960,0.1],[1970,30],[1975,50],[1980,200],[1985,400],[1990,480],[1995,520],
    [2000,500],[2003,520],[2005,690],[2007,520],[2010,390],[2015,600],[2018,690],
    [2020,780],[2022,840],[2023,1500],[2024,2800],[2025,3200]
  ),
  // Iraq: Gulf War, 2003 invasion, ISIS
  iraq: series(
    [1960,0.1],[1970,5],[1975,60],[1980,50],[1985,30],[1988,300],[1990,400],
    [1991,1200],[1993,700],[1995,600],[2000,530],[2003,360],[2005,500],
    [2007,2300],[2009,1800],[2012,750],[2014,400],[2015,380],[2018,310],
    [2020,300],[2022,290],[2025,280]
  ),
  // Vietnam: war refugees 1970s-80s, boat people
  vietnam: series(
    [1960,10],[1965,50],[1970,100],[1975,250],[1978,500],[1980,600],[1982,800],
    [1985,1000],[1987,1100],[1990,800],[1993,500],[1995,310],[2000,320],
    [2005,340],[2010,340],[2015,330],[2020,320],[2025,300]
  ),
  // Eritrea: war with Ethiopia
  eritrea: series(
    [1960,0.1],[1970,30],[1975,80],[1980,200],[1985,350],[1990,430],[1993,420],
    [1995,345],[2000,370],[2005,210],[2010,220],[2013,320],[2015,410],
    [2018,510],[2020,540],[2022,530],[2025,520]
  ),
  // Burundi: civil war 1993-2005, crisis 2015
  burundi: series(
    [1960,0.1],[1970,20],[1972,200],[1975,140],[1980,70],[1985,50],[1990,40],
    [1993,500],[1995,420],[1997,530],[2000,550],[2003,530],[2005,430],
    [2008,370],[2010,85],[2013,75],[2015,260],[2017,440],[2020,340],[2022,330],[2025,310]
  ),
  // Central African Republic
  central_african_republic: series(
    [1960,0.1],[1970,0.1],[1980,5],[1990,10],[2000,15],[2005,50],[2007,100],
    [2010,70],[2013,400],[2015,470],[2017,540],[2020,640],[2022,740],[2025,750]
  ),
  // Rwanda: genocide 1994
  rwanda: series(
    [1960,100],[1965,200],[1970,270],[1975,150],[1980,130],[1985,220],[1990,300],
    [1993,350],[1994,2200],[1995,1700],[1997,600],[2000,470],[2003,300],
    [2005,120],[2008,80],[2010,75],[2015,120],[2020,150],[2025,160]
  ),
  // Colombia: FARC conflict
  colombia: series(
    [1960,0.1],[1970,5],[1980,10],[1990,15],[1995,30],[2000,35],[2003,40],
    [2005,70],[2007,120],[2010,130],[2013,220],[2015,340],[2017,500],
    [2019,600],[2020,480],[2022,500],[2025,520]
  ),
  // North Korea: Korean War era, ongoing trickle
  north_korea: series(
    [1960,50],[1965,30],[1970,20],[1975,15],[1980,10],[1990,5],[2000,5],
    [2010,5],[2020,5],[2025,5]
  ),
  // Palestine: 1948, 1967, ongoing
  palestine: series(
    [1960,1050],[1965,1100],[1970,1200],[1975,1400],[1980,1700],[1985,2000],
    [1990,2300],[1995,2700],[2000,3100],[2005,3400],[2010,4200],[2015,5100],
    [2020,5700],[2023,5900],[2025,6000]
  ),
  // Pakistan: partition, small counts in later years
  pakistan: series(
    [1960,10],[1970,15],[1980,20],[1990,25],[2000,35],[2005,30],[2010,25],
    [2015,20],[2020,18],[2025,15]
  ),
  // Iran: revolution aftermath
  iran: series(
    [1960,0.1],[1975,5],[1978,10],[1979,30],[1980,100],[1983,200],[1985,250],
    [1990,280],[1995,200],[2000,120],[2005,80],[2010,60],[2015,50],
    [2020,40],[2025,35]
  ),
  // Ethiopia: Eritrean war, Tigray
  ethiopia: series(
    [1960,10],[1970,20],[1975,30],[1978,50],[1980,200],[1985,600],[1988,1000],
    [1990,850],[1993,450],[1995,250],[2000,100],[2005,80],[2010,80],
    [2015,95],[2018,120],[2020,100],[2022,110],[2025,120]
  ),
  // Nigeria: Boko Haram
  nigeria: series(
    [1960,0.1],[1970,5],[1980,10],[1990,15],[2000,10],[2005,20],[2010,20],
    [2013,100],[2015,200],[2017,240],[2020,350],[2022,380],[2025,400]
  ),
  // Yemen: civil war 2015+
  yemen: series(
    [1960,0.1],[1970,5],[1980,15],[1990,20],[2000,25],[2005,10],[2010,10],
    [2015,30],[2017,60],[2020,80],[2022,90],[2025,100]
  ),
  // Libya: post-Gaddafi chaos
  libya: series(
    [1960,0.1],[1970,0.1],[1980,0.1],[1990,3],[2000,5],[2010,5],[2011,50],
    [2013,20],[2015,15],[2020,12],[2025,10]
  ),
  // Mali: Tuareg rebellion, jihadist insurgency
  mali: series(
    [1960,0.1],[1970,5],[1980,10],[1990,50],[1995,30],[2000,15],[2005,10],
    [2012,200],[2015,140],[2018,120],[2020,140],[2022,100],[2025,120]
  ),
  // Chad
  chad: series(
    [1960,0.1],[1970,10],[1980,40],[1985,60],[1990,50],[1995,40],[2000,30],
    [2005,50],[2008,60],[2010,45],[2015,40],[2020,25],[2025,20]
  ),
  // Bosnia: Yugoslav wars
  bosnia: series(
    [1960,0.1],[1980,0.1],[1990,0.1],[1992,700],[1993,1100],[1995,1200],
    [1997,700],[2000,480],[2003,300],[2005,200],[2010,80],[2015,30],[2020,20],[2025,15]
  ),
  // Sri Lanka: Tamil Tigers conflict
  sri_lanka: series(
    [1960,0.1],[1970,0.1],[1980,10],[1983,60],[1985,110],[1990,180],
    [1995,200],[2000,180],[2005,150],[2009,130],[2010,140],[2015,120],
    [2020,90],[2025,70]
  ),
  // Tibet: Chinese annexation
  tibet: series(
    [1960,80],[1965,100],[1970,100],[1975,105],[1980,110],[1985,115],
    [1990,120],[1995,120],[2000,120],[2005,120],[2010,120],[2015,120],
    [2020,120],[2025,120]
  ),
  // Cambodia: Khmer Rouge era
  cambodia: series(
    [1960,0.1],[1970,30],[1975,200],[1979,600],[1980,360],[1985,300],
    [1990,320],[1993,80],[1995,30],[2000,15],[2005,10],[2010,8],[2015,8],[2025,5]
  ),
  // Mozambique: civil war 1977-1992
  mozambique: series(
    [1960,0.1],[1970,0.1],[1975,10],[1980,200],[1985,700],[1988,1300],
    [1990,1400],[1992,1700],[1993,1500],[1994,200],[1995,50],[2000,10],
    [2005,5],[2010,3],[2015,3],[2020,50],[2025,60]
  ),
};

function formatValue(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const REFUGEES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: Object.fromEntries(
    Object.entries(MILESTONES).map(([id, pts]) => [
      id,
      // convert thousands → actual people count
      Object.fromEntries(Object.entries(pts).map(([yr, v]) => [yr, v * 1000])),
    ]),
  ),
  title: "TOP 10 REFUGEE POPULATIONS",
  subtitle: "BY COUNTRY OF ORIGIN",
  unitLabel: "Refugees by Country of Origin",
  valueUnit: "people",
  startYear: 1960,
  endYear: 2025,
  topN: 10,
  minValue: 0.1,
  formatValue,
  formatValueFull,
  framesPerYear: 12,
  timelineInterval: 5,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: PERSON_ICON,
  events: {
    1979: "Soviet Union invades Afghanistan \u2014 millions flee to Pakistan and Iran",
    1994: "Rwandan genocide \u2014 over 2 million refugees flood into neighboring countries",
    2015: "Syrian refugee crisis peaks in Europe \u2014 over 1 million cross the Mediterranean",
    2022: "Russia invades Ukraine \u2014 6 million Ukrainians become refugees in weeks",
  },
  sourceLabel: "Data: UNHCR, World Bank",
};
