import type { BarRaceConfig, Frame } from "./types";

export const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function interpolate(milestones: Record<number, number>, year: number): number {
  const keys = Object.keys(milestones).map(Number).sort((a, b) => a - b);
  if (year < keys[0]) return 0;
  if (year >= keys[keys.length - 1]) return milestones[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (year >= keys[i] && year <= keys[i + 1]) {
      const t = (year - keys[i]) / (keys[i + 1] - keys[i]);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return milestones[keys[i]] + (milestones[keys[i + 1]] - milestones[keys[i]]) * eased;
    }
  }
  return 0;
}

export function buildFrames(config: BarRaceConfig): Frame[] {
  const frames: Frame[] = [];
  const framesPerYear = config.framesPerYear ?? 12;
  const playbackFramesPerYear = framesPerYear === 1 ? 6 : framesPerYear;
  for (let y = config.startYear; y <= config.endYear; y++) {
    for (let m = 0; m < playbackFramesPerYear; m++) {
      const decYear = y + m / playbackFramesPerYear;
      const vals: Record<string, number> = {};
      config.items.forEach(item => {
        const ms = config.milestones[item.id];
        vals[item.id] = ms ? Math.max(0, interpolate(ms, decYear)) : 0;
      });
      frames.push({ year: y, month: m, vals });
    }
  }
  return frames;
}

export function logPct(value: number, currentMax: number): number {
  if (value <= 0) return 0;
  const logMin = Math.log10(0.1);
  const logMax = Math.log10(Math.max(currentMax, 1));
  const logVal = Math.log10(Math.max(value, 0.1));
  return Math.min(100, Math.max(0, ((logVal - logMin) / (logMax - logMin)) * 100));
}

export function linearPct(value: number, currentMax: number): number {
  if (currentMax <= 0) return 0;
  return Math.min(100, Math.max(0, (value / currentMax) * 100));
}

export function scalePct(value: number, currentMax: number, mode: "linear" | "log" = "log"): number {
  return mode === "log" ? logPct(value, currentMax) : linearPct(value, currentMax);
}
