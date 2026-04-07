import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const ATOM_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    {/* orbit 1 — cyan */}
    <ellipse cx="5.5" cy="5.5" rx="4.5" ry="1.5" stroke="#00d4ff" strokeWidth="0.7" fill="none"/>
    {/* orbit 2 — cyan */}
    <ellipse cx="5.5" cy="5.5" rx="4.5" ry="1.5" stroke="#00d4ff" strokeWidth="0.7" fill="none" transform="rotate(60 5.5 5.5)"/>
    {/* orbit 3 — cyan */}
    <ellipse cx="5.5" cy="5.5" rx="4.5" ry="1.5" stroke="#00d4ff" strokeWidth="0.7" fill="none" transform="rotate(120 5.5 5.5)"/>
    {/* nucleus — bright yellow-white */}
    <circle cx="5.5" cy="5.5" r="1.3" fill="#ffe066"/>
  </svg>
);

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",         name: "United States",  color: "#3b82f6" },
  { id: "ussr",        name: "USSR",           color: "#991b1b" },
  { id: "russia",      name: "Russia",         color: "#ef4444" },
  { id: "uk",          name: "United Kingdom", color: "#e879f9" },
  { id: "france",      name: "France",         color: "#818cf8" },
  { id: "china",       name: "China",          color: "#f97316" },
  { id: "south_africa", name: "South Africa",  color: "#22c55e" },
  { id: "ukraine",     name: "Ukraine",        color: "#fbbf24" },
  { id: "kazakhstan",  name: "Kazakhstan",     color: "#38bdf8" },
  { id: "belarus",     name: "Belarus",        color: "#86efac" },
  { id: "india",       name: "India",          color: "#fbbf24" },
  { id: "pakistan",    name: "Pakistan",       color: "#4ade80" },
  { id: "israel",      name: "Israel",         color: "#06b6d4" },
  { id: "north_korea", name: "North Korea",    color: "#a855f7" },
]);

// Nuclear warheads in military stockpiles
const MILESTONES: Record<string, Record<number, number>> = {
  usa:         { 1945:6, 1947:13, 1948:50, 1950:299, 1952:832, 1955:2422, 1957:5543, 1960:18638, 1962:25540, 1965:31139, 1967:31255, 1970:26008, 1975:27519, 1980:24104, 1983:23305, 1985:23368, 1988:23205, 1990:21392, 1992:13708, 1993:11511, 1995:10904, 2000:10577, 2005:8360, 2010:5066, 2015:4571, 2017:3822, 2020:3750, 2021:3713, 2022:3768, 2023:3748, 2025:3700 },
  ussr:        { 1949:1, 1950:5, 1951:25, 1952:50, 1953:120, 1955:200, 1957:660, 1960:1605, 1962:3322, 1965:6129, 1967:8339, 1970:11643, 1973:15915, 1975:19055, 1978:25393, 1980:30062, 1983:35804, 1985:39197, 1986:45000, 1988:42000, 1990:37000, 1991:37000, 1992:0 },
  russia:      { 1992:0, 1993:30000, 1995:22000, 2000:10000, 2005:7200, 2007:5600, 2010:4600, 2015:4500, 2017:4300, 2020:4520, 2021:4500, 2022:4477, 2023:4489, 2024:4380, 2025:4309 },
  uk:          { 1952:1, 1953:5, 1955:10, 1958:22, 1960:30, 1963:200, 1965:310, 1968:280, 1970:280, 1975:350, 1980:350, 1985:300, 1990:300, 1995:300, 2000:200, 2005:200, 2010:225, 2015:215, 2020:195, 2025:225 },
  france:      { 1960:1, 1962:3, 1964:5, 1966:36, 1968:36, 1970:36, 1972:100, 1975:188, 1978:235, 1980:250, 1985:360, 1989:505, 1992:538, 1995:500, 1997:450, 2000:350, 2003:350, 2005:348, 2008:300, 2010:300, 2015:300, 2020:290, 2025:290 },
  china:       { 1964:1, 1965:5, 1966:20, 1967:25, 1969:50, 1970:75, 1972:130, 1975:185, 1977:200, 1980:280, 1983:350, 1985:425, 1988:430, 1990:430, 1993:435, 1995:400, 2000:400, 2005:400, 2010:250, 2015:260, 2018:290, 2020:320, 2021:350, 2024:500, 2025:600 },
  south_africa:{ 1979:1, 1985:6, 1989:6, 1990:4, 1991:0 },
  ukraine:     { 1991:1768, 1992:1700, 1993:1500, 1994:1200, 1995:500, 1996:0 },
  kazakhstan:  { 1991:1410, 1992:1360, 1993:1100, 1994:700, 1995:0 },
  belarus:     { 1991:81, 1992:81, 1993:50, 1994:18, 1995:0 },
  india:       { 1974:1, 1980:2, 1985:3, 1990:5, 1995:8, 1998:10, 2000:30, 2005:45, 2010:60, 2015:90, 2018:130, 2020:150, 2024:172, 2025:180 },
  pakistan:    { 1998:5, 1999:10, 2000:15, 2002:24, 2005:50, 2008:70, 2010:90, 2012:100, 2015:110, 2018:130, 2020:140, 2025:170 },
  israel:      { 1967:2, 1968:5, 1970:8, 1972:15, 1975:30, 1978:60, 1980:80, 1985:100, 1990:100, 1995:100, 2000:90, 2005:80, 2010:80, 2015:80, 2020:90, 2025:90 },
  north_korea: { 2006:1, 2007:2, 2008:4, 2009:6, 2010:8, 2012:10, 2014:12, 2015:15, 2017:25, 2019:35, 2020:40, 2022:50, 2025:50 },
};

function formatValue(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return Math.round(n).toString();
}

function formatValueFull(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export const NUCLEAR_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 NUCLEAR WARHEADS",
  subtitle: "ESTIMATED STOCKPILE",
  unitLabel: "Estimated Nuclear Warheads in Military Stockpiles",
  valueUnit: "warheads",
  startYear: 1945,
  endYear: 2025,
  topN: 10,
  minValue: 1,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  skipEmptyStartFrames: false,
  timelineInterval: 10,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: ATOM_ICON,
  events: { 1949: "Soviet Union tests its first atomic bomb — Cold War arms race begins", 1962: "Cuban Missile Crisis — the world comes within hours of nuclear war", 1986: "Nuclear warheads peak at 70,000+ — humanity's most dangerous moment" },
  sourceLabel: "Data: U.S. DOE + FAS Nuclear Notebook + NTI historical transfer/disarmament estimates",
};
