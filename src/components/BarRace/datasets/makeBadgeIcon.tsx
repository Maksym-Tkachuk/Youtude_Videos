import type { BarRaceItem } from "../types";

type BadgeVariant =
  | "plain"
  | "arcade"
  | "controller"
  | "crosshair"
  | "wheel"
  | "sword"
  | "grid"
  | "music"
  | "shield"
  | "cards"
  | "desktop"
  | "phone"
  | "handheld"
  | "console"
  | "cloud"
  | "vr";

function renderVariant(variant: BadgeVariant, accent: string) {
  switch (variant) {
    case "arcade":
      return (
        <>
          <rect x="9.5" y="5.5" width="13" height="9" rx="2" fill="none" stroke={accent} strokeWidth="1.7" />
          <circle cx="13" cy="10" r="1.7" fill={accent} />
          <path d="M18 8.5 H20.5 M19.25 7.25 V9.75" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "controller":
      return (
        <>
          <path d="M9 10.2 C10.8 7.4 21.2 7.4 23 10.2 C24.3 12.3 22.8 15.4 20.6 15.4 H11.4 C9.2 15.4 7.7 12.3 9 10.2 Z" fill="none" stroke={accent} strokeWidth="1.6" />
          <path d="M12.2 11.6 H15 M13.6 10.2 V13" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="19.2" cy="11" r="1.1" fill={accent} />
          <circle cx="21.1" cy="12.6" r="1.1" fill={accent} />
        </>
      );
    case "crosshair":
      return (
        <>
          <circle cx="16" cy="10.6" r="4" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="16" cy="10.6" r="1.1" fill={accent} />
          <path d="M16 5.1 V6.7 M16 14.5 V16.1 M10.5 10.6 H12.1 M19.9 10.6 H21.5" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    case "wheel":
      return (
        <>
          <circle cx="16" cy="10.8" r="4.2" fill="none" stroke={accent} strokeWidth="1.6" />
          <circle cx="16" cy="10.8" r="1.1" fill={accent} />
          <path d="M16 6.6 V10.8 M12.9 8.6 L16 10.8 M19.1 8.6 L16 10.8" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    case "sword":
      return (
        <>
          <path d="M20.8 5.7 L16.8 9.7 L18.5 11.4 L22.5 7.4 V5.7 H20.8 Z" fill="none" stroke={accent} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M15.6 10.8 L11.8 14.6" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10.6 13.4 L12.9 15.7" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "grid":
      return (
        <>
          <rect x="10.5" y="6.5" width="11" height="8.5" rx="1.6" fill="none" stroke={accent} strokeWidth="1.5" />
          <path d="M14.2 6.5 V15 M17.9 6.5 V15 M10.5 10.8 H21.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
        </>
      );
    case "music":
      return (
        <>
          <path d="M17.5 6.2 V12.2 C17.5 13.4 16.5 14.4 15.3 14.4 C14.1 14.4 13.1 13.4 13.1 12.2 C13.1 11 14.1 10 15.3 10 C15.8 10 16.2 10.1 16.6 10.4 V7.3 L21 6 V11.2 C21 12.4 20 13.4 18.8 13.4 C17.6 13.4 16.6 12.4 16.6 11.2 C16.6 10 17.6 9 18.8 9 C19.2 9 19.7 9.1 20 9.3" fill="none" stroke={accent} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M16 5.8 L21.8 7.7 V11.3 C21.8 14.3 19.6 17 16 18.2 C12.4 17 10.2 14.3 10.2 11.3 V7.7 L16 5.8 Z" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M13.4 11.6 L15.2 13.4 L18.8 9.8" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "cards":
      return (
        <>
          <rect x="10.2" y="7.2" width="7.5" height="9" rx="1.4" fill="none" stroke={accent} strokeWidth="1.3" />
          <rect x="14.3" y="5.8" width="7.5" height="9" rx="1.4" fill="none" stroke={accent} strokeWidth="1.3" />
          <path d="M18 8.8 C18.7 7.8 20.2 8.2 20.2 9.5 C20.2 10.8 18.7 11.2 18 12.2 C17.3 11.2 15.8 10.8 15.8 9.5 C15.8 8.2 17.3 7.8 18 8.8 Z" fill={accent} opacity="0.9" />
        </>
      );
    case "desktop":
      return (
        <>
          <rect x="9.5" y="6" width="13" height="8.7" rx="1.7" fill="none" stroke={accent} strokeWidth="1.5" />
          <path d="M14 16.8 H18 M16 14.7 V16.8" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "phone":
      return (
        <>
          <rect x="12.1" y="5.4" width="7.8" height="11.8" rx="2.2" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="16" cy="14.9" r="0.8" fill={accent} />
        </>
      );
    case "handheld":
      return (
        <>
          <rect x="8.8" y="7" width="14.4" height="8.8" rx="2.3" fill="none" stroke={accent} strokeWidth="1.5" />
          <rect x="12.6" y="8.9" width="6.8" height="4.8" rx="0.9" fill="none" stroke={accent} strokeWidth="1.2" />
          <path d="M10.7 10.8 H12.1 M11.4 10.1 V11.5" stroke={accent} strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="21" cy="10.2" r="0.8" fill={accent} />
          <circle cx="21.8" cy="11.6" r="0.8" fill={accent} />
        </>
      );
    case "console":
      return (
        <>
          <rect x="10.4" y="6.3" width="11.2" height="9.2" rx="1.8" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="15.9" cy="10.9" r="2.6" fill="none" stroke={accent} strokeWidth="1.2" />
          <circle cx="15.9" cy="10.9" r="0.9" fill={accent} />
        </>
      );
    case "cloud":
      return (
        <>
          <path d="M11.8 14.2 H20.5 C22.2 14.2 23.6 12.9 23.6 11.2 C23.6 9.7 22.4 8.4 21 8.2 C20.5 6.5 18.9 5.3 17 5.3 C14.8 5.3 13 6.9 12.7 9 C10.9 9.1 9.5 10.6 9.5 12.4 C9.5 13.4 10.2 14.2 11.8 14.2 Z" fill="none" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
        </>
      );
    case "vr":
      return (
        <>
          <rect x="9.2" y="8.4" width="13.6" height="5.8" rx="2.9" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="13.2" cy="11.3" r="1.1" fill={accent} />
          <circle cx="18.8" cy="11.3" r="1.1" fill={accent} />
          <path d="M9.2 11.3 H22.8" stroke={accent} strokeWidth="1.1" opacity="0.75" />
        </>
      );
    case "plain":
    default:
      return (
        <>
          <circle cx="16" cy="10.8" r="4.2" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="16" cy="10.8" r="1.2" fill={accent} />
        </>
      );
  }
}

export function makeBadgeIcon(
  label: string,
  fill: string,
  accent: string,
  variant: BadgeVariant = "plain",
): BarRaceItem["renderIcon"] {
  const fontSize = label.length >= 5 ? 6.6 : label.length === 4 ? 7.2 : label.length === 3 ? 8.1 : 9.3;

  return (_barColor: string, size: number) => (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`badge-fill-${label}-${fill.replace("#", "")}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={fill} />
          <stop offset="1" stopColor="#0d1120" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="27" height="27" rx="8" fill={`url(#badge-fill-${label}-${fill.replace("#", "")})`} stroke="rgba(255,255,255,0.08)" />
      <rect x="5.2" y="5.2" width="21.6" height="12.8" rx="5.4" fill="rgba(8,12,20,0.34)" />
      {renderVariant(variant, accent)}
      <text
        x="16"
        y="24.2"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        fill="rgba(255,255,255,0.96)"
        letterSpacing="0.3"
      >
        {label}
      </text>
    </svg>
  );
}
