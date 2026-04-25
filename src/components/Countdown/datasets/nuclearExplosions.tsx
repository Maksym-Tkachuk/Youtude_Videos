import type { CountdownConfig } from "../types";
import { makeIcon } from "../../BarRace/datasets/makeIcon";

const formatValue = (n: number): string => {
  return `${(n / 1000).toFixed(1)} Mt`;
};

export const NUCLEAR_EXPLOSIONS_CONFIG: CountdownConfig = {
  // Ordered #10 (first, lowest yield) to #1 (last, highest yield)
  // Values in kilotons
  items: [
    {
      id: "ivy_mike",
      name: "Ivy Mike",
      value: 10400,
      color: "#3b82f6",
      subtitle: "USA \u00b7 1952 \u00b7 First H-bomb",
      renderIcon: makeIcon("flags", "usa"),
    },
    {
      id: "castle_romeo",
      name: "Castle Romeo",
      value: 11000,
      color: "#60a5fa",
      subtitle: "USA \u00b7 1954 \u00b7 Bikini Atoll",
      renderIcon: makeIcon("flags", "usa"),
    },
    {
      id: "test_123",
      name: "Soviet Test #123",
      value: 12500,
      color: "#ef4444",
      subtitle: "USSR \u00b7 1962 \u00b7 Novaya Zemlya",
      renderIcon: makeIcon("flags", "ussr"),
    },
    {
      id: "castle_yankee",
      name: "Castle Yankee",
      value: 13500,
      color: "#38bdf8",
      subtitle: "USA \u00b7 1954 \u00b7 Bikini Atoll",
      renderIcon: makeIcon("flags", "usa"),
    },
    {
      id: "castle_bravo",
      name: "Castle Bravo",
      value: 15000,
      color: "#818cf8",
      subtitle: "USA \u00b7 1954 \u00b7 Biggest US test",
      renderIcon: makeIcon("flags", "usa"),
    },
    {
      id: "test_173",
      name: "Soviet Test #173",
      value: 19100,
      color: "#dc2626",
      subtitle: "USSR \u00b7 1962 \u00b7 Novaya Zemlya",
      renderIcon: makeIcon("flags", "ussr"),
    },
    {
      id: "test_174",
      name: "Soviet Test #174",
      value: 20000,
      color: "#f97316",
      subtitle: "USSR \u00b7 1962 \u00b7 Novaya Zemlya",
      renderIcon: makeIcon("flags", "ussr"),
    },
    {
      id: "test_147",
      name: "Soviet Test #147",
      value: 21100,
      color: "#f43f5e",
      subtitle: "USSR \u00b7 1961 \u00b7 Novaya Zemlya",
      renderIcon: makeIcon("flags", "ussr"),
    },
    {
      id: "test_219",
      name: "Soviet Test #219",
      value: 24200,
      color: "#fb923c",
      subtitle: "USSR \u00b7 1962 \u00b7 Novaya Zemlya",
      renderIcon: makeIcon("flags", "ussr"),
    },
    {
      id: "tsar_bomba",
      name: "Tsar Bomba",
      value: 50000,
      color: "#fbbf24",
      subtitle: "USSR \u00b7 1961 \u00b7 50 Megatons",
      renderIcon: makeIcon("flags", "ussr"),
    },
  ],
  title: "TOP 10 LARGEST",
  subtitle: "NUCLEAR EXPLOSIONS EVER",
  valueUnit: "yield",
  formatValue,
  sourceLabel: "Data: CTBTO, Nuclear Weapons Archive",
  targetDuration: 30000,
};
