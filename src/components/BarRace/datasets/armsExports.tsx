import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const MISSILE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))" }}>
    <path d="M5.5 1.5 L7 4.5 L7 8 L5.5 9 L4 8 L4 4.5 Z" fill="#0f2a1a" stroke="#7af0c5" strokeWidth="0.7" strokeLinejoin="round" />
    <path d="M5.5 1.5 L4 4.5 L7 4.5 Z" fill="#7af0c5" opacity="0.55" />
    <path d="M4 7.5 L2.5 9.5 L4 8.3" fill="none" stroke="#7af0c5" strokeWidth="0.7" strokeLinejoin="round" />
    <path d="M7 7.5 L8.5 9.5 L7 8.3" fill="none" stroke="#7af0c5" strokeWidth="0.7" strokeLinejoin="round" />
    <path d="M4.8 9 L5.5 10.5 L6.2 9" stroke="#ff8c00" strokeWidth="0.85" strokeLinecap="round" fill="none" />
  </svg>
);

function series(...points: Array<[number, number]>) {
  return Object.fromEntries(points) as Record<number, number>;
}

// Annual arms exports in USD billions (nominal, approximate)
const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",         name: "United States",  color: "#3b82f6" },
  { id: "ussr",        name: "USSR",           color: "#ef4444" },
  { id: "russia",      name: "Russia",         color: "#f87171" },
  { id: "france",      name: "France",         color: "#818cf8" },
  { id: "uk",          name: "United Kingdom", color: "#e879f9" },
  { id: "germany",     name: "Germany",        color: "#eab308" },
  { id: "china",       name: "China",          color: "#f97316" },
  { id: "israel",      name: "Israel",         color: "#38bdf8" },
  { id: "italy",       name: "Italy",          color: "#34d399" },
  { id: "netherlands", name: "Netherlands",    color: "#7dd3fc" },
  { id: "sweden",      name: "Sweden",         color: "#fde047" },
  { id: "south_korea", name: "South Korea",    color: "#06b6d4" },
  { id: "spain",       name: "Spain",          color: "#f9a8d4" },
  { id: "canada",      name: "Canada",         color: "#c084fc" },
  { id: "ukraine",     name: "Ukraine",        color: "#facc15" },
]);

const MILESTONES: Record<string, Record<number, number>> = {
  // USA: tiny before WWI, surges as Allied supplier 1915-18, WWII Lend-Lease peaks at $14B
  usa:         series(
    [1900,0.05],[1910,0.07],[1913,0.1],
    [1914,0.2],[1915,0.8],[1916,1.5],[1917,2.5],[1918,3.0],
    [1919,0.5],[1920,0.2],[1925,0.15],[1930,0.1],[1935,0.1],[1938,0.15],[1939,0.3],
    [1940,1.5],[1941,4.0],[1942,9.0],[1943,13.0],[1944,14.0],[1945,10.0],
    [1946,3.0],[1948,1.5],[1950,1.5],[1952,2.0],[1955,2.2],[1960,2.5],
    [1965,3.5],[1968,5.5],[1970,5.0],[1973,8.0],[1975,10.0],[1978,12.0],[1980,13.0],
    [1982,15.0],[1985,15.5],[1988,13.0],[1990,15.0],[1993,14.0],[1995,14.0],
    [1998,12.0],[2000,12.0],[2003,16.0],[2005,18.0],[2008,22.0],[2010,21.0],
    [2012,28.0],[2015,28.0],[2017,34.0],[2018,36.0],[2020,37.0],[2022,47.0],[2024,60.0],[2025,62.0]
  ),
  // USSR: starts exporting in 1930s (Spanish Civil War, China), drops to 0 with collapse
  ussr:        series(
    [1930,0.05],[1933,0.1],[1936,0.3],[1938,0.25],[1940,0.2],
    [1943,0.15],[1945,0.2],[1948,0.3],[1950,0.5],[1953,0.8],[1955,1.0],
    [1960,1.5],[1962,2.0],[1965,3.0],[1968,4.5],[1970,5.0],[1973,7.0],
    [1975,10.0],[1978,14.0],[1980,18.0],[1982,20.0],[1985,22.0],[1987,20.0],
    [1989,18.0],[1990,15.0],[1991,10.0],[1992,0]
  ),
  // Russia: inherits Soviet industry, rebuilds, then sanctions hit post-2022
  russia:      series(
    [1992,0],[1993,2.0],[1995,3.0],[1997,3.5],[2000,4.5],[2003,6.0],
    [2005,7.0],[2008,9.0],[2010,10.0],[2012,12.5],[2014,13.0],[2015,15.0],
    [2017,12.0],[2018,11.0],[2020,9.0],[2022,6.0],[2024,5.0],[2025,5.0]
  ),
  // UK: dominant Edwardian arms exporter (Vickers/Armstrong navies), WWII net importer, Cold War recovery
  uk:          series(
    [1900,0.4],[1905,0.5],[1910,0.6],[1913,0.7],
    [1914,0.4],[1916,0.6],[1918,0.8],
    [1920,0.4],[1925,0.4],[1930,0.35],[1935,0.4],[1938,0.35],[1940,0.2],[1945,0.3],
    [1950,0.5],[1955,0.6],[1960,0.8],
    [1965,1.2],[1968,1.5],[1970,1.5],[1975,2.5],[1978,3.5],[1980,4.0],
    [1983,4.5],[1985,4.5],[1988,4.0],[1990,4.5],[1993,4.0],[1995,4.0],
    [2000,4.5],[2003,5.5],[2005,6.0],[2008,6.5],[2010,7.0],[2013,7.5],
    [2015,8.0],[2018,9.0],[2020,9.0],[2022,11.0],[2025,12.0]
  ),
  // France: Schneider-Creusot pre-WWI, Vichy collapse, postwar steady exporter
  france:      series(
    [1900,0.2],[1905,0.25],[1910,0.3],[1913,0.4],
    [1914,0.15],[1917,0.25],[1918,0.3],
    [1920,0.2],[1925,0.25],[1930,0.25],[1935,0.2],[1938,0.15],[1940,0.05],[1945,0.1],
    [1950,0.2],[1955,0.25],[1960,0.4],
    [1965,0.8],[1968,1.2],[1970,1.5],[1973,2.5],[1975,3.0],[1978,4.5],[1980,5.5],
    [1982,6.0],[1985,5.5],[1988,5.0],[1990,4.5],[1993,4.0],[1995,4.0],[1998,3.5],
    [2000,4.0],[2003,4.5],[2005,5.0],[2008,6.0],[2010,5.5],[2013,7.0],
    [2015,8.0],[2017,7.5],[2020,7.0],[2022,8.0],[2025,9.5]
  ),
  // Germany: Krupp dominated pre-WWI, drops post-WWII, Cold War West Germany rebuilds
  germany:     series(
    [1900,0.3],[1905,0.45],[1910,0.55],[1912,0.7],[1913,0.8],
    [1914,0.2],[1918,0.05],
    [1920,0.05],[1925,0.08],[1930,0.1],[1933,0.1],[1935,0.25],[1937,0.5],[1938,0.7],[1939,0.6],
    [1940,0.2],[1943,0.1],[1945,0],[1950,0.02],[1955,0.05],
    [1960,0.2],[1965,0.5],[1968,0.8],[1970,1.0],[1975,2.0],[1978,2.8],[1980,3.5],
    [1983,4.0],[1985,4.0],[1988,3.5],[1990,4.0],[1993,3.0],[1995,3.0],
    [2000,3.5],[2003,4.0],[2005,4.0],[2008,4.5],[2010,4.5],[2013,5.5],
    [2015,5.0],[2018,6.0],[2020,4.0],[2022,5.5],[2025,7.0]
  ),
  // Canada: WWII arsenal of democracy moment, then steady NATO supplier
  canada:      series(
    [1900,0.01],[1910,0.02],[1914,0.05],[1916,0.3],[1917,0.5],[1918,0.6],
    [1920,0.05],[1930,0.03],[1938,0.04],
    [1940,0.3],[1942,1.0],[1943,1.3],[1944,1.5],[1945,1.2],
    [1946,0.3],[1950,0.15],[1955,0.18],[1960,0.2],
    [1965,2.5],[1968,1.5],[1970,1.0],[1975,0.8],[1978,1.0],[1980,1.0],
    [1983,1.5],[1985,1.5],[1988,1.5],[1990,1.5],[1993,1.0],[1995,1.0],
    [2000,1.5],[2003,2.0],[2005,2.0],[2008,2.0],[2010,2.0],[2013,2.5],
    [2015,2.5],[2018,3.0],[2020,3.0],[2022,3.5],[2025,4.0]
  ),
  // Italy: Ansaldo / Breda pre-WWII, postwar rebuilds
  italy:       series(
    [1900,0.05],[1910,0.08],[1920,0.08],[1930,0.15],[1935,0.2],[1938,0.3],
    [1940,0.15],[1945,0.02],[1950,0.04],[1955,0.07],
    [1960,0.1],[1965,0.2],[1970,0.3],[1973,0.5],[1975,0.5],[1978,0.8],[1980,1.0],
    [1983,1.5],[1985,1.5],[1988,1.5],[1990,1.5],[1993,1.0],[1995,1.0],
    [2000,1.0],[2003,2.0],[2005,2.0],[2008,2.5],[2010,3.0],[2013,3.5],
    [2015,3.5],[2018,4.5],[2020,4.5],[2022,5.0],[2025,5.0]
  ),
  // Sweden: Bofors guns supplied both sides in WWII, consistent Cold War exporter
  sweden:      series(
    [1900,0.04],[1910,0.06],[1920,0.07],[1930,0.08],[1935,0.1],[1938,0.12],
    [1940,0.1],[1945,0.08],[1950,0.08],[1955,0.09],
    [1960,0.1],[1965,0.15],[1970,0.3],[1975,0.5],[1978,0.8],[1980,1.0],
    [1983,1.2],[1985,1.5],[1988,1.5],[1990,1.5],[1993,1.0],[1995,1.0],
    [2000,1.5],[2003,1.5],[2005,1.5],[2008,1.5],[2010,1.5],[2013,1.5],
    [2015,1.5],[2018,1.8],[2020,1.5],[2022,2.0],[2025,2.5]
  ),
  // Netherlands: Fokker aircraft, Dutch colonial industry; postwar Philips/CASA arms
  netherlands: series(
    [1900,0.04],[1910,0.05],[1920,0.05],[1930,0.05],[1935,0.06],[1938,0.06],
    [1940,0.02],[1945,0.02],[1950,0.04],[1955,0.06],
    [1960,0.1],[1965,0.2],[1970,0.3],[1975,0.6],[1978,1.0],[1980,1.0],
    [1983,1.5],[1985,1.5],[1988,1.5],[1990,1.0],[1993,1.0],[1995,1.0],
    [2000,1.5],[2003,2.0],[2005,2.0],[2008,2.0],[2010,2.0],[2013,2.5],
    [2015,2.5],[2018,2.0],[2020,2.0],[2022,2.5],[2025,3.0]
  ),
  // China: marginal pre-1980, rises with developing-world client base
  china:       series(
    [1950,0.05],[1955,0.1],
    [1960,0.3],[1965,0.5],[1968,0.7],[1970,0.8],[1973,1.0],[1975,1.0],
    [1978,1.2],[1980,1.5],[1983,2.0],[1985,2.5],[1987,3.0],[1990,2.0],
    [1993,1.5],[1995,1.5],[1998,1.2],[2000,1.5],[2003,2.0],[2005,2.0],
    [2008,2.5],[2010,3.0],[2013,4.5],[2015,5.5],[2018,7.0],[2020,7.0],[2022,8.5],[2025,9.5]
  ),
  // Israel: starts exporting post-1967 war, now top-5 exporter
  israel:      series(
    [1970,0.1],[1973,0.3],[1975,0.5],[1978,0.8],[1980,0.8],[1983,1.2],
    [1985,1.5],[1988,1.5],[1990,1.2],[1993,2.0],[1995,2.0],[1998,2.5],
    [2000,2.5],[2003,3.0],[2005,3.5],[2008,4.5],[2010,5.0],[2013,6.0],
    [2015,6.0],[2018,8.0],[2020,8.0],[2022,9.0],[2025,10.0]
  ),
  // South Korea: emerges as major exporter from 2010s — K-defense boom
  south_korea: series(
    [1980,0.05],[1983,0.1],[1985,0.2],[1988,0.3],[1990,0.5],[1993,0.8],[1995,1.0],
    [1998,1.0],[2000,1.0],[2003,1.2],[2005,1.5],[2008,2.0],[2010,2.0],
    [2013,3.0],[2015,3.5],[2018,5.0],[2020,5.0],[2022,6.0],[2025,7.0]
  ),
  // Spain: post-Franco military industry grows in NATO era
  spain:       series(
    [1975,0.1],[1978,0.2],[1980,0.3],[1983,0.5],[1985,0.5],[1988,0.8],[1990,1.0],
    [1993,0.8],[1995,0.8],[2000,1.0],[2003,1.5],[2005,1.5],[2008,1.5],[2010,1.5],
    [2013,2.0],[2015,2.0],[2018,2.5],[2020,2.5],[2022,3.0],[2025,3.0]
  ),
  // Ukraine: inherits Soviet factory capacity, collapses post-2014
  ukraine:     series(
    [1992,0],[1993,0.5],[1995,0.8],[1997,0.6],[2000,0.5],[2003,0.7],[2005,0.8],
    [2008,1.0],[2010,1.0],[2013,1.5],[2015,0.5],[2018,0.4],[2020,0.3],[2022,0.1],[2025,0.1]
  ),
};

function formatValue(n: number): string {
  if (n >= 10) return `$${Math.round(n)}B`;
  return `$${n.toFixed(1)}B`;
}

function formatValueFull(n: number): string {
  return `$${Math.round(n * 1_000_000_000).toLocaleString("en-US")}`;
}

export const ARMS_EXPORTS_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 ARMS EXPORTERS",
  subtitle: "WHO SELLS THE MOST WEAPONS?",
  unitLabel: "Annual Arms Exports (USD billions)",
  valueUnit: "USD",
  startYear: 1900,
  endYear: 2025,
  topN: 10,
  minValue: 0.03,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 10,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: MISSILE_ICON,
  events: {
    1914: "WWI breaks out — Britain and France become the Allies' arsenals, US neutrality allows selling to both sides",
    1941: "USA enters WWII and launches Lend-Lease — $50 billion in weapons floods Allied forces over four years",
    1973: "Arab-Israeli War triggers a global arms race — US and USSR compete to rearm their proxy clients worldwide",
    2022: "Russia invades Ukraine — the US floods NATO allies with weapons, cementing its dominance of the global arms trade",
  },
  sourceLabel: "Data: SIPRI Arms Transfers Database + historical market estimates (pre-1950)",
};
