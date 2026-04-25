export interface Empire {
  id: string;
  name: string;
  color: string;
}

export interface EmpireMapConfig {
  empires: Empire[];
  // countrySlug → year → empireId (or "" for independent/no data)
  territories: Record<string, Record<number, string>>;

  title: string;
  subtitle?: string;
  startYear: number;
  endYear: number;
  framesPerYear?: number; // default 4 (yearly data, slower animation)

  // Layout
  videoWidth?: number;
  videoHeight?: number;

  // Playback
  targetDuration?: number; // default 45000

  // Events
  events?: Record<number, string>;
  sourceLabel?: string;
}
