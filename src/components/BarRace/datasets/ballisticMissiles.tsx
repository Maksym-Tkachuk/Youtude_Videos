import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const MISSILE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    {/* missile body */}
    <path d="M5.5 1 L6.5 3.5 L6.5 7.5 L7.5 9 L7.5 10 L5.5 9 L3.5 10 L3.5 9 L4.5 7.5 L4.5 3.5 Z" fill="#cc3333" stroke="#e05030" strokeWidth="0.5" strokeLinejoin="round" />
    {/* nosecone */}
    <path d="M5.5 0.5 L6.2 2.5 L4.8 2.5 Z" fill="#e05030" stroke="#e05030" strokeWidth="0.3" />
    {/* fins */}
    <path d="M4.5 7.5 L3 9.5 L3.5 9 Z" fill="#cc3333" stroke="#e05030" strokeWidth="0.3" />
    <path d="M6.5 7.5 L8 9.5 L7.5 9 Z" fill="#cc3333" stroke="#e05030" strokeWidth="0.3" />
    {/* exhaust glow */}
    <ellipse cx="5.5" cy="10.2" rx="1" ry="0.5" fill="#ff6633" opacity="0.6" />
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
  { id: "uk",           name: "United Kingdom", color: "#e879f9" },
  { id: "france",       name: "France",         color: "#818cf8" },
  { id: "india",        name: "India",          color: "#22d3ee" },
  { id: "pakistan",      name: "Pakistan",       color: "#a78bfa" },
  { id: "north_korea",  name: "North Korea",    color: "#f43f5e" },
  { id: "israel",       name: "Israel",         color: "#38bdf8" },
  { id: "iran",         name: "Iran",           color: "#10b981" },
  { id: "south_korea",  name: "South Korea",    color: "#06b6d4" },
  { id: "saudi_arabia", name: "Saudi Arabia",   color: "#a3e635" },
  { id: "japan",        name: "Japan",          color: "#c084fc" },
  { id: "germany",      name: "Germany",        color: "#eab308" },
  { id: "italy",        name: "Italy",          color: "#4ade80" },
  { id: "turkey",       name: "Turkey",         color: "#fb923c" },
  { id: "egypt",        name: "Egypt",          color: "#fde047" },
  { id: "taiwan",       name: "Taiwan",         color: "#67e8f9" },
  { id: "brazil",       name: "Brazil",         color: "#34d399" },
  { id: "australia",    name: "Australia",       color: "#fbbf24" },
  { id: "poland",       name: "Poland",         color: "#ff6b6b" },
  { id: "ukraine",      name: "Ukraine",        color: "#facc15" },
  { id: "iraq",         name: "Iraq",           color: "#f87171" },
  { id: "syria",        name: "Syria",          color: "#cc3333" },
  { id: "south_africa", name: "South Africa",   color: "#84cc16" },
  { id: "argentina",    name: "Argentina",      color: "#2dd4bf" },
  { id: "indonesia",    name: "Indonesia",      color: "#d946ef" },
  { id: "vietnam",      name: "Vietnam",        color: "#14b8a6" },
  { id: "algeria",      name: "Algeria",        color: "#a855f7" },
  { id: "sweden",       name: "Sweden",         color: "#fdba74" },
]);

// Deployed ballistic missiles (ICBMs + SLBMs + IRBMs) by country
const MILESTONES: Record<string, Record<number, number>> = {
  // USA: Atlas/Titan ICBMs from 1959, Minuteman buildup 1962-67, Polaris/Poseidon SLBMs
  // Peak ~2,200 total delivery vehicles early 1970s, SALT/START reductions
  usa: series(
    [1957, 0.1], [1959, 12], [1960, 60], [1961, 130], [1962, 294],
    [1963, 600], [1964, 950], [1965, 1200], [1966, 1500], [1967, 1710],
    [1968, 1710], [1970, 1910], [1972, 2100], [1975, 2154], [1978, 2154],
    [1980, 2100], [1982, 2032], [1985, 2020], [1987, 1980], [1990, 1875],
    [1992, 1600], [1994, 1380], [1996, 1200], [1998, 1050], [2000, 950],
    [2002, 900], [2005, 830], [2008, 780], [2010, 750], [2012, 720],
    [2015, 700], [2018, 690], [2020, 685], [2022, 680], [2025, 680]
  ),
  // USSR: R-7/SS-6 first ICBM 1957, very slow early buildup, massive expansion 1965-1980
  // SS-9, SS-11, SS-18 ICBMs; SS-N-6, SS-N-8, SS-N-18 SLBMs
  ussr: series(
    [1957, 0.1], [1959, 4], [1960, 12], [1961, 20], [1962, 36],
    [1963, 56], [1964, 80], [1965, 200], [1966, 340], [1967, 530],
    [1968, 800], [1969, 1050], [1970, 1350], [1971, 1600], [1972, 1900],
    [1973, 2100], [1974, 2260], [1975, 2400], [1976, 2480], [1977, 2540],
    [1978, 2580], [1979, 2620], [1980, 2660], [1981, 2700], [1982, 2750],
    [1983, 2780], [1984, 2800], [1985, 2810], [1986, 2790], [1987, 2750],
    [1988, 2680], [1989, 2600], [1990, 2500], [1991, 2400], [1992, 0]
  ),
  // Russia: inherits bulk of Soviet arsenal, progressive reductions under START treaties
  // Topol-M, Yars, Bulava replacements slower than retirements
  russia: series(
    [1992, 0], [1993, 1400], [1994, 1350], [1995, 1280], [1996, 1200],
    [1997, 1130], [1998, 1070], [1999, 1020], [2000, 980], [2002, 900],
    [2004, 840], [2006, 780], [2008, 730], [2010, 680], [2012, 640],
    [2014, 600], [2016, 570], [2018, 550], [2020, 540], [2022, 530],
    [2025, 520]
  ),
  // China: DF-2 IRBM 1966, DF-3 1971, DF-5 ICBM 1981, JL-1 SLBM 1988
  // Very slow buildup for decades, then massive expansion from ~2015 with DF-41, JL-3, silo fields
  china: series(
    [1966, 2], [1968, 6], [1970, 12], [1972, 20], [1974, 30],
    [1975, 36], [1978, 45], [1980, 50], [1982, 55], [1984, 60],
    [1986, 70], [1988, 80], [1990, 85], [1992, 90], [1994, 95],
    [1996, 100], [1998, 106], [2000, 110], [2002, 115], [2004, 120],
    [2006, 130], [2008, 140], [2010, 155], [2012, 170], [2014, 190],
    [2016, 220], [2018, 270], [2020, 320], [2021, 360], [2022, 400],
    [2023, 450], [2024, 480], [2025, 520]
  ),
  // UK: Polaris A3 SLBMs from 1968 (4 SSBNs x 16 = 64), Trident D5 from 1994
  // Reduced to 3 operational boats, ~48 deployed missiles
  uk: series(
    [1968, 64], [1970, 64], [1975, 64], [1980, 64], [1985, 64],
    [1990, 64], [1994, 58], [1996, 48], [1998, 48], [2000, 48],
    [2005, 48], [2010, 48], [2015, 48], [2020, 48], [2025, 48]
  ),
  // France: SSBS S2/S3 IRBMs (18 on Plateau d'Albion, 1971-1996) + M1/M4/M45/M51 SLBMs
  // Peak ~110 (18 IRBMs + 96 SLBMs), retired land missiles 1996, now ~48 SLBMs
  france: series(
    [1971, 18], [1972, 34], [1973, 50], [1974, 66], [1975, 82],
    [1977, 96], [1978, 98], [1980, 98], [1982, 110], [1985, 110],
    [1988, 110], [1990, 110], [1992, 110], [1994, 110], [1996, 64],
    [1998, 64], [2000, 64], [2005, 64], [2010, 48], [2015, 48],
    [2020, 48], [2025, 48]
  ),
  // India: Prithvi SRBM 1988, Agni-I IRBM 1989 test, Agni-II 1999, Agni-III 2006, Agni-V 2012
  // K-15/K-4 SLBMs on Arihant class from 2018
  india: series(
    [1989, 0.1], [1992, 4], [1995, 8], [1998, 12], [2000, 16],
    [2002, 20], [2004, 24], [2006, 30], [2008, 36], [2010, 44],
    [2012, 52], [2014, 58], [2016, 64], [2018, 72], [2020, 80],
    [2022, 90], [2025, 100]
  ),
  // Pakistan: Ghauri (Hatf-5) IRBM 1998, Shaheen-I 1999, Shaheen-II 2004, Shaheen-III 2015
  // Babur/Ababeel additions, rapid buildup for deterrence vs India
  pakistan: series(
    [1998, 6], [1999, 10], [2000, 14], [2002, 18], [2004, 22],
    [2006, 26], [2008, 30], [2010, 34], [2012, 38], [2014, 42],
    [2016, 46], [2018, 50], [2020, 54], [2022, 56], [2025, 60]
  ),
  // North Korea: Nodong IRBM operational ~1993, Musudan 2007, Hwasong-14/15 ICBMs 2017
  // Hwasong-17/18 solid-fuel ICBMs 2022-23
  north_korea: series(
    [1993, 4], [1995, 8], [1997, 10], [1999, 12], [2001, 14],
    [2003, 16], [2005, 18], [2007, 20], [2009, 22], [2011, 24],
    [2013, 26], [2015, 28], [2017, 30], [2019, 34], [2021, 38],
    [2023, 44], [2025, 50]
  ),
  // Israel: Jericho-I IRBM from 1973, Jericho-II from 1990, Jericho-III ICBM from 2008
  // Estimated 25-50 deployed, opaque program
  israel: series(
    [1973, 12], [1975, 16], [1978, 20], [1980, 24], [1983, 28],
    [1985, 30], [1988, 34], [1990, 38], [1993, 40], [1995, 42],
    [1998, 44], [2000, 44], [2005, 46], [2008, 48], [2010, 48],
    [2015, 50], [2020, 50], [2025, 50]
  ),
  // Iran: Shahab-3 IRBM operational 2003, Ghadr-1 2007, Sejjil solid-fuel 2009
  // Khorramshahr 2017, Kheibar Shekan 2022
  iran: series(
    [2003, 6], [2005, 10], [2007, 14], [2009, 18], [2011, 22],
    [2013, 24], [2015, 26], [2017, 28], [2019, 30], [2021, 34],
    [2023, 36], [2025, 40]
  ),
  // South Korea: Hyunmoo-2 SRBM/IRBM from 2012, Hyunmoo-4 (800km) from 2020
  // Rapidly expanding after 2017 missile guideline removal
  south_korea: series(
    [2012, 6], [2014, 10], [2016, 14], [2018, 20], [2020, 28],
    [2022, 34], [2025, 40]
  ),
  // Saudi Arabia: CSS-2 (DF-3A) IRBMs purchased from China in 1987 (~36)
  // DF-21 (CSS-5) reportedly acquired ~2007 (~30-60)
  saudi_arabia: series(
    [1987, 36], [1990, 36], [1995, 36], [2000, 36], [2005, 36],
    [2007, 50], [2010, 56], [2015, 58], [2020, 60], [2025, 60]
  ),
  // Iraq: Scud-B from USSR 1974, Al-Hussein/Al-Abbas extended range variants 1987-88
  // Peak ~200 at 1990 invasion of Kuwait, destroyed after Gulf War, final removal 2003
  iraq: series(
    [1974, 12], [1976, 24], [1978, 36], [1980, 48], [1982, 72],
    [1984, 100], [1986, 130], [1988, 180], [1990, 200], [1991, 80],
    [1993, 50], [1995, 30], [1998, 20], [2000, 12], [2003, 0]
  ),
  // Syria: Scud-B from USSR 1973, Scud-C from DPRK 1991, Scud-D 2000s
  // Used extensively in civil war; much of stockpile depleted
  syria: series(
    [1973, 12], [1975, 18], [1978, 24], [1980, 30], [1982, 36],
    [1985, 50], [1988, 60], [1990, 70], [1992, 80], [1995, 90],
    [1998, 100], [2000, 110], [2003, 120], [2005, 120], [2008, 120],
    [2010, 110], [2012, 100], [2014, 60], [2016, 40], [2018, 25],
    [2020, 15], [2025, 10]
  ),
  // Egypt: Scud-B from USSR mid-1970s, Project-T (Scud-C copies) 1990s
  // Limited stockpile, not significantly expanded
  egypt: series(
    [1975, 12], [1978, 20], [1980, 24], [1985, 30], [1988, 36],
    [1990, 40], [1993, 50], [1996, 60], [2000, 70], [2005, 70],
    [2010, 70], [2015, 70], [2020, 70], [2025, 70]
  ),
  // Ukraine: inherited Soviet tactical missiles, gave up strategic weapons;
  // Developed Hrim-2 (Sapsan) from 2018
  ukraine: series(
    [2018, 4], [2020, 6], [2022, 8], [2025, 12]
  ),
  // South Africa: RSA-3 space launcher had potential IRBM capability; Arniston missile program 1980s
  // Dismantled by 1991 alongside nuclear program
  south_africa: series(
    [1985, 4], [1988, 6], [1989, 6], [1991, 0]
  ),
  // Algeria: Scud-B from USSR, limited numbers
  algeria: series(
    [1979, 6], [1985, 12], [1990, 16], [1995, 18], [2000, 18],
    [2005, 18], [2010, 18], [2015, 18], [2020, 18], [2025, 18]
  ),
  // Vietnam: Scud-B from USSR 1979
  vietnam: series(
    [1979, 4], [1982, 8], [1985, 12], [1990, 12], [1995, 12],
    [2000, 12], [2005, 12], [2010, 12], [2015, 12], [2020, 12],
    [2025, 12]
  ),
  // Argentina: Condor-II IRBM program (jointly with Egypt/Iraq) 1980s, cancelled 1993
  argentina: series(
    [1985, 0.1], [1988, 2], [1990, 4], [1993, 0]
  ),
  // Taiwan: Hsiung Feng IIE cruise missile (not ballistic); Sky Bow related programs
  // Limited indigenous ballistic missile capability
  taiwan: series(
    [2010, 4], [2015, 8], [2018, 12], [2020, 16], [2022, 20],
    [2025, 24]
  ),
  // Turkey: Developing domestic Bora/Tayfun SRBMs; no deployed IRBMs/ICBMs yet
  turkey: series(
    [2018, 4], [2020, 8], [2022, 12], [2025, 18]
  ),
};

function formatValue(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const BALLISTIC_MISSILES_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 BALLISTIC MISSILE ARSENALS",
  subtitle: "WHO CAN STRIKE ANYWHERE ON EARTH?",
  unitLabel: "Deployed Ballistic Missiles (ICBMs + SLBMs + IRBMs)",
  valueUnit: "missiles",
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
  unitIcon: MISSILE_ICON,
  events: {
    1962: "Cuban Missile Crisis — the world comes closer to nuclear war than ever before as Soviet missiles are placed in Cuba",
    1979: "SALT II signed — the US and USSR agree to limit strategic nuclear delivery vehicles for the first time",
    2002: "The United States withdraws from the ABM Treaty — a new era of missile defense and offensive buildup begins",
    2023: "China's missile silo fields revealed — satellite imagery shows hundreds of new ICBM silos under construction",
  },
  sourceLabel: "Data: SIPRI, Arms Control Association, FAS Nuclear Notebook, national defense reports",
};
