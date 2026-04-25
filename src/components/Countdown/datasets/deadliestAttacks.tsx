import type { CountdownConfig } from "../types";
import { makeIcon } from "../../BarRace/datasets/makeIcon";

const formatValue = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

export const DEADLIEST_ATTACKS_CONFIG: CountdownConfig = {
  // Ordered #10 (lowest, first revealed) to #1 (highest, last revealed)
  items: [
    {
      id: "paris_2015",
      name: "Paris Attacks",
      value: 130,
      color: "#818cf8",
      subtitle: "France \u00b7 November 13, 2015",
      renderIcon: makeIcon("flags", "france"),
    },
    {
      id: "madrid_2004",
      name: "Madrid Train Bombings",
      value: 193,
      color: "#f9a8d4",
      subtitle: "Spain \u00b7 March 11, 2004",
      renderIcon: makeIcon("flags", "spain"),
    },
    {
      id: "bali_2002",
      name: "Bali Bombings",
      value: 202,
      color: "#14b8a6",
      subtitle: "Indonesia \u00b7 October 12, 2002",
      renderIcon: makeIcon("flags", "indonesia"),
    },
    {
      id: "lockerbie_1988",
      name: "Pan Am Flight 103",
      value: 270,
      color: "#a78bfa",
      subtitle: "Lockerbie, UK \u00b7 December 21, 1988",
      renderIcon: makeIcon("flags", "uk"),
    },
    {
      id: "beirut_1983",
      name: "Beirut Barracks Bombings",
      value: 307,
      color: "#22d3ee",
      subtitle: "Lebanon \u00b7 October 23, 1983",
      renderIcon: makeIcon("flags", "lebanon"),
    },
    {
      id: "air_india_182",
      name: "Air India Flight 182",
      value: 329,
      color: "#fb923c",
      subtitle: "Atlantic Ocean \u00b7 June 23, 1985",
      renderIcon: makeIcon("flags", "india"),
    },
    {
      id: "beslan_2004",
      name: "Beslan School Siege",
      value: 334,
      color: "#ef4444",
      subtitle: "Russia \u00b7 September 1\u20133, 2004",
      renderIcon: makeIcon("flags", "russia"),
    },
    {
      id: "yazidi_2007",
      name: "Yazidi Bombings",
      value: 796,
      color: "#fbbf24",
      subtitle: "Iraq \u00b7 August 14, 2007",
      renderIcon: makeIcon("flags", "iraq"),
    },
    {
      id: "camp_speicher_2014",
      name: "Camp Speicher Massacre",
      value: 1700,
      color: "#f43f5e",
      subtitle: "Iraq \u00b7 June 12, 2014",
      renderIcon: makeIcon("flags", "iraq"),
    },
    {
      id: "september_11",
      name: "September 11 Attacks",
      value: 2977,
      color: "#3b82f6",
      subtitle: "United States \u00b7 September 11, 2001",
      renderIcon: makeIcon("flags", "usa"),
    },
  ],
  title: "TOP 10 DEADLIEST",
  subtitle: "TERRORIST ATTACKS EVER",
  valueUnit: "killed",
  formatValue,
  sourceLabel: "Data: Global Terrorism Database, multiple sources",
  targetDuration: 30000,
};
