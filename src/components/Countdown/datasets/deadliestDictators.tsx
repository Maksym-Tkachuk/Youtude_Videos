import type { CountdownConfig } from "../types";
import { makeIcon } from "../../BarRace/datasets/makeIcon";

const formatValue = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

// Ordered #10 (lowest, first revealed) to #1 (highest, last revealed)
const items = [
  { id: "yakubu_gowon", name: "Yakubu Gowon", value: 1000000, color: "#34d399", subtitle: "Nigeria · 1966–1975", renderIcon: makeIcon("flags", "nigeria") },
  { id: "mengistu", name: "Mengistu Haile Mariam", value: 1500000, color: "#fb923c", subtitle: "Ethiopia · 1977–1991", renderIcon: makeIcon("flags", "ethiopia") },
  { id: "kim_il_sung", name: "Kim Il-sung", value: 1600000, color: "#f43f5e", subtitle: "North Korea · 1948–1994", renderIcon: makeIcon("flags", "north_korea") },
  { id: "pol_pot", name: "Pol Pot", value: 2000000, color: "#ef4444", subtitle: "Cambodia · 1975–1979", renderIcon: makeIcon("flags", "cambodia") },
  { id: "enver_pasha", name: "Ismail Enver Pasha", value: 2500000, color: "#e879f9", subtitle: "Ottoman Empire · 1913–1918", renderIcon: makeIcon("flags", "ottoman_empire") },
  { id: "hideki_tojo", name: "Hideki Tojo", value: 4000000, color: "#c084fc", subtitle: "Japan · 1941–1944", renderIcon: makeIcon("flags", "japan") },
  { id: "leopold_ii", name: "Leopold II", value: 10000000, color: "#fbbf24", subtitle: "Congo · 1885–1908", renderIcon: makeIcon("flags", "belgium") },
  { id: "adolf_hitler", name: "Adolf Hitler", value: 17000000, color: "#818cf8", subtitle: "Germany · 1933–1945", renderIcon: makeIcon("flags", "germany") },
  { id: "joseph_stalin", name: "Joseph Stalin", value: 20000000, color: "#dc2626", subtitle: "USSR · 1924–1953", renderIcon: makeIcon("flags", "ussr") },
  { id: "mao_zedong", name: "Mao Zedong", value: 45000000, color: "#f97316", subtitle: "China · 1949–1976", renderIcon: makeIcon("flags", "china") },
];

export const DEADLIEST_DICTATORS_CONFIG: CountdownConfig = {
  items,
  title: "TOP 10 DEADLIEST",
  subtitle: "DICTATORS IN HISTORY",
  valueUnit: "deaths",
  formatValue,
  sourceLabel: "Data: Multiple academic sources, estimates vary",
  targetDuration: 30000,
};
