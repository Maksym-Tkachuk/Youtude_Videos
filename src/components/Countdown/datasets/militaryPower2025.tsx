import type { CountdownConfig } from "../types";
import { makeIcon } from "../../BarRace/datasets/makeIcon";

export const MILITARY_POWER_2025_CONFIG: CountdownConfig = {
  // Ordered #10 (first) to #1 (last)
  items: [
    { id: "italy", name: "Italy", value: 297000, color: "#4ade80", subtitle: "NATO member, strong navy", renderIcon: makeIcon("flags", "italy") },
    { id: "germany", name: "Germany", value: 184000, color: "#eab308", subtitle: "Ramping up defense spending", renderIcon: makeIcon("flags", "germany") },
    { id: "turkey", name: "Turkey", value: 425000, color: "#fb923c", subtitle: "2nd largest NATO army", renderIcon: makeIcon("flags", "turkey") },
    { id: "uk", name: "United Kingdom", value: 153000, color: "#e879f9", subtitle: "Nuclear power, global reach", renderIcon: makeIcon("flags", "uk") },
    { id: "france", name: "France", value: 205000, color: "#818cf8", subtitle: "Nuclear power, Africa presence", renderIcon: makeIcon("flags", "france") },
    { id: "south_korea", name: "South Korea", value: 500000, color: "#06b6d4", subtitle: "Facing North Korea daily", renderIcon: makeIcon("flags", "south_korea") },
    { id: "japan", name: "Japan", value: 247000, color: "#c084fc", subtitle: "Rapidly rearming since 2022", renderIcon: makeIcon("flags", "japan") },
    { id: "india", name: "India", value: 1455000, color: "#22d3ee", subtitle: "1.4M active troops", renderIcon: makeIcon("flags", "india") },
    { id: "china", name: "China", value: 2035000, color: "#f97316", subtitle: "Largest military on Earth", renderIcon: makeIcon("flags", "china") },
    { id: "usa", name: "United States", value: 1390000, color: "#3b82f6", subtitle: "800+ overseas bases", renderIcon: makeIcon("flags", "usa") },
  ],
  title: "TOP 10 MOST POWERFUL",
  subtitle: "MILITARIES IN 2025",
  valueUnit: "troops",
  formatValue: (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${Math.round(n / 1000)}K`;
    return n.toString();
  },
  sourceLabel: "Data: Global Firepower Index 2025",
  targetDuration: 30000,
};
