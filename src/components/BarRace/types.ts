import type { ReactNode } from "react";

export interface BarRaceTheme {
  pageBg: string;
  canvasBg: string;
  canvasBgEnd: string;
  titleGradient: string;
  yearColor: string;
  monthColor: string;
  barTrackBg: string;
  timelineBg: string;
  timelineGradient: string;
  timelineDot: string;
  timelineLabelColor: string;
  timelineLabelActiveColor: string;
  controlAccent: string;
  controlSecondary: string;
  controlBg: string;
  controlActiveBg: string;
  noDataColor: string;
  // Fonts
  fontDisplay: string;   // used for year, title
  fontBody: string;      // used for bar labels, timeline
}

export interface BarRaceItem {
  id: string;
  name: string;
  color: string;
  renderIcon?: (color: string, size: number) => ReactNode;
}

export interface BarRaceItemWithValue extends BarRaceItem {
  value: number;
}

export interface Frame {
  year: number;
  month: number; // sub-year frame index (0-based)
  vals: Record<string, number>;
}

export interface BarRaceConfig {
  // ── Data ──────────────────────────────────────────────────────────────────
  items: BarRaceItem[];
  milestones: Record<string, Record<number, number>>;
  frames?: Frame[];           // pre-built frames — skips buildFrames entirely

  // ── Labels ────────────────────────────────────────────────────────────────
  title: string;
  subtitle?: string;
  unitLabel: string;
  valueUnit?: string;     // short word shown after value label, e.g. "users", "troops", "medals"
  unitIcon?: ReactNode;
  sourceLabel?: string;   // e.g. "Data: Statista"
  channelLabel?: string;  // e.g. "@yourchannel"
  events?: Record<number, string>; // year → label shown on timeline, e.g. { 1991: "USSR dissolved" }

  // ── Time range ────────────────────────────────────────────────────────────
  startYear: number;
  endYear: number;
  framesPerYear?: number;     // default 12 (monthly); use 1 for yearly data
  timelineInterval?: number;  // year label step on timeline, default 5

  // ── Layout ────────────────────────────────────────────────────────────────
  videoWidth?: number;        // default 405
  videoHeight?: number;       // default 720
  barHeight?: number;         // default 38
  gap?: number;               // gap between bars, default 8
  topN?: number;              // bars shown, default 10

  // ── Playback ──────────────────────────────────────────────────────────────
  targetDuration?: number;  // total animation ms (default 55000 = 55s)
  msPerFrame?: number;      // explicit override — takes priority over targetDuration
  skipEmptyStartFrames?: boolean; // default true — skip to first frame with topN items; set false to start from startYear

  // ── Scaling ───────────────────────────────────────────────────────────────
  maxTotal?: number;
  minValue?: number;          // hide items below this value, default 0
  formatValue: (n: number) => string;
  formatValueFull: (n: number) => string;
  scaleMode?: "linear" | "log";

  // ── Styling ───────────────────────────────────────────────────────────────
  rankColors?: string[];
  theme?: Partial<BarRaceTheme>;
}
