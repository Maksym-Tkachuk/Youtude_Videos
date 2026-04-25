export interface FlowEntity {
  id: string;
  name: string;
  color: string;
}

export interface FlowLink {
  from: string; // entity id
  to: string;   // entity id
  value: number; // flow magnitude
}

export interface FlowConfig {
  sources: FlowEntity[]; // left side (e.g. arms exporters)
  destinations: FlowEntity[]; // right side (e.g. arms importers)
  // year -> array of flows for that year
  flows: Record<number, FlowLink[]>;
  title: string;
  subtitle?: string;
  unitLabel: string;
  startYear: number;
  endYear: number;
  framesPerYear?: number; // default 6
  targetDuration?: number; // default 45000
  videoWidth?: number;
  videoHeight?: number;
  formatValue: (n: number) => string;
  events?: Record<number, string>;
  sourceLabel?: string;
}
