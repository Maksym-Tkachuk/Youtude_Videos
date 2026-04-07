import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const COIN_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    {/* coin body — gold */}
    <circle cx="5.5" cy="5.5" r="4.5" fill="#f5c518"/>
    {/* coin rim */}
    <circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke="#b8860b" strokeWidth="0.7"/>
    {/* inner ring */}
    <circle cx="5.5" cy="5.5" r="3.3" fill="none" stroke="#b8860b" strokeWidth="0.4"/>
    {/* $ sign */}
    <text x="5.5" y="8.1" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#7a5c00" fontFamily="serif">$</text>
  </svg>
);

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",         name: "United States",  color: "#3b82f6" },
  { id: "china",       name: "China",          color: "#ef4444" },
  { id: "japan",       name: "Japan",          color: "#fb7185" },
  { id: "germany",     name: "Germany",        color: "#eab308" },
  { id: "uk",          name: "United Kingdom", color: "#e879f9" },
  { id: "france",      name: "France",         color: "#818cf8" },
  { id: "india",       name: "India",          color: "#f97316" },
  { id: "italy",       name: "Italy",          color: "#22d3ee" },
  { id: "canada",      name: "Canada",         color: "#f43f5e" },
  { id: "south_korea", name: "South Korea",    color: "#06b6d4" },
  { id: "ussr",        name: "USSR",           color: "#991b1b" },
  { id: "russia",      name: "Russia",         color: "#cc3333" },
  { id: "brazil",      name: "Brazil",         color: "#34d399" },
  { id: "australia",   name: "Australia",      color: "#fbbf24" },
  { id: "spain",       name: "Spain",          color: "#a78bfa" },
  { id: "mexico",      name: "Mexico",         color: "#4ade80" },
]);

// GDP in billions USD (nominal)
const MILESTONES: Record<string, Record<number, number>> = {
  usa:         { 1960:543, 1965:743, 1970:1073, 1975:1686, 1980:2857, 1985:4347, 1990:5963, 1995:7640, 2000:10285, 2005:13094, 2008:14719, 2010:14964, 2015:18120, 2018:20544, 2020:20894, 2022:25464, 2025:27360 },
  china:       { 1960:60, 1965:70, 1970:92, 1975:163, 1980:305, 1985:309, 1990:356, 1995:728, 2000:1211, 2005:2257, 2010:6101, 2015:11062, 2018:13890, 2020:14688, 2022:17963, 2025:18500 },
  japan:       { 1960:43, 1965:91, 1970:203, 1975:498, 1980:1100, 1985:1397, 1990:3132, 1995:5547, 2000:4731, 2005:4755, 2010:5759, 2015:4386, 2018:4971, 2020:5040, 2022:4231, 2025:4200 },
  germany:     { 1960:73, 1965:113, 1970:208, 1975:476, 1980:826, 1985:735, 1990:1595, 1995:2523, 2000:1950, 2005:2861, 2010:3423, 2015:3381, 2018:3997, 2020:3889, 2022:4074, 2025:4200 },
  uk:          { 1960:73, 1965:101, 1970:127, 1975:233, 1980:557, 1985:476, 1990:1037, 1995:1175, 2000:1479, 2005:2283, 2010:2416, 2015:2896, 2018:2856, 2020:2707, 2022:3131, 2025:3250 },
  france:      { 1960:60, 1965:90, 1970:142, 1975:353, 1980:700, 1985:566, 1990:1256, 1995:1572, 2000:1330, 2005:2139, 2010:2647, 2015:2439, 2018:2791, 2020:2637, 2022:2782, 2025:2900 },
  india:       { 1960:37, 1965:60, 1970:64, 1975:97, 1980:186, 1985:236, 1990:321, 1995:360, 2000:476, 2005:820, 2010:1656, 2015:2088, 2018:2702, 2020:2671, 2022:3385, 2025:3700 },
  italy:       { 1960:40, 1965:65, 1970:107, 1975:277, 1980:477, 1985:432, 1990:1169, 1995:1173, 2000:1098, 2005:1789, 2010:2137, 2015:1838, 2018:2090, 2020:1889, 2022:2010, 2025:2100 },
  canada:      { 1960:41, 1965:54, 1970:85, 1975:177, 1980:274, 1985:356, 1990:595, 1995:604, 2000:739, 2005:1166, 2010:1614, 2015:1556, 2018:1726, 2020:1645, 2022:2140, 2025:2200 },
  south_korea: { 1960:4, 1965:3, 1970:9, 1975:21, 1980:64, 1985:98, 1990:264, 1995:557, 2000:561, 2005:898, 2010:1094, 2015:1383, 2018:1720, 2020:1638, 2022:1665, 2025:1800 },
  ussr:        { 1960:180, 1965:240, 1970:320, 1975:430, 1980:570, 1985:650, 1990:517, 1991:517, 1992:0 },
  russia:      { 1992:0, 1993:436, 1995:396, 1998:271, 2000:260, 2005:764, 2010:1525, 2015:1365, 2018:1665, 2020:1474, 2022:2240, 2025:2400 },
  brazil:      { 1960:15, 1965:20, 1970:43, 1975:129, 1980:235, 1985:263, 1990:462, 1995:786, 2000:644, 2005:882, 2010:2209, 2012:2464, 2015:1800, 2018:1886, 2020:1448, 2022:1921, 2025:2100 },
  australia:   { 1960:19, 1965:25, 1970:41, 1975:100, 1980:167, 1985:173, 1990:316, 1995:367, 2000:416, 2005:701, 2010:1248, 2015:1340, 2018:1432, 2020:1330, 2022:1700, 2025:1800 },
  spain:       { 1960:12, 1965:20, 1970:37, 1975:119, 1980:213, 1985:179, 1990:509, 1995:611, 2000:595, 2005:1131, 2010:1417, 2015:1199, 2018:1419, 2020:1281, 2022:1400, 2025:1500 },
  mexico:      { 1960:13, 1965:18, 1970:35, 1975:93, 1980:228, 1985:194, 1990:263, 1995:368, 2000:708, 2005:867, 2010:1051, 2015:1167, 2018:1220, 2020:1073, 2022:1323, 2025:1450 },
};

function formatValue(n: number): string {
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "T";
  return "$" + Math.round(n) + "B";
}

function formatValueFull(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US") + "B";
}

export const GDP_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 GDP BY COUNTRY",
  subtitle: "NOMINAL GDP (USD)",
  unitLabel: "GDP (Billions USD)",
  valueUnit: "USD",
  startYear: 1960,
  endYear: 2025,
  topN: 10,
  minValue: 10,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: COIN_ICON,
  events: { 1973: "OPEC oil embargo triggers global recession — Western GDP shrinks", 2008: "Lehman Brothers collapses — worst recession since the Great Depression", 2020: "COVID-19 triggers the sharpest peacetime GDP fall on record" },
  sourceLabel: "Data: World Bank / IMF",
};
