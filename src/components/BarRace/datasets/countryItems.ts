import type { BarRaceItem } from "../types";
import { makeIcon } from "./makeIcon";

const COUNTRY_CATALOG: Array<Pick<BarRaceItem, "id" | "name">> = [
  { id: "usa", name: "United States" },
  { id: "china", name: "China" },
  { id: "india", name: "India" },
  { id: "japan", name: "Japan" },
  { id: "germany", name: "Germany" },
  { id: "uk", name: "United Kingdom" },
  { id: "france", name: "France" },
  { id: "italy", name: "Italy" },
  { id: "canada", name: "Canada" },
  { id: "south_korea", name: "South Korea" },
  { id: "ussr", name: "USSR" },
  { id: "russia", name: "Russia" },
  { id: "brazil", name: "Brazil" },
  { id: "australia", name: "Australia" },
  { id: "spain", name: "Spain" },
  { id: "mexico", name: "Mexico" },
  { id: "indonesia", name: "Indonesia" },
  { id: "turkey", name: "Turkey" },
  { id: "pakistan", name: "Pakistan" },
  { id: "nigeria", name: "Nigeria" },
  { id: "argentina", name: "Argentina" },
  { id: "ukraine", name: "Ukraine" },
  { id: "saudi_arabia", name: "Saudi Arabia" },
  { id: "iran", name: "Iran" },
  { id: "iraq", name: "Iraq" },
  { id: "uae", name: "UAE" },
  { id: "kuwait", name: "Kuwait" },
  { id: "norway", name: "Norway" },
  { id: "venezuela", name: "Venezuela" },
  { id: "libya", name: "Libya" },
  { id: "egypt", name: "Egypt" },
  { id: "vietnam", name: "Vietnam" },
  { id: "philippines", name: "Philippines" },
  { id: "bangladesh", name: "Bangladesh" },
  { id: "ethiopia", name: "Ethiopia" },
  { id: "netherlands", name: "Netherlands" },
  { id: "sweden", name: "Sweden" },
  { id: "finland", name: "Finland" },
  { id: "hungary", name: "Hungary" },
  { id: "israel", name: "Israel" },
  { id: "cuba", name: "Cuba" },
  { id: "poland", name: "Poland" },
  { id: "afghanistan", name: "Afghanistan" },
  { id: "colombia", name: "Colombia" },
  { id: "somalia", name: "Somalia" },
  { id: "syria", name: "Syria" },
  { id: "yemen", name: "Yemen" },
];

const COUNTRY_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#f97316",
  "#fb7185",
  "#eab308",
  "#e879f9",
  "#818cf8",
  "#22d3ee",
  "#f43f5e",
  "#06b6d4",
  "#991b1b",
  "#cc3333",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#4ade80",
  "#14b8a6",
  "#a855f7",
  "#84cc16",
  "#10b981",
  "#60a5fa",
  "#facc15",
  "#f59e0b",
  "#d946ef",
  "#f87171",
  "#67e8f9",
  "#fde047",
  "#93c5fd",
  "#f472b6",
  "#bef264",
  "#fb923c",
  "#38bdf8",
  "#86efac",
  "#fda4af",
  "#c4b5fd",
  "#2dd4bf",
  "#7dd3fc",
  "#fcd34d",
  "#a3e635",
  "#f9a8d4",
  "#fdba74",
];

const COUNTRY_POOL: BarRaceItem[] = COUNTRY_CATALOG.map((item, index) => ({
  ...item,
  color: COUNTRY_COLORS[index % COUNTRY_COLORS.length],
}));

const COUNTRY_ALIASES: Record<string, string[]> = {
  uk: ["great_britain"],
  great_britain: ["uk"],
  ussr: ["russia_ussr"],
  russia_ussr: ["ussr"],
};

function hasEquivalentItem(existingIds: Set<string>, id: string) {
  if (existingIds.has(id)) return true;
  return (COUNTRY_ALIASES[id] ?? []).some(alias => existingIds.has(alias));
}

export function ensureCountryItems(items: BarRaceItem[], minimum = 30): BarRaceItem[] {
  const output = items.map(item => ({
    ...item,
    renderIcon: item.renderIcon ?? makeIcon("flags", item.id),
  }));
  const existingIds = new Set(output.map(item => item.id));

  for (const candidate of COUNTRY_POOL) {
    if (output.length >= minimum) break;
    if (hasEquivalentItem(existingIds, candidate.id)) continue;

    output.push({
      ...candidate,
      renderIcon: makeIcon("flags", candidate.id),
    });
    existingIds.add(candidate.id);
  }

  return output;
}
