import type { ReactNode } from "react";
import type { BarRaceItemWithValue } from "./types";

interface BarRowProps {
  item: BarRaceItemWithValue;
  rank: number;
  rankDelta: number;
  pct: number;
  barHeight: number;
  isFirst: boolean;
  isPulsing?: boolean;
  isNewEntry?: boolean;
  formatValue: (n: number) => string;
  formatValueFull: (n: number) => string;
  unitIcon?: ReactNode;
  valueUnit?: string;
  barTrackBg: string;
  fontBody: string;
  testIdPrefix: string;
  testIdIndex: number;
  disableTransitions?: boolean;
}

function DefaultItemIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect x="3" y="3" width="26" height="26" rx="6" fill="rgba(9,14,26,0.92)" stroke="rgba(255,255,255,0.08)" />
      <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.95" />
      <path d="M10 22 L14.5 17.5 L18 20.5 L22 15" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BarRow({ item, rank, rankDelta, pct, barHeight, isFirst, isPulsing, isNewEntry, formatValue, formatValueFull, unitIcon, valueUnit, barTrackBg, fontBody, testIdPrefix, testIdIndex, disableTransitions }: BarRowProps) {
  const iconSize = 30;
  const rankColor = rank < 3 ? "#ffd60a" : "#86a6c8";
  const itemTestId = `${testIdPrefix}-row-${testIdIndex}`;

  const arrowColor = rankDelta > 0 ? "#4ade80" : rankDelta < 0 ? "#f87171" : "transparent";
  const arrowSymbol = rankDelta > 0 ? "▲" : rankDelta < 0 ? "▼" : "·";

  // Dynamic threshold: only show inside-bar text when fill is wide enough to fit it
  // Row layout: rank(18) + gap(5) + arrow(10) + gap(5) + icon(30) + gap(5) = 73px fixed
  // Content area ≈ 381px (canvas 405 - 24px slot padding) - 73px = ~308px
  const CONTENT_WIDTH_PX = 308;
  const fullValueText = formatValueFull(item.value);
  const estimatedTextPx = fullValueText.length * 6.5 + (unitIcon ? 16 : 0) + 14; // 14 = paddingRight + gap
  const minPctToShow = (estimatedTextPx / CONTENT_WIDTH_PX) * 100;

  return (
    <div data-testid={itemTestId} style={{
      display: "flex", alignItems: "center", gap: 5, height: barHeight, fontFamily: fontBody,
      animation: isNewEntry ? "rowSlideIn 0.35s ease-out" : "none",
    }}>
      {/* Rank */}
      <span data-testid={`${itemTestId}-rank`} style={{
        fontSize: 13,
        fontWeight: 800,
        color: rankColor,
        width: 18,
        textAlign: "right",
        flexShrink: 0,
        textShadow: rank < 3 ? `0 0 8px ${rankColor}88` : "none",
      }}>
        #{rank + 1}
      </span>

      {/* Rank change arrow */}
      <span data-testid={`${itemTestId}-rank-delta`} style={{
        fontSize: 10,
        fontWeight: 800,
        color: arrowColor,
        width: 10,
        textAlign: "center",
        flexShrink: 0,
        alignSelf: "flex-end",
        paddingBottom: 10,
        lineHeight: 1,
      }}>
        {arrowSymbol}
      </span>

      {/* Icon */}
      <div data-testid={`${itemTestId}-icon-container`} style={{
        width: iconSize,
        height: iconSize,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        alignSelf: "flex-end",
      }}>
        {item.renderIcon ? (
          <div data-testid={`${itemTestId}-icon`} style={{ width: "100%", height: "100%", display: "flex" }}>
            {item.renderIcon(item.color, iconSize)}
          </div>
        ) : (
          <div data-testid={`${itemTestId}-icon-fallback`} style={{ width: "100%", height: "100%", display: "flex" }}>
            <DefaultItemIcon color={item.color} size={iconSize} />
          </div>
        )}
      </div>

      {/* Bar + label area */}
      <div data-testid={`${itemTestId}-content`} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
        <div data-testid={`${itemTestId}-header`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span data-testid={`${itemTestId}-name`} style={{
            fontSize: 13,
            fontWeight: isFirst ? 700 : 600,
            color: item.color,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {item.name}
          </span>
<div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0, marginLeft: 4 }}>
            <span data-testid={`${itemTestId}-value`} style={{
              fontSize: 12,
              fontWeight: 700,
              color: item.color,
              fontVariantNumeric: "tabular-nums",
            }}>
              {formatValue(item.value)}
            </span>
            {valueUnit && (
              <span data-testid={`${itemTestId}-value-unit`} style={{
                fontSize: 9,
                fontWeight: 600,
                color: item.color,
                opacity: 0.7,
                whiteSpace: "nowrap",
              }}>
                {valueUnit}
              </span>
            )}
          </div>
        </div>

        <div data-testid={`${itemTestId}-track`} style={{
          width: "100%",
          height: 22,
          background: barTrackBg,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}>
          <div data-testid={`${itemTestId}-fill`} style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${item.color}cc, ${item.color}ff)`,
            borderRadius: 4,
            transition: disableTransitions ? "none" : "width 0.18s ease-out",
            boxShadow: isPulsing ? `0 0 28px ${item.color}ff, 0 0 8px ${item.color}cc` : rank < 3 ? `0 0 14px ${item.color}88` : "none",
            animation: isPulsing ? "barPulse 0.8s ease-in-out infinite alternate" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 6,
            boxSizing: "border-box",
          }}>
            {pct > minPctToShow && (
              <div data-testid={`${itemTestId}-full-value-group`} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span data-testid={`${itemTestId}-full-value`} style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.95)",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}>
                  {formatValueFull(item.value)}
                </span>
                {unitIcon && (
                  <span data-testid={`${itemTestId}-unit-icon`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {unitIcon}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
