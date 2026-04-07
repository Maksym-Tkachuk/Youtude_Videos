import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";

const BANKNOTE_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.9))" }}>
    {/* note body — currency green */}
    <rect x="0.8" y="3.2" width="9.4" height="4.6" rx="0.7" fill="#15803d"/>
    {/* note border */}
    <rect x="0.8" y="3.2" width="9.4" height="4.6" rx="0.7" fill="none" stroke="#4ade80" strokeWidth="0.5"/>
    {/* inner frame */}
    <rect x="1.8" y="4" width="7.4" height="3" rx="0.4" fill="none" stroke="#4ade80" strokeWidth="0.35"/>
    {/* center oval */}
    <ellipse cx="5.5" cy="5.5" rx="1.3" ry="1.3" fill="#166534"/>
    <ellipse cx="5.5" cy="5.5" rx="1.3" ry="1.3" fill="none" stroke="#4ade80" strokeWidth="0.35"/>
    {/* $ sign — bright */}
    <text x="5.5" y="6.6" textAnchor="middle" fontSize="2.8" fontWeight="bold" fill="#86efac" fontFamily="serif">$</text>
  </svg>
);

const ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "usa",         name: "United States",  color: "#3b82f6" },
  { id: "japan",       name: "Japan",          color: "#fb7185" },
  { id: "china",       name: "China",          color: "#ef4444" },
  { id: "italy",       name: "Italy",          color: "#22d3ee" },
  { id: "france",      name: "France",         color: "#818cf8" },
  { id: "germany",     name: "Germany",        color: "#eab308" },
  { id: "uk",          name: "United Kingdom", color: "#e879f9" },
  { id: "brazil",      name: "Brazil",         color: "#34d399" },
  { id: "canada",      name: "Canada",         color: "#f43f5e" },
  { id: "india",       name: "India",          color: "#f97316" },
  { id: "australia",   name: "Australia",      color: "#fb923c" },
  { id: "spain",       name: "Spain",          color: "#a78bfa" },
  { id: "ussr",        name: "USSR",           color: "#991b1b" },
  { id: "russia",      name: "Russia",         color: "#cc3333" },
  { id: "south_korea", name: "South Korea",    color: "#06b6d4" },
  { id: "argentina",   name: "Argentina",      color: "#4ade80" },
]);

// Government gross debt in billions USD
const MILESTONES: Record<string, Record<number, number>> = {
  usa:         { 1985:1200, 1988:2400, 1990:3200, 1992:4000, 1995:4974, 1997:5380, 2000:5674, 2003:6783, 2005:7933, 2007:9008, 2008:10025, 2009:11910, 2010:13562, 2012:16066, 2015:18151, 2017:19845, 2019:22719, 2020:27748, 2021:28429, 2022:31459, 2023:33167, 2025:36200 },
  japan:       { 1985:1150, 1988:1900, 1990:2400, 1992:2900, 1995:3500, 1997:3800, 2000:5000, 2002:5800, 2005:7800, 2007:7400, 2008:7800, 2010:9100, 2012:10000, 2015:11000, 2017:11200, 2019:12000, 2020:12500, 2022:13000, 2025:13800 },
  china:       { 1985:75, 1988:120, 1990:150, 1992:180, 1995:400, 1997:550, 2000:800, 2002:950, 2005:1500, 2007:2100, 2008:2500, 2010:4000, 2012:5500, 2015:9000, 2017:10300, 2019:11000, 2020:11500, 2022:14000, 2024:15800, 2025:16500 },
  italy:       { 1985:725, 1988:950, 1990:1100, 1992:1250, 1995:1300, 1997:1300, 2000:1300, 2003:1500, 2005:1600, 2007:1800, 2008:1900, 2010:2000, 2012:2300, 2015:2300, 2017:2500, 2019:2600, 2020:2900, 2022:3100, 2025:3250 },
  france:      { 1985:275, 1988:500, 1990:650, 1992:800, 1995:1000, 1997:1050, 2000:1100, 2003:1300, 2005:1400, 2007:1500, 2008:1600, 2010:2000, 2012:2300, 2015:2400, 2017:2650, 2019:2800, 2020:3200, 2022:3500, 2025:3750 },
  germany:     { 1985:200, 1988:500, 1990:700, 1992:900, 1995:1200, 1997:1250, 2000:1300, 2003:1600, 2005:1700, 2007:1800, 2008:1900, 2010:2300, 2012:2600, 2015:2400, 2017:2350, 2019:2400, 2020:2700, 2022:2900, 2025:3100 },
  uk:          { 1985:350, 1988:500, 1990:600, 1992:700, 1995:750, 1997:700, 2000:600, 2003:650, 2005:750, 2007:800, 2008:850, 2010:1300, 2012:1800, 2015:2000, 2017:2300, 2019:2500, 2020:2700, 2022:3000, 2025:3350 },
  brazil:      { 1985:250, 1988:280, 1990:300, 1992:320, 1995:280, 1997:300, 2000:400, 2002:450, 2005:700, 2007:850, 2008:900, 2010:1400, 2012:1600, 2015:1800, 2017:1750, 2019:1900, 2020:1600, 2022:1800, 2025:2050 },
  canada:      { 1985:525, 1988:600, 1990:650, 1992:700, 1995:750, 1997:740, 2000:650, 2002:640, 2005:700, 2007:700, 2008:720, 2010:750, 2012:800, 2015:1100, 2017:1350, 2019:1500, 2020:1800, 2022:2000, 2025:2250 },
  india:       { 1985:100, 1988:130, 1990:150, 1992:170, 1995:250, 1997:300, 2000:450, 2002:550, 2005:700, 2007:850, 2008:950, 2010:1200, 2012:1500, 2015:1600, 2017:2000, 2019:2500, 2020:2100, 2022:3000, 2025:3500 },
  australia:   { 1985:0.1, 1988:40, 1990:80, 1992:120, 1995:150, 1997:150, 2000:200, 2002:200, 2005:300, 2007:320, 2008:330, 2010:400, 2012:500, 2015:600, 2017:700, 2019:750, 2020:850, 2022:1000, 2025:1150 },
  spain:       { 1985:175, 1988:250, 1990:300, 1992:350, 1995:450, 1997:450, 2000:450, 2002:480, 2005:600, 2007:650, 2008:680, 2010:800, 2012:1100, 2013:1300, 2015:1200, 2017:1350, 2019:1400, 2020:1450, 2022:1500, 2025:1650 },
  ussr:        { 1985:600, 1988:600, 1990:600, 1991:600, 1992:0 },
  russia:      { 1992:500, 1995:400, 1997:450, 1998:350, 2000:150, 2002:180, 2005:200, 2007:300, 2008:350, 2010:350, 2012:400, 2015:500, 2017:500, 2019:450, 2020:400, 2022:350, 2025:380 },
  south_korea: { 1985:75, 1988:90, 1990:100, 1992:110, 1995:150, 1997:130, 2000:160, 2002:200, 2005:300, 2007:330, 2008:350, 2010:440, 2012:520, 2015:600, 2017:680, 2019:760, 2020:800, 2022:950, 2025:1150 },
  argentina:   { 1985:75, 1988:90, 1990:100, 1992:110, 1995:130, 1997:140, 2000:170, 2001:200, 2002:250, 2004:160, 2005:120, 2007:150, 2008:160, 2010:200, 2012:230, 2015:280, 2017:320, 2019:330, 2020:340, 2022:390, 2025:450 },
};

function formatValue(n: number): string {
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "T";
  return "$" + Math.round(n) + "B";
}

function formatValueFull(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US") + "B";
}

export const DEBT_CONFIG: BarRaceConfig = {
  items: ITEMS,
  milestones: MILESTONES,
  title: "TOP 10 NATIONAL DEBT",
  subtitle: "GOVERNMENT GROSS DEBT",
  unitLabel: "Gross Government Debt (Billions USD)",
  valueUnit: "USD",
  startYear: 1985,
  endYear: 2025,
  topN: 10,
  minValue: 50,
  formatValue,
  formatValueFull,
  scaleMode: "log",
  framesPerYear: 1,
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: BANKNOTE_ICON,
  events: { 1991: "Soviet Union dissolves — new republics inherit billions in Cold War debt", 2008: "Governments borrow trillions to bail out banks — national debt soars", 2020: "Nations borrow at historic scale for COVID relief — US debt tops $27T" },
  sourceLabel: "Data: IMF Fiscal Monitor / World Bank + estimated 1985/1988 anchors",
};
