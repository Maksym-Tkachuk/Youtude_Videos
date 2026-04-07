import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const WHEAT_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    {/* stem — green */}
    <line x1="5.5" y1="10.5" x2="5.5" y2="1.5" stroke="#84cc16" strokeWidth="0.8" strokeLinecap="round"/>
    {/* grain left top — amber */}
    <ellipse cx="4" cy="2.5" rx="1.2" ry="0.65" fill="#f59e0b" transform="rotate(-30 4 2.5)"/>
    {/* grain right top — amber */}
    <ellipse cx="7" cy="2.5" rx="1.2" ry="0.65" fill="#f59e0b" transform="rotate(30 7 2.5)"/>
    {/* grain left mid */}
    <ellipse cx="3.8" cy="4.3" rx="1.2" ry="0.65" fill="#f59e0b" transform="rotate(-25 3.8 4.3)"/>
    {/* grain right mid */}
    <ellipse cx="7.2" cy="4.3" rx="1.2" ry="0.65" fill="#f59e0b" transform="rotate(25 7.2 4.3)"/>
    {/* grain left low */}
    <ellipse cx="4" cy="6.1" rx="1.2" ry="0.65" fill="#d97706" transform="rotate(-20 4 6.1)"/>
    {/* grain right low */}
    <ellipse cx="7" cy="6.1" rx="1.2" ry="0.65" fill="#d97706" transform="rotate(20 7 6.1)"/>
  </svg>
);

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "china",     name: "China",          color: "#ef4444" },
  { id: "usa",       name: "United States",  color: "#3b82f6" },
  { id: "india",     name: "India",          color: "#f97316" },
  { id: "ussr",      name: "USSR",           color: "#991b1b" },
  { id: "russia",    name: "Russia",         color: "#cc3333" },
  { id: "brazil",    name: "Brazil",         color: "#34d399" },
  { id: "indonesia", name: "Indonesia",      color: "#22d3ee" },
  { id: "france",    name: "France",         color: "#818cf8" },
  { id: "germany",   name: "Germany",        color: "#eab308" },
  { id: "ukraine",   name: "Ukraine",        color: "#fbbf24" },
  { id: "australia", name: "Australia",      color: "#fb923c" },
  { id: "argentina", name: "Argentina",      color: "#60a5fa" },
  { id: "canada",    name: "Canada",         color: "#f43f5e" },
  { id: "turkey",    name: "Turkey",         color: "#a855f7" },
  { id: "pakistan",  name: "Pakistan",       color: "#4ade80" },
  { id: "nigeria",   name: "Nigeria",        color: "#fb7185" },
]);

// Total agricultural production in million tonnes (all crops combined)
const MILESTONES: Record<string, Record<number, number>> = {
  china:     { 1961:250, 1965:295, 1970:350, 1975:400, 1980:500, 1985:590, 1990:700, 1995:780, 2000:900, 2005:1050, 2010:1300, 2015:1550, 2018:1680, 2020:1700, 2022:1780, 2025:1850 },
  usa:       { 1961:300, 1965:330, 1970:360, 1975:400, 1980:450, 1985:470, 1990:540, 1995:580, 2000:610, 2005:660, 2010:700, 2015:760, 2018:790, 2020:790, 2022:820, 2025:850 },
  india:     { 1961:180, 1965:195, 1970:230, 1975:250, 1980:280, 1985:320, 1990:380, 1995:430, 2000:470, 2005:550, 2010:620, 2015:730, 2018:790, 2020:820, 2022:870, 2025:920 },
  ussr:      { 1961:200, 1965:220, 1970:250, 1975:240, 1980:265, 1985:300, 1990:295, 1991:265, 1992:0 },
  russia:    { 1992:0, 1993:200, 1995:185, 1998:160, 2000:165, 2003:185, 2005:200, 2008:220, 2010:185, 2013:235, 2015:270, 2017:310, 2020:330, 2022:350, 2025:375 },
  brazil:    { 1961:40, 1965:50, 1970:65, 1975:90, 1980:130, 1985:155, 1990:200, 1995:235, 2000:280, 2005:350, 2008:410, 2010:450, 2013:530, 2015:560, 2018:620, 2020:700, 2022:730, 2025:800 },
  indonesia: { 1961:50, 1965:60, 1970:80, 1975:100, 1980:130, 1985:160, 1990:200, 1995:230, 2000:250, 2005:310, 2010:380, 2015:470, 2018:520, 2020:540, 2022:570, 2025:590 },
  france:    { 1961:70, 1965:85, 1970:100, 1975:125, 1980:150, 1985:165, 1990:185, 1995:185, 2000:195, 2003:170, 2005:195, 2008:195, 2010:215, 2013:200, 2015:200, 2018:210, 2020:195, 2022:195, 2025:210 },
  germany:   { 1961:80, 1965:90, 1970:100, 1975:105, 1980:120, 1985:130, 1990:135, 1995:130, 2000:130, 2005:135, 2008:145, 2010:140, 2013:140, 2015:125, 2018:130, 2020:115, 2022:125, 2025:125 },
  ukraine:   { 1961:80, 1965:85, 1970:95, 1975:90, 1980:90, 1985:100, 1990:96, 1991:90, 1995:55, 1998:52, 2000:55, 2003:72, 2005:80, 2008:85, 2010:95, 2013:100, 2015:110, 2018:118, 2020:130, 2021:125, 2022:65, 2023:90, 2025:95 },
  australia: { 1961:20, 1965:25, 1970:35, 1975:45, 1980:50, 1985:55, 1990:70, 1995:80, 2000:90, 2003:80, 2005:90, 2008:85, 2010:95, 2013:95, 2015:95, 2018:100, 2019:80, 2020:95, 2022:105, 2025:115 },
  argentina: { 1961:30, 1965:38, 1970:50, 1975:65, 1980:90, 1985:85, 1990:100, 1995:110, 2000:130, 2005:155, 2008:155, 2010:180, 2013:160, 2015:180, 2018:175, 2020:180, 2022:170, 2025:200 },
  canada:    { 1961:45, 1965:52, 1970:55, 1975:60, 1980:70, 1985:78, 1990:80, 1995:85, 2000:90, 2005:95, 2008:90, 2010:95, 2013:90, 2015:100, 2018:110, 2020:110, 2022:120, 2025:125 },
  turkey:    { 1961:35, 1965:42, 1970:50, 1975:60, 1980:65, 1985:72, 1990:75, 1995:85, 2000:85, 2005:95, 2008:100, 2010:95, 2013:105, 2015:105, 2018:115, 2020:115, 2022:120, 2025:130 },
  pakistan:  { 1961:20, 1965:24, 1970:30, 1975:40, 1980:45, 1985:55, 1990:65, 1995:80, 2000:95, 2005:110, 2008:120, 2010:125, 2013:130, 2015:130, 2018:140, 2020:138, 2022:140, 2025:150 },
  nigeria:   { 1961:20, 1965:24, 1970:30, 1975:35, 1980:40, 1985:48, 1990:55, 1995:70, 2000:90, 2005:105, 2008:115, 2010:120, 2013:140, 2015:150, 2018:165, 2020:165, 2022:175, 2025:185 },
};

function formatValue(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "B";
  return Math.round(n) + "M";
}

function formatValueFull(n: number): string {
  return Math.round(n * 1_000_000).toLocaleString("en-US");
}

export const FOOD_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 FOOD PRODUCTION",
  subtitle: "AGRICULTURAL OUTPUT BY COUNTRY",
  unitLabel: "Total Agricultural Output (million tonnes)",
  valueUnit: "Mt",
  startYear: 1961,
  endYear: 2025,
  topN: 10,
  minValue: 10,
  formatValue,
  formatValueFull,
  scaleMode: "linear",
  framesPerYear: 1,
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: WHEAT_ICON,
  sourceLabel: "Data: FAO",
};
