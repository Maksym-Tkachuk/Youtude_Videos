import { useState } from "react";
import { BarRacePlayer } from "./BarRace";
import { GAMES_CONFIG } from "./BarRace/datasets/games";
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

const DATASETS = [
  { label: "🎮 Games",       config: GAMES_CONFIG },
  { label: "🪖 Military",    config: MILITARY_CONFIG },
  { label: "💰 GDP",         config: GDP_CONFIG },
  { label: "🌍 Population",  config: POPULATION_CONFIG },
  { label: "💣 Nuclear",     config: NUCLEAR_CONFIG },
  { label: "🛢️ Oil",         config: OIL_CONFIG },
  { label: "🏆 Olympics",    config: OLYMPICS_CONFIG },
  { label: "📱 Internet",    config: INTERNET_CONFIG },
  { label: "🌾 Food",        config: FOOD_CONFIG },
  { label: "✈️ Air Travel",  config: AIRTRAVEL_CONFIG },
  { label: "💸 Debt",        config: DEBT_CONFIG },
];

export default function GameRace() {
  const [selected, setSelected] = useState(0);

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
