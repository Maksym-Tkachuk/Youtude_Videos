import type { CountdownConfig } from "../types";
import { makeIcon } from "../../BarRace/datasets/makeIcon";

const formatValue = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

export const DEADLIEST_WARS_CONFIG: CountdownConfig = {
  // Ordered #10 (lowest, first revealed) to #1 (highest, last revealed)
  items: [
    { id: "napoleonic_wars", name: "Napoleonic Wars", value: 3500000, color: "#818cf8", subtitle: "1803–1815 · Europe", renderIcon: makeIcon("flags", "france") },
    { id: "russian_civil_war", name: "Russian Civil War", value: 5000000, color: "#ef4444", subtitle: "1917–1922 · Russia", renderIcon: makeIcon("flags", "russia") },
    { id: "dungan_revolt", name: "Dungan Revolt", value: 8000000, color: "#f97316", subtitle: "1862–1877 · China", renderIcon: makeIcon("flags", "china") },
    { id: "chinese_civil_war", name: "Chinese Civil War", value: 8000000, color: "#fb923c", subtitle: "1927–1949 · China", renderIcon: makeIcon("flags", "china") },
    { id: "an_lushan_rebellion", name: "An Lushan Rebellion", value: 13000000, color: "#06b6d4", subtitle: "755–763 · China", renderIcon: makeIcon("flags", "china") },
    { id: "conquests_of_timur", name: "Conquests of Timur", value: 17000000, color: "#22d3ee", subtitle: "1370–1405 · Central Asia", renderIcon: makeIcon("flags", "iran") },
    { id: "world_war_1", name: "World War I", value: 17000000, color: "#e879f9", subtitle: "1914–1918 · Global", renderIcon: makeIcon("flags", "germany") },
    { id: "taiping_rebellion", name: "Taiping Rebellion", value: 20000000, color: "#fbbf24", subtitle: "1850–1864 · China", renderIcon: makeIcon("flags", "china") },
    { id: "mongol_conquests", name: "Mongol Conquests", value: 40000000, color: "#f43f5e", subtitle: "1206–1368 · Eurasia", renderIcon: makeIcon("flags", "china") },
    { id: "world_war_2", name: "World War II", value: 70000000, color: "#3b82f6", subtitle: "1939–1945 · Global", renderIcon: makeIcon("flags", "germany") },
  ],
  title: "TOP 10 DEADLIEST WARS",
  subtitle: "IN HUMAN HISTORY",
  valueUnit: "deaths",
  formatValue,
  sourceLabel: "Data: Historical estimates, multiple academic sources",
  targetDuration: 30000,
};
