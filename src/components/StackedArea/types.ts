export interface StackedAreaItem {
  id: string;
  name: string;
  color: string;
}

export interface StackedAreaConfig {
  items: StackedAreaItem[]; // countries/entities shown as layers
  // id -> year -> percentage share (0-100, all should sum to ~100 per year)
  milestones: Record<string, Record<number, number>>;
  title: string;
  subtitle?: string;
  unitLabel: string; // e.g. "Share of Global Oil Production (%)"
  startYear: number;
  endYear: number;
  framesPerYear?: number; // default 12
  targetDuration?: number; // default 45000
  videoWidth?: number;
  videoHeight?: number;
  events?: Record<number, string>;
  sourceLabel?: string;
}
