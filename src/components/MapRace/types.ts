export interface MapRaceConfig {
  // Data
  milestones: Record<string, Record<number, number>>; // countrySlug → year → value

  // Labels
  title: string;
  subtitle?: string;
  unitLabel: string;
  valueUnit?: string;
  sourceLabel?: string;
  channelLabel?: string;

  // Time range
  startYear: number;
  endYear: number;
  framesPerYear?: number; // default 12

  // Layout
  videoWidth?: number;  // default 405
  videoHeight?: number; // default 720

  // Playback
  targetDuration?: number; // default 45000

  // Timeline
  timelineInterval?: number; // year label step, default 5

  // Scaling
  formatValue: (n: number) => string;
  colorScale: (value: number, maxValue: number) => string; // returns CSS color

  // Country name mapping (slug → display name)
  countryNames?: Record<string, string>;

  // Optional top-N sidebar showing ranking
  topN?: number; // show top N countries in a sidebar list, default 5

  // Events ticker
  events?: Record<number, string>;
}

export interface MapFrame {
  year: number;
  month: number;
  vals: Record<string, number>; // countrySlug → interpolated value
}
