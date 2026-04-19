interface TimelineTheme {
  bg: string;
  gradient: string;
  dot: string;
  labelColor: string;
  labelActiveColor: string;
}

interface TimelineProps {
  frameIdx: number;
  totalFrames: number;
  currentYear: number;
  startYear: number;
  endYear: number;
  intervalYears: number;
  fontBody: string;
  testIdPrefix: string;
  theme: TimelineTheme;
}

const TIMELINE_CONTENT_WIDTH_PX = 381;
const MIN_LABEL_GAP_PX = 4;

function estimateLabelWidthPx(year: number) {
  return Math.max(22, String(year).length * 5.5 + 4);
}

function getLabelBoundsPct(year: number, positionPct: number, placement: "first" | "middle" | "last") {
  const widthPct = (estimateLabelWidthPx(year) / TIMELINE_CONTENT_WIDTH_PX) * 100;

  if (placement === "first") {
    return { left: positionPct, right: positionPct + widthPct };
  }

  if (placement === "last") {
    return { left: positionPct - widthPct, right: positionPct };
  }

  return {
    left: positionPct - widthPct / 2,
    right: positionPct + widthPct / 2,
  };
}

export default function Timeline({ frameIdx, totalFrames, currentYear, startYear, endYear, intervalYears, fontBody, testIdPrefix, theme }: TimelineProps) {
  const progress = totalFrames > 1 ? frameIdx / (totalFrames - 1) : 0;
  const yearRange = Math.max(1, endYear - startYear);
  const minLabelGapPct = (MIN_LABEL_GAP_PX / TIMELINE_CONTENT_WIDTH_PX) * 100;

  // Generate evenly-spaced labels starting from startYear by intervalYears steps.
  // Only append endYear if it is not already on the grid AND the remaining gap is
  // at least 70% of intervalYears — this prevents a short stub at the end.
  const rawLabelYears: number[] = [];
  for (let y = startYear; y <= endYear; y += intervalYears) {
    rawLabelYears.push(y);
  }
  const lastGridYear = rawLabelYears[rawLabelYears.length - 1];
  if (lastGridYear < endYear && (endYear - lastGridYear) >= intervalYears * 0.7) {
    rawLabelYears.push(endYear);
  }

  const orderedLabelYears = rawLabelYears;
  const filteredLabelYears: Array<{ year: number; placement: "first" | "middle" | "last"; left: number; right: number }> = [];

  orderedLabelYears.forEach((year, index) => {
    const placement = index === 0 ? "first" : index === orderedLabelYears.length - 1 ? "last" : "middle";
    const positionPct = ((year - startYear) / yearRange) * 100;
    const bounds = getLabelBoundsPct(year, positionPct, placement);

    if (filteredLabelYears.length === 0) {
      filteredLabelYears.push({ year, placement, ...bounds });
      return;
    }

    if (placement === "last") {
      while (
        filteredLabelYears.length > 1 &&
        bounds.left < filteredLabelYears[filteredLabelYears.length - 1].right + minLabelGapPct
      ) {
        filteredLabelYears.pop();
      }

      filteredLabelYears.push({ year, placement, ...bounds });
      return;
    }

    const lastKept = filteredLabelYears[filteredLabelYears.length - 1];
    const overlapsPrevious = bounds.left < lastKept.right + minLabelGapPct;

    if (!overlapsPrevious) {
      filteredLabelYears.push({ year, placement, ...bounds });
    }
  });

  return (
    <div data-testid={`${testIdPrefix}-timeline`} style={{ padding: "8px 12px 6px", fontFamily: fontBody }}>
      <div data-testid={`${testIdPrefix}-timeline-track`} style={{
        width: "100%",
        height: 2,
        background: theme.bg,
        borderRadius: 1,
        position: "relative",
        marginBottom: 6,
      }}>
        <div data-testid={`${testIdPrefix}-timeline-progress`} style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: theme.gradient,
          borderRadius: 1,
          transition: "width 0.1s linear",
        }} />
        <div data-testid={`${testIdPrefix}-timeline-dot`} style={{
          position: "absolute",
          left: `${progress * 100}%`,
          top: -3,
          width: 8,
          height: 8,
          background: theme.dot,
          borderRadius: "50%",
          transform: "translateX(-50%)",
          boxShadow: `0 0 6px ${theme.dot}`,
          transition: "left 0.1s linear",
        }} />
      </div>
      <div data-testid={`${testIdPrefix}-timeline-labels`} style={{ position: "relative", height: 14, fontSize: 10, letterSpacing: 0.4, lineHeight: 1.1 }}>
        {filteredLabelYears.map(({ year, placement }, index) => {
          const positionPct = ((year - startYear) / yearRange) * 100;
          const isFirst = placement === "first";
          const isLast = placement === "last";
          const isReached = currentYear >= year;
          const isActive = currentYear === year;

          return (
          <span key={year} data-testid={`${testIdPrefix}-timeline-label-${index}`} style={{
            position: "absolute",
            left: `${positionPct}%`,
            transform: isFirst ? "translateX(0)" : isLast ? "translateX(-100%)" : "translateX(-50%)",
            color: isActive ? theme.labelActiveColor : theme.labelColor,
            fontWeight: isActive ? 700 : 600,
            fontSize: isActive ? 12 : 10,
            textShadow: isActive ? `0 0 10px ${theme.labelActiveColor}88` : "none",
            whiteSpace: "nowrap",
            opacity: isReached ? 1 : 0,
            transition: "opacity 0.4s ease, font-size 0.2s ease, color 0.3s ease",
          }}>
            {year}
          </span>
          );
        })}

      </div>
    </div>
  );
}
