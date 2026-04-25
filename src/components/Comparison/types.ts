import type { ReactNode } from "react";

export interface ComparisonMetric {
  label: string;
  icon?: ReactNode; // SVG icon or emoji
  valueA: number;
  valueB: number;
  formatValue: (n: number) => string;
  higherWins?: boolean; // default true — higher value wins the metric
}

export interface ComparisonEntity {
  name: string;
  color: string;
  flagId: string; // country slug for makeIcon
  image?: string; // optional path to leader photo (e.g. "/leaders/usa.png")
}

export interface ComparisonConfig {
  entityA: ComparisonEntity;
  entityB: ComparisonEntity;
  title: string;
  subtitle?: string;
  metrics: ComparisonMetric[];
  sourceLabel?: string;

  // Layout
  videoWidth?: number;  // default 405
  videoHeight?: number; // default 720

  // Playback
  targetDuration?: number; // default 35000 (35s)
}
