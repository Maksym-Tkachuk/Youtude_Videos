import { useState, useEffect } from "react";
import { BarRacePlayer } from "./BarRace";
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

const DATASETS = [
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
];

export default function GameRace() {
  const [selected, setSelected] = useState(() => {
    if (typeof window === "undefined") return 0;
    const p = new URLSearchParams(window.location.search).get("dataset");
    return p !== null ? Math.max(0, Math.min(DATASETS.length - 1, parseInt(p, 10) || 0)) : 0;
  });

  // Expose dataset metadata for the recording script
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const br = (window as any).__barRace;
    if (!br) return;
    br.datasetCount = DATASETS.length;
    br.datasetLabels = DATASETS.map(d => d.label);
  });

  return (
    <div
      data-testid="game-race"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 16,
        background: "#080c14",
      }}
    >
      <div
        data-testid="game-race-dataset-selector"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
      >
        {DATASETS.map((ds, i) => (
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
      <div data-testid="game-race-player">
        <BarRacePlayer
          key={selected}
          config={DATASETS[selected].config}
          datasets={DATASETS}
          selectedDataset={selected}
          onDatasetChange={setSelected}
        />
      </div>
    </div>
  );
}
