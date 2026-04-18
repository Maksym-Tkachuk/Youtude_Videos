import type { BarRaceConfig, BarRaceItem } from "../types";
import { ensureCountryItems } from "./countryItems";
import { makeIcon } from "./makeIcon";

const PERCENT_ICON = (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.85))" }}>
    <circle cx="3.1" cy="3.1" r="1.45" fill="#ffd166" stroke="#fff0bf" strokeWidth="0.55" />
    <circle cx="7.9" cy="7.9" r="1.45" fill="#ffd166" stroke="#fff0bf" strokeWidth="0.55" />
    <path d="M8.5 2.5 L2.5 8.5" stroke="#7af0c5" strokeWidth="0.9" strokeLinecap="round" />
  </svg>
);

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function roundYear(year: number) {
  return Math.round(year * 1_000_000) / 1_000_000;
}

function roundValue(value: number) {
  return Math.round(value * 100) / 100;
}

function series(...points: Array<[number, number]>) {
  const ordered = [...points].sort((a, b) => a[0] - b[0]);
  const dense: Array<[number, number]> = [];

  for (let index = 0; index < ordered.length; index++) {
    const [year, value] = ordered[index];
    dense.push([year, value]);

    const next = ordered[index + 1];
    if (!next) continue;

    const [nextYear, nextValue] = next;
    const gap = nextYear - year;
    if (gap < 0.24) continue;

    // Densify each hand-entered segment to roughly twice-monthly anchors so the
    // wartime curves carry much more intermediate data through time.
    const steps = Math.max(1, Math.ceil(gap * 24)) - 1;

    for (let step = 1; step <= steps; step++) {
      const fraction = step / (steps + 1);
      const intermediateYear = roundYear(year + gap * fraction);
      if (intermediateYear <= year || intermediateYear >= nextYear) continue;

      const intermediateValue = roundValue(value + (nextValue - value) * easeInOutQuad(fraction));
      dense.push([intermediateYear, intermediateValue]);
    }
  }

  return Object.fromEntries(dense) as Record<number, number>;
}

function formatValue(n: number): string {
  return `${n.toFixed(1)}%`;
}

function formatValueFull(n: number): string {
  return `${n.toFixed(2)}%`;
}

const WW1_ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "germany", name: "Germany", color: "#eab308", renderIcon: makeIcon("flags", "germany") },
  { id: "uk", name: "United Kingdom", color: "#e879f9", renderIcon: makeIcon("flags", "uk") },
  { id: "france", name: "France", color: "#818cf8", renderIcon: makeIcon("flags", "france") },
  { id: "usa", name: "United States", color: "#3b82f6", renderIcon: makeIcon("flags", "usa") },
  { id: "russian_empire", name: "Russian Empire", color: "#b45309", renderIcon: makeIcon("flags", "russian_empire") },
  { id: "italy", name: "Italy", color: "#34d399", renderIcon: makeIcon("flags", "italy") },
  { id: "japan", name: "Japan", color: "#fb7185", renderIcon: makeIcon("flags", "japan") },
  { id: "india", name: "India", color: "#f59e0b", renderIcon: makeIcon("flags", "india") },
  { id: "canada", name: "Canada", color: "#c084fc", renderIcon: makeIcon("flags", "canada") },
  { id: "australia", name: "Australia", color: "#a3e635", renderIcon: makeIcon("flags", "australia") },
  { id: "south_africa", name: "South Africa", color: "#22c55e", renderIcon: makeIcon("flags", "south_africa") },
  { id: "serbia", name: "Serbia", color: "#60a5fa", renderIcon: makeIcon("flags", "serbia") },
  { id: "romania", name: "Romania", color: "#fbbf24", renderIcon: makeIcon("flags", "romania") },
  { id: "austria_hungary", name: "Austria-Hungary", color: "#ef4444", renderIcon: makeIcon("flags", "austria_hungary") },
  { id: "ottoman_empire", name: "Ottoman Empire", color: "#fb923c", renderIcon: makeIcon("flags", "ottoman_empire") },
], 30);

const WW1_MILESTONES: Record<string, Record<number, number>> = {
  germany: series(
    [1913, 5.0], [1914, 10.0], [1914.5, 22.0], [1915, 35.0], [1915.5, 42.0], [1916, 48.0],
    [1916.5, 51.0], [1917, 54.0], [1917.5, 52.0], [1918, 50.0], [1918.5, 28.0], [1919, 5.0]
  ),
  uk: series(
    [1913, 3.5], [1914, 5.0], [1914.5, 16.0], [1915, 28.0], [1915.5, 34.0], [1916, 40.0],
    [1916.5, 43.0], [1917, 47.0], [1917.5, 47.0], [1918, 47.0], [1918.5, 28.0], [1919, 10.0]
  ),
  france: series(
    [1913, 4.5], [1914, 8.0], [1914.5, 18.0], [1915, 28.0], [1915.5, 33.0], [1916, 37.0],
    [1916.5, 39.0], [1917, 40.0], [1917.5, 39.0], [1918, 38.0], [1918.5, 25.0], [1919, 10.0]
  ),
  usa: series(
    [1913, 1.0], [1914, 1.0], [1916, 2.0], [1917, 5.0], [1917.5, 11.0], [1918, 17.0], [1918.5, 12.0], [1919, 7.0]
  ),
  russian_empire: series(
    [1913, 5.5], [1914, 10.0], [1914.5, 18.0], [1915, 25.0], [1915.5, 28.0], [1916, 32.0],
    [1916.5, 34.0], [1917, 35.0], [1917.5, 18.0], [1918, 0.0]
  ),
  italy: series(
    [1913, 3.0], [1914, 3.5], [1915, 8.0], [1915.5, 11.0], [1916, 14.0], [1916.5, 17.0],
    [1917, 19.0], [1917.5, 21.0], [1918, 22.0], [1918.5, 16.0], [1919, 9.0]
  ),
  japan: series(
    [1913, 2.0], [1914, 2.5], [1914.5, 3.0], [1915, 3.8], [1915.5, 4.4], [1916, 5.0],
    [1916.5, 5.5], [1917, 6.0], [1917.5, 6.2], [1918, 6.5], [1918.5, 5.0], [1919, 3.0]
  ),
  india: series(
    [1913, 2.0], [1914, 2.5], [1914.5, 3.0], [1915, 3.4], [1915.5, 3.8], [1916, 4.0],
    [1916.5, 4.3], [1917, 4.6], [1917.5, 4.8], [1918, 5.0], [1918.5, 4.2], [1919, 3.0]
  ),
  canada: series(
    [1913, 1.8], [1914, 2.4], [1914.5, 3.8], [1915, 5.5], [1915.5, 6.8], [1916, 8.0],
    [1916.5, 8.8], [1917, 9.5], [1917.5, 10.3], [1918, 11.0], [1918.5, 8.5], [1919, 5.5]
  ),
  australia: series(
    [1913, 1.5], [1914, 2.2], [1914.5, 3.8], [1915, 5.2], [1915.5, 6.5], [1916, 7.8],
    [1916.5, 8.4], [1917, 8.9], [1917.5, 9.2], [1918, 9.5], [1918.5, 7.3], [1919, 4.5]
  ),
  south_africa: series(
    [1913, 1.6], [1914, 2.4], [1914.5, 3.2], [1915, 4.1], [1915.5, 4.6], [1916, 5.0],
    [1916.5, 5.3], [1917, 5.6], [1917.5, 5.8], [1918, 6.0], [1918.5, 5.0], [1919, 3.8]
  ),
  serbia: series(
    [1913, 6.0], [1914, 15.0], [1914.5, 20.0], [1915, 28.0], [1915.5, 24.0], [1916, 22.0],
    [1916.5, 21.0], [1917, 20.0], [1917.5, 19.0], [1918, 18.0], [1918.5, 13.0], [1919, 8.0]
  ),
  romania: series(
    [1913, 2.5], [1914, 3.0], [1915, 3.2], [1916, 10.0], [1916.5, 16.0], [1917, 18.0],
    [1917.5, 17.0], [1918, 6.0], [1918.5, 4.5], [1919, 4.0]
  ),
  austria_hungary: series(
    [1913, 4.5], [1914, 7.0], [1914.5, 12.0], [1915, 16.0], [1915.5, 20.0], [1916, 23.0],
    [1916.5, 25.0], [1917, 27.0], [1917.5, 26.0], [1918, 24.0], [1918.5, 10.0], [1919, 0.0]
  ),
  ottoman_empire: series(
    [1912, 6.0], [1914, 8.0], [1914.5, 11.0], [1915, 15.0], [1915.5, 18.0], [1916, 20.0],
    [1916.5, 21.0], [1917, 22.0], [1917.5, 21.0], [1918, 18.0], [1918.5, 9.0], [1919, 0.0]
  ),
};

const WW2_ITEMS: BarRaceItem[] = ensureCountryItems([
  { id: "germany", name: "Germany", color: "#eab308", renderIcon: makeIcon("flags", "germany") },
  { id: "uk", name: "United Kingdom", color: "#e879f9", renderIcon: makeIcon("flags", "uk") },
  { id: "france", name: "France", color: "#818cf8", renderIcon: makeIcon("flags", "france") },
  { id: "usa", name: "United States", color: "#3b82f6", renderIcon: makeIcon("flags", "usa") },
  { id: "ussr", name: "USSR", color: "#ef4444", renderIcon: makeIcon("flags", "ussr") },
  { id: "japan", name: "Japan", color: "#fb7185", renderIcon: makeIcon("flags", "japan") },
  { id: "china", name: "China", color: "#f97316", renderIcon: makeIcon("flags", "china") },
  { id: "italy", name: "Italy", color: "#34d399", renderIcon: makeIcon("flags", "italy") },
  { id: "canada", name: "Canada", color: "#c084fc", renderIcon: makeIcon("flags", "canada") },
  { id: "australia", name: "Australia", color: "#a3e635", renderIcon: makeIcon("flags", "australia") },
  { id: "hungary", name: "Hungary", color: "#f472b6", renderIcon: makeIcon("flags", "hungary") },
  { id: "finland", name: "Finland", color: "#7dd3fc", renderIcon: makeIcon("flags", "finland") },
  { id: "india", name: "India", color: "#f59e0b", renderIcon: makeIcon("flags", "india") },
  { id: "south_africa", name: "South Africa", color: "#22c55e", renderIcon: makeIcon("flags", "south_africa") },
  { id: "brazil", name: "Brazil", color: "#4ade80", renderIcon: makeIcon("flags", "brazil") },
  { id: "egypt", name: "Egypt", color: "#60a5fa", renderIcon: makeIcon("flags", "egypt") },
  { id: "romania", name: "Romania", color: "#fbbf24", renderIcon: makeIcon("flags", "romania") },
], 30);

const WW2_MILESTONES: Record<string, Record<number, number>> = {
  germany: series(
    [1939, 23.0], [1939.5, 31.0], [1940, 40.0], [1940.5, 46.0], [1941, 52.0], [1941.5, 58.0],
    [1942, 64.0], [1942.5, 67.0], [1943, 70.0], [1943.5, 73.0], [1944, 75.0], [1944.5, 58.0], [1945, 30.0]
  ),
  uk: series(
    [1939, 15.0], [1939.5, 28.0], [1940, 45.0], [1940.5, 49.0], [1941, 53.0], [1941.5, 54.0],
    [1942, 55.0], [1942.5, 56.0], [1943, 57.0], [1943.5, 58.0], [1944, 60.0], [1944.5, 53.0], [1945, 42.0]
  ),
  france: series(
    [1939, 15.0], [1939.5, 11.0], [1940, 2.0], [1940.5, 1.5], [1941, 1.0],
    [1942, 1.0], [1943, 1.0], [1944, 1.0], [1944.5, 4.0], [1945, 8.0]
  ),
  usa: series(
    [1939, 1.5], [1940, 2.0], [1941, 8.0], [1941.5, 18.0], [1942, 30.0],
    [1942.5, 36.0], [1943, 40.0], [1943.5, 41.0], [1944, 42.0], [1944.5, 40.0], [1945, 38.0]
  ),
  ussr: series(
    [1939, 14.0], [1940, 15.0], [1941, 28.0], [1941.5, 43.0], [1942, 55.0], [1942.5, 58.0],
    [1943, 61.0], [1943.5, 59.0], [1944, 57.0], [1944.5, 51.0], [1945, 45.0]
  ),
  japan: series(
    [1939, 30.0], [1939.5, 33.0], [1940, 35.0], [1940.5, 39.0], [1941, 42.0], [1941.5, 46.0],
    [1942, 50.0], [1942.5, 54.0], [1943, 58.0], [1943.5, 61.0], [1944, 65.0], [1944.5, 50.0], [1945, 35.0]
  ),
  china: series(
    [1939, 18.0], [1939.5, 19.0], [1940, 20.0], [1940.5, 21.0], [1941, 21.5], [1942, 22.0],
    [1942.5, 23.0], [1943, 24.0], [1944, 25.0], [1944.5, 23.0], [1945, 20.0]
  ),
  italy: series(
    [1939, 11.0], [1939.5, 14.0], [1940, 18.0], [1940.5, 20.0], [1941, 23.0], [1941.5, 24.0],
    [1942, 26.0], [1942.5, 25.0], [1943, 18.0], [1943.5, 10.0], [1944, 6.0], [1945, 4.0]
  ),
  canada: series(
    [1939, 8.0], [1939.5, 11.0], [1940, 15.0], [1940.5, 18.0], [1941, 24.0], [1941.5, 28.0],
    [1942, 32.0], [1942.5, 35.0], [1943, 38.0], [1943.5, 40.0], [1944, 42.0], [1944.5, 37.0], [1945, 30.0]
  ),
  australia: series(
    [1939, 6.0], [1939.5, 8.0], [1940, 12.0], [1940.5, 16.0], [1941, 22.0], [1941.5, 27.0],
    [1942, 31.0], [1942.5, 33.0], [1943, 35.0], [1943.5, 36.0], [1944, 37.0], [1944.5, 34.0], [1945, 28.0]
  ),
  hungary: series(
    [1939, 9.0], [1939.5, 9.5], [1940, 10.0], [1940.5, 12.0], [1941, 14.0], [1941.5, 17.0],
    [1942, 20.0], [1942.5, 21.0], [1943, 22.0], [1943.5, 23.0], [1944, 24.0], [1944.5, 18.0], [1945, 8.0]
  ),
  finland: series(
    [1939, 14.0], [1939.5, 18.0], [1940, 22.0], [1940.5, 15.0], [1941, 18.0], [1941.5, 24.0],
    [1942, 26.0], [1942.5, 26.0], [1943, 24.0], [1943.5, 23.0], [1944, 20.0], [1944.5, 12.0], [1945, 6.0]
  ),
  india: series(
    [1939, 2.5], [1939.5, 2.8], [1940, 3.0], [1940.5, 4.2], [1941, 5.0], [1941.5, 5.5],
    [1942, 6.0], [1942.5, 6.7], [1943, 7.3], [1943.5, 7.7], [1944, 8.0], [1944.5, 7.6], [1945, 7.0]
  ),
  south_africa: series(
    [1939, 3.0], [1939.5, 3.5], [1940, 4.5], [1940.5, 5.5], [1941, 6.5], [1941.5, 7.3],
    [1942, 8.0], [1942.5, 8.5], [1943, 9.0], [1943.5, 8.7], [1944, 8.3], [1944.5, 7.4], [1945, 6.2]
  ),
  brazil: series(
    [1939, 2.0], [1939.5, 2.1], [1940, 2.3], [1940.5, 2.8], [1941, 3.2], [1941.5, 3.8],
    [1942, 4.2], [1942.5, 4.5], [1943, 4.8], [1943.5, 5.0], [1944, 5.2], [1944.5, 4.9], [1945, 4.4]
  ),
  egypt: series(
    [1939, 2.5], [1939.5, 2.7], [1940, 3.0], [1940.5, 3.0], [1941, 3.0], [1941.5, 3.1],
    [1942, 3.2], [1942.5, 3.3], [1943, 3.3], [1943.5, 3.2], [1944, 3.1], [1944.5, 3.0], [1945, 3.0]
  ),
  romania: series(
    [1939, 6.0], [1939.5, 7.0], [1940, 9.0], [1940.5, 11.0], [1941, 13.0], [1941.5, 15.0],
    [1942, 17.0], [1942.5, 18.0], [1943, 19.0], [1943.5, 18.0], [1944, 14.0], [1944.5, 9.0], [1945, 5.0]
  ),
};

export const WORLD_WAR_I_SPENDING_PCT_CONFIG: BarRaceConfig = {
  items: WW1_ITEMS,
  milestones: WW1_MILESTONES,
  title: "TOP 10 WWI SPENDING %",
  subtitle: "MILITARY SPENDING AS % OF GDP",
  unitLabel: "Military Spending (% of GDP)",
  valueUnit: "GDP share",
  startYear: 1914,
  endYear: 1919,
  topN: 10,
  minValue: 0.5,
  formatValue,
  formatValueFull,
  scaleMode: "linear",
  framesPerYear: 24,
  targetDuration: 30000,
  timelineInterval: 1,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: PERCENT_ICON,
  events: {
    1914: "World War I begins after the July Crisis, and Europe's great powers begin shifting national economies into total war",
    1918: "The Central Powers collapse in 1918, and military burdens break sharply as exhausted empires fall apart",
  },
  sourceLabel: "Data: curated historical estimates from wartime budget studies, military burden reconstructions, and repo-wide WW-era GDP-share anchors",
};

export const WORLD_WAR_II_SPENDING_PCT_CONFIG: BarRaceConfig = {
  items: WW2_ITEMS,
  milestones: WW2_MILESTONES,
  title: "TOP 10 WWII SPENDING %",
  subtitle: "MILITARY SPENDING AS % OF GDP",
  unitLabel: "Military Spending (% of GDP)",
  valueUnit: "GDP share",
  startYear: 1939,
  endYear: 1945,
  topN: 10,
  minValue: 0.5,
  formatValue,
  formatValueFull,
  scaleMode: "linear",
  framesPerYear: 24,
  targetDuration: 30000,
  timelineInterval: 1,
  skipEmptyStartFrames: false,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: PERCENT_ICON,
  events: {
    1939: "World War II begins on September 1, 1939, and Europe immediately starts scaling up for total war",
    1945: "The war ends in 1945, and military burdens finally begin falling after the most expensive mobilization in history",
  },
  sourceLabel: "Data: curated historical estimates from wartime budget studies, military burden reconstructions, and repo-wide WW-era GDP-share anchors",
};
