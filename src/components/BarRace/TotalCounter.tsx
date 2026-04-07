interface TotalCounterProps {
  totalValue: number;
  maxTotal: number;
  unitLabel: string;
  formatValue: (n: number) => string;
}

export default function TotalCounter({ totalValue, maxTotal, unitLabel, formatValue }: TotalCounterProps) {
  return (
    <div data-testid="bar-race-total-counter" style={{ padding: "8px 16px 4px" }}>
      <div data-testid="bar-race-total-counter-header" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
      }}>
        <span data-testid="bar-race-total-counter-label" style={{
          fontSize: 9,
          fontWeight: 600,
          color: "#86a6c8",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}>
          {unitLabel}
        </span>
        <span data-testid="bar-race-total-counter-value" style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#fff0ad",
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatValue(totalValue)}
        </span>
      </div>
      <div data-testid="bar-race-total-counter-track" style={{
        width: "100%",
        height: 6,
        background: "#1a2235",
        borderRadius: 3,
        overflow: "hidden",
      }}>
        <div data-testid="bar-race-total-counter-fill" style={{
          width: `${Math.min(100, (totalValue / maxTotal) * 100)}%`,
          height: "100%",
          background: "linear-gradient(90deg, #ffd60a, #ffb703, #ff9500)",
          borderRadius: 3,
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(255, 183, 3, 0.35)",
        }} />
      </div>
    </div>
  );
}
