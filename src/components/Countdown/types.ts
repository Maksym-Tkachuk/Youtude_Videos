import type { ReactNode } from "react";

export interface CountdownItem {
  id: string;
  name: string;
  value: number;
  color: string;
  subtitle?: string; // e.g. "1.4M active troops"
  renderIcon?: (color: string, size: number) => ReactNode;
}

export interface CountdownConfig {
  items: CountdownItem[]; // exactly 10, ordered #10 (first) → #1 (last)
  title: string;
  subtitle?: string;
  valueUnit?: string;
  formatValue: (n: number) => string;
  sourceLabel?: string;

  // Layout
  videoWidth?: number;  // default 405
  videoHeight?: number; // default 720

  // Playback
  targetDuration?: number; // default 30000 (30s for countdown)
}
