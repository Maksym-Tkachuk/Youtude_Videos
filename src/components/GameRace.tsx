import { useState, useEffect } from "react";
import { BarRacePlayer } from "./BarRace";
import type { BarRaceConfig } from "./BarRace/types";
import { GAMES_CONFIG } from "./BarRace/datasets/games";
import { BEST_SELLING_GENRES_CONFIG } from "./BarRace/datasets/gameGenres";
import { GAMING_REVENUE_CONFIG } from "./BarRace/datasets/gamingRevenue";
import { PLAYER_BASES_CONFIG } from "./BarRace/datasets/playerBases";
import { DEFENSE_BUDGET_CONFIG } from "./BarRace/datasets/defenseBudget";
import { ARMS_EXPORTS_CONFIG } from "./BarRace/datasets/armsExports";
import { MILITARY_GDP_CONFIG } from "./BarRace/datasets/militaryGdp";
import { WORLD_WAR_I_SPENDING_PCT_CONFIG, WORLD_WAR_II_SPENDING_PCT_CONFIG } from "./BarRace/datasets/worldWarSpendingPct";
import { MILITARY_CONFIG } from "./BarRace/datasets/military";
import { GDP_CONFIG } from "./BarRace/datasets/gdp";
import { POPULATION_CONFIG } from "./BarRace/datasets/population";
import { NUCLEAR_CONFIG } from "./BarRace/datasets/nuclear";
import { OIL_CONFIG } from "./BarRace/datasets/oil";
import { OLYMPICS_CONFIG } from "./BarRace/datasets/olympics";
import { INTERNET_CONFIG } from "./BarRace/datasets/internet";
import { FOOD_CONFIG } from "./BarRace/datasets/food";
import { AIRTRAVEL_CONFIG } from "./BarRace/datasets/airtravel";
import { DEBT_CONFIG } from "./BarRace/datasets/debt";
import { WAR_CASUALTIES_CONFIG } from "./BarRace/datasets/warCasualties";
import { WAR_DURATIONS_CONFIG } from "./BarRace/datasets/warDurations";
import { PANDEMICS_CONFIG } from "./BarRace/datasets/pandemics";
import { DICTATORS_CONFIG } from "./BarRace/datasets/dictators";
import { FAMINES_CONFIG } from "./BarRace/datasets/famines";
import { CO2_EMISSIONS_CONFIG } from "./BarRace/datasets/co2Emissions";
import { TERRORISM_DEATHS_CONFIG } from "./BarRace/datasets/terrorism";
import { EXECUTIONS_CONFIG } from "./BarRace/datasets/executions";
import { NUCLEAR_TESTS_CONFIG } from "./BarRace/datasets/nuclearTests";
import { GOLD_RESERVES_CONFIG } from "./BarRace/datasets/goldReserves";
import { PRISONERS_CONFIG } from "./BarRace/datasets/prisoners";
import { FIGHTER_JETS_CONFIG } from "./BarRace/datasets/fighterJets";
import { NAVAL_WARSHIPS_CONFIG } from "./BarRace/datasets/navalWarships";
import { REFUGEES_CONFIG } from "./BarRace/datasets/refugees";
import { STEEL_PRODUCTION_CONFIG } from "./BarRace/datasets/steelProduction";
import { ARMS_IMPORTS_CONFIG } from "./BarRace/datasets/armsImports";
import { CAR_PRODUCTION_CONFIG } from "./BarRace/datasets/carProduction";
import { SUBMARINE_FLEETS_CONFIG } from "./BarRace/datasets/submarineFleets";
import { SPACE_LAUNCHES_CONFIG } from "./BarRace/datasets/spaceLaunches";
import { ELECTRICITY_PRODUCTION_CONFIG } from "./BarRace/datasets/electricityProduction";
import { TANK_FLEETS_CONFIG } from "./BarRace/datasets/tankFleets";
import { BALLISTIC_MISSILES_CONFIG } from "./BarRace/datasets/ballisticMissiles";
import { ATTACK_HELICOPTERS_CONFIG } from "./BarRace/datasets/attackHelicopters";
import { MILITARY_BASES_CONFIG } from "./BarRace/datasets/militaryBases";
import { CHEMICAL_WEAPONS_CONFIG } from "./BarRace/datasets/chemicalWeapons";
import { MILITARY_DRONES_CONFIG } from "./BarRace/datasets/militaryDrones";
import { HOMICIDE_RATE_CONFIG } from "./BarRace/datasets/homicideRate";
import { MapPlayer } from "./MapRace";
import type { MapRaceConfig } from "./MapRace/types";
import { NUCLEAR_PROLIFERATION_CONFIG } from "./MapRace/datasets/nuclearProliferation";
import { MILITARY_SPENDING_GDP_MAP_CONFIG } from "./MapRace/datasets/militarySpending";
import { FOREIGN_AID_MAP_CONFIG } from "./MapRace/datasets/foreignAid";
import { HOMICIDE_RATE_MAP_CONFIG } from "./MapRace/datasets/homicideRate";
import { CORRUPTION_INDEX_MAP_CONFIG } from "./MapRace/datasets/corruptionIndex";
import { CountdownPlayer } from "./Countdown";
import type { CountdownConfig } from "./Countdown/types";
import { DEADLIEST_WARS_CONFIG } from "./Countdown/datasets/deadliestWars";
import { MILITARY_POWER_2025_CONFIG } from "./Countdown/datasets/militaryPower2025";
import { DEADLIEST_DICTATORS_CONFIG } from "./Countdown/datasets/deadliestDictators";
import { NUCLEAR_EXPLOSIONS_CONFIG } from "./Countdown/datasets/nuclearExplosions";
import { DEADLIEST_ATTACKS_CONFIG } from "./Countdown/datasets/deadliestAttacks";
import { ComparisonPlayer } from "./Comparison";
import type { ComparisonConfig } from "./Comparison/types";
import { USA_VS_CHINA_CONFIG } from "./Comparison/datasets/usaVsChina";
import { StackedAreaPlayer } from "./StackedArea";
import type { StackedAreaConfig } from "./StackedArea/types";
import { OIL_PRODUCERS_CONFIG } from "./StackedArea/datasets/oilProducers";
import { FlowDiagramPlayer } from "./FlowDiagram";
import type { FlowConfig } from "./FlowDiagram/types";
import { ARMS_FLOWS_CONFIG } from "./FlowDiagram/datasets/armsFlows";

// ── Dataset registries per chart type ─────────────────────────────────────

const BAR_DATASETS: { label: string; config: BarRaceConfig }[] = [
  { label: "🎮 Games",             config: GAMES_CONFIG },
  { label: "🕹️ Genres",            config: BEST_SELLING_GENRES_CONFIG },
  { label: "💰 Platforms",         config: GAMING_REVENUE_CONFIG },
  { label: "👥 Player Bases",      config: PLAYER_BASES_CONFIG },
  { label: "💣 Defense Budget",    config: DEFENSE_BUDGET_CONFIG },
  { label: "🚀 Arms Exports",      config: ARMS_EXPORTS_CONFIG },
  { label: "📊 Military % GDP",    config: MILITARY_GDP_CONFIG },
  { label: "⚔️ WWI Spend %",       config: WORLD_WAR_I_SPENDING_PCT_CONFIG },
  { label: "⚔️ WWII Spend %",      config: WORLD_WAR_II_SPENDING_PCT_CONFIG },
  { label: "🪖 Military",          config: MILITARY_CONFIG },
  { label: "💰 GDP",               config: GDP_CONFIG },
  { label: "🌍 Population",        config: POPULATION_CONFIG },
  { label: "💣 Nuclear",           config: NUCLEAR_CONFIG },
  { label: "🛢️ Oil",               config: OIL_CONFIG },
  { label: "🏆 Olympics",          config: OLYMPICS_CONFIG },
  { label: "📱 Internet",          config: INTERNET_CONFIG },
  { label: "🌾 Food",              config: FOOD_CONFIG },
  { label: "✈️ Air Travel",        config: AIRTRAVEL_CONFIG },
  { label: "💸 Debt",              config: DEBT_CONFIG },
  { label: "💀 War Casualties",    config: WAR_CASUALTIES_CONFIG },
  { label: "⏳ War Durations",     config: WAR_DURATIONS_CONFIG },
  { label: "🦠 Pandemics",         config: PANDEMICS_CONFIG },
  { label: "👤 Dictators",         config: DICTATORS_CONFIG },
  { label: "🌾 Famines",           config: FAMINES_CONFIG },
  { label: "🏭 CO2 Emissions",     config: CO2_EMISSIONS_CONFIG },
  { label: "💥 Terrorism Deaths",  config: TERRORISM_DEATHS_CONFIG },
  { label: "⚖️ Executions",        config: EXECUTIONS_CONFIG },
  { label: "☢️ Nuclear Tests",     config: NUCLEAR_TESTS_CONFIG },
  { label: "🥇 Gold Reserves",     config: GOLD_RESERVES_CONFIG },
  { label: "🔒 Prisoners",         config: PRISONERS_CONFIG },
  { label: "✈️ Fighter Jets",      config: FIGHTER_JETS_CONFIG },
  { label: "🚢 Naval Warships",    config: NAVAL_WARSHIPS_CONFIG },
  { label: "🏃 Refugees",          config: REFUGEES_CONFIG },
  { label: "🏗️ Steel Production",  config: STEEL_PRODUCTION_CONFIG },
  { label: "🔫 Arms Imports",      config: ARMS_IMPORTS_CONFIG },
  { label: "🚗 Car Production",    config: CAR_PRODUCTION_CONFIG },
  { label: "🛥️ Submarine Fleets",  config: SUBMARINE_FLEETS_CONFIG },
  { label: "🚀 Space Launches",    config: SPACE_LAUNCHES_CONFIG },
  { label: "⚡ Electricity",       config: ELECTRICITY_PRODUCTION_CONFIG },
  { label: "🛡️ Tank Fleets",       config: TANK_FLEETS_CONFIG },
  { label: "🚀 Ballistic Missiles", config: BALLISTIC_MISSILES_CONFIG },
  { label: "🚁 Attack Helicopters", config: ATTACK_HELICOPTERS_CONFIG },
  { label: "🏗️ Military Bases",     config: MILITARY_BASES_CONFIG },
  { label: "☠️ Chemical Weapons",   config: CHEMICAL_WEAPONS_CONFIG },
  { label: "🤖 Military Drones",    config: MILITARY_DRONES_CONFIG },
  { label: "🔪 Homicide Rates",     config: HOMICIDE_RATE_CONFIG },
];

const MAP_DATASETS: { label: string; config: MapRaceConfig }[] = [
  { label: "☢️ Nuclear Proliferation", config: NUCLEAR_PROLIFERATION_CONFIG },
  { label: "💰 Military Spending % GDP", config: MILITARY_SPENDING_GDP_MAP_CONFIG },
  { label: "🤝 Foreign Aid Generosity", config: FOREIGN_AID_MAP_CONFIG },
  { label: "🔪 Homicide Rate", config: HOMICIDE_RATE_MAP_CONFIG },
  { label: "💰 Corruption Index", config: CORRUPTION_INDEX_MAP_CONFIG },
];

const COUNTDOWN_DATASETS: { label: string; config: CountdownConfig }[] = [
  { label: "🪖 Military Power 2025", config: MILITARY_POWER_2025_CONFIG },
  { label: "💀 Deadliest Wars", config: DEADLIEST_WARS_CONFIG },
  { label: "💀 Deadliest Dictators", config: DEADLIEST_DICTATORS_CONFIG },
  { label: "☢️ Largest Nuclear Explosions", config: NUCLEAR_EXPLOSIONS_CONFIG },
  { label: "💥 Deadliest Terrorist Attacks", config: DEADLIEST_ATTACKS_CONFIG },
];

const COMPARISON_DATASETS: { label: string; config: ComparisonConfig }[] = [
  { label: "🇺🇸 USA vs China 🇨🇳", config: USA_VS_CHINA_CONFIG },
];

const STACKED_DATASETS: { label: string; config: StackedAreaConfig }[] = [
  { label: "🛢️ Oil Producers", config: OIL_PRODUCERS_CONFIG },
];

const FLOW_DATASETS: { label: string; config: FlowConfig }[] = [
  { label: "🔫 Arms Trade Flows", config: ARMS_FLOWS_CONFIG },
];

// Flat list for the recorder
const ALL_DATASETS = [
  ...BAR_DATASETS.map(d => ({ ...d, type: "bar" as const })),
  ...MAP_DATASETS.map(d => ({ ...d, type: "map" as const })),
  ...COUNTDOWN_DATASETS.map(d => ({ ...d, type: "countdown" as const })),
  ...COMPARISON_DATASETS.map(d => ({ ...d, type: "comparison" as const })),
  ...STACKED_DATASETS.map(d => ({ ...d, type: "stacked" as const })),
  ...FLOW_DATASETS.map(d => ({ ...d, type: "flow" as const })),
];

type ChartType = "bar" | "map" | "countdown" | "comparison" | "stacked" | "flow";

const TABS: { type: ChartType; label: string; icon: string }[] = [
  { type: "bar", label: "Bar Race", icon: "📊" },
  { type: "map", label: "World Map", icon: "🗺️" },
  { type: "countdown", label: "Countdown", icon: "🔟" },
  { type: "comparison", label: "VS Duel", icon: "⚔️" },
  { type: "stacked", label: "Stacked", icon: "📈" },
  { type: "flow", label: "Flow", icon: "🔀" },
];

export default function GameRace() {
  const [chartType, setChartType] = useState<ChartType>(() => {
    if (typeof window === "undefined") return "bar";
    const p = new URLSearchParams(window.location.search).get("dataset");
    if (p !== null) {
      const idx = parseInt(p, 10) || 0;
      if (idx < BAR_DATASETS.length) return "bar";
      if (idx < BAR_DATASETS.length + MAP_DATASETS.length) return "map";
      if (idx < BAR_DATASETS.length + MAP_DATASETS.length + COUNTDOWN_DATASETS.length) return "countdown";
      const compEnd = BAR_DATASETS.length + MAP_DATASETS.length + COUNTDOWN_DATASETS.length + COMPARISON_DATASETS.length;
      if (idx < compEnd) return "comparison";
      if (idx < compEnd + STACKED_DATASETS.length) return "stacked";
      return "flow";
    }
    return "bar";
  });

  const [barIdx, setBarIdx] = useState(() => {
    if (typeof window === "undefined") return 0;
    const p = new URLSearchParams(window.location.search).get("dataset");
    if (p !== null) {
      const idx = parseInt(p, 10) || 0;
      if (idx < BAR_DATASETS.length) return idx;
    }
    return 0;
  });

  const [mapIdx, setMapIdx] = useState(() => {
    if (typeof window === "undefined") return 0;
    const p = new URLSearchParams(window.location.search).get("dataset");
    if (p !== null) {
      const idx = parseInt(p, 10) || 0;
      const mapStart = BAR_DATASETS.length;
      if (idx >= mapStart && idx < mapStart + MAP_DATASETS.length) return idx - mapStart;
    }
    return 0;
  });

  const [countdownIdx, setCountdownIdx] = useState(() => {
    if (typeof window === "undefined") return 0;
    const p = new URLSearchParams(window.location.search).get("dataset");
    if (p !== null) {
      const idx = parseInt(p, 10) || 0;
      const cdStart = BAR_DATASETS.length + MAP_DATASETS.length;
      if (idx >= cdStart && idx < cdStart + COUNTDOWN_DATASETS.length) return idx - cdStart;
    }
    return 0;
  });

  const [compIdx, setCompIdx] = useState(0);
  const [stackedIdx, setStackedIdx] = useState(0);
  const [flowIdx, setFlowIdx] = useState(0);

  // Expose dataset metadata for the recording script
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const br = (window as any).__barRace;
    if (!br) return;
    br.datasetCount = ALL_DATASETS.length;
    br.datasetLabels = ALL_DATASETS.map(d => d.label);
  });

  const datasets = chartType === "bar" ? BAR_DATASETS : chartType === "map" ? MAP_DATASETS : chartType === "countdown" ? COUNTDOWN_DATASETS : chartType === "comparison" ? COMPARISON_DATASETS : chartType === "stacked" ? STACKED_DATASETS : FLOW_DATASETS;
  const selected = chartType === "bar" ? barIdx : chartType === "map" ? mapIdx : chartType === "countdown" ? countdownIdx : chartType === "comparison" ? compIdx : chartType === "stacked" ? stackedIdx : flowIdx;
  const setSelected = chartType === "bar" ? setBarIdx : chartType === "map" ? setMapIdx : chartType === "countdown" ? setCountdownIdx : chartType === "comparison" ? setCompIdx : chartType === "stacked" ? setStackedIdx : setFlowIdx;

  return (
    <div
      data-testid="game-race"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: 16,
        background: "#080c14",
      }}
    >
      {/* Chart type tabs */}
      <div style={{ display: "flex", gap: 4, background: "#1a2235", borderRadius: 10, padding: 3 }}>
        {TABS.map(tab => (
          <button
            key={tab.type}
            onClick={() => setChartType(tab.type)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              background: chartType === tab.type
                ? "linear-gradient(90deg, #ffd60a, #ffb703)"
                : "transparent",
              color: chartType === tab.type ? "#0d1120" : "#86a6c8",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Dataset selector */}
      <div
        data-testid="game-race-dataset-selector"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
      >
        {datasets.map((ds, i) => (
          <button
            key={ds.label}
            data-testid={`game-race-dataset-button-${i}`}
            onClick={() => setSelected(i)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${i === selected ? "#ffb703" : "#1e2d45"}`,
              cursor: "pointer",
              fontWeight: i === selected ? 700 : 400,
              background: i === selected
                ? "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)"
                : "#1a2235",
              color: i === selected ? "#0d1120" : "#86a6c8",
              fontSize: 13,
              boxShadow: i === selected ? "0 0 12px rgba(255, 214, 10, 0.25)" : "none",
              transition: "background 0.15s, box-shadow 0.15s, color 0.15s, border-color 0.15s",
            }}
          >
            {ds.label}
          </button>
        ))}
      </div>

      {/* Player */}
      <div data-testid="game-race-player">
        {chartType === "map" ? (
          <MapPlayer
            key={`map-${mapIdx}`}
            config={MAP_DATASETS[mapIdx].config}
          />
        ) : chartType === "countdown" ? (
          <CountdownPlayer
            key={`cd-${countdownIdx}`}
            config={COUNTDOWN_DATASETS[countdownIdx].config}
          />
        ) : chartType === "comparison" ? (
          <ComparisonPlayer
            key={`comp-${compIdx}`}
            config={COMPARISON_DATASETS[compIdx].config}
          />
        ) : chartType === "stacked" ? (
          <StackedAreaPlayer
            key={`stacked-${stackedIdx}`}
            config={STACKED_DATASETS[stackedIdx].config}
          />
        ) : chartType === "flow" ? (
          <FlowDiagramPlayer
            key={`flow-${flowIdx}`}
            config={FLOW_DATASETS[flowIdx].config}
          />
        ) : (
          <BarRacePlayer
            key={`bar-${barIdx}`}
            config={BAR_DATASETS[barIdx].config}
            datasets={BAR_DATASETS}
            selectedDataset={barIdx}
            onDatasetChange={setBarIdx}
          />
        )}
      </div>
    </div>
  );
}
