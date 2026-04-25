import type { ComparisonConfig } from "../types";

function fmt(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

function fmtUsd(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}T`;
  return `$${n}B`;
}

const s = 16;

// Each icon uses a color appropriate to what it represents
const cOlive = "#88ee44";   // troops — lime green
const cKhaki = "#ffaa33";   // reserve — bright orange
const cSteel = "#ff8844";   // tanks — warm orange-red
const cSky = "#ff6688";     // jets — pink-red
const cArmy = "#44ff88";    // helicopters — mint green
const cNavy = "#ff4466";    // warships — coral red
const cDeep = "#ffcc44";    // submarines — yellow
const cNuke = "#ff2222";    // nuclear — bright red
const cGrey = "#dd66ff";    // drones — bright purple
const cGold = "#ffee44";    // budget — bright yellow

const troopsIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="9" r="5" fill={cOlive} opacity="0.2" stroke={cOlive} strokeWidth="1.5"/>
  <path d="M8 28v-3c0-4.4 3.6-8 8-8s8 3.6 8 8v3" fill={cOlive} opacity="0.15" stroke={cOlive} strokeWidth="1.5"/>
  <path d="M10 7c0-3 2.7-5 6-5s6 2 6 5" stroke={cOlive} strokeWidth="1.5" strokeLinecap="round"/>
  <rect x="9" y="6" width="14" height="2" rx="1" fill={cOlive} opacity="0.4"/>
</svg>;

const reserveIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <circle cx="11" cy="10" r="4" fill={cKhaki} opacity="0.2" stroke={cKhaki} strokeWidth="1.5"/>
  <circle cx="21" cy="10" r="4" fill={cKhaki} opacity="0.15" stroke={cKhaki} strokeWidth="1.5"/>
  <path d="M4 28v-2c0-3.9 3.1-7 7-7s7 3.1 7 7v2" fill={cKhaki} opacity="0.15" stroke={cKhaki} strokeWidth="1.5"/>
  <path d="M18 28v-2c0-3.9 3.1-7 7-7s7 3.1 7 7v2" stroke={cKhaki} strokeWidth="1.2" opacity="0.5"/>
</svg>;

const tankIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <rect x="4" y="16" width="24" height="8" rx="4" fill={cSteel} opacity="0.15" stroke={cSteel} strokeWidth="1.5"/>
  <rect x="9" y="10" width="14" height="7" rx="2" fill={cSteel} opacity="0.1" stroke={cSteel} strokeWidth="1.5"/>
  <line x1="23" y1="13" x2="30" y2="10" stroke={cSteel} strokeWidth="2" strokeLinecap="round"/>
  <circle cx="9" cy="23" r="1.5" fill={cSteel} opacity="0.6"/><circle cx="14" cy="23" r="1.5" fill={cSteel} opacity="0.6"/>
  <circle cx="19" cy="23" r="1.5" fill={cSteel} opacity="0.6"/><circle cx="24" cy="23" r="1.5" fill={cSteel} opacity="0.6"/>
</svg>;

const jetIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <path d="M4 16l6-2v-5l3 3h12l3 2v1l-3 2H13l-3 3v-5z" fill={cSky} opacity="0.15" stroke={cSky} strokeWidth="1.5" strokeLinejoin="round"/>
  <path d="M22 14l4-4" stroke={cSky} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  <circle cx="12" cy="16" r="1" fill={cSky} opacity="0.5"/>
  <path d="M10 18l-3 5h3" stroke={cSky} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
</svg>;

const heliIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <line x1="4" y1="6" x2="28" y2="6" stroke={cArmy} strokeWidth="2" strokeLinecap="round"/>
  <line x1="16" y1="6" x2="16" y2="12" stroke={cArmy} strokeWidth="1.5"/>
  <ellipse cx="14" cy="17" rx="8" ry="5" fill={cArmy} opacity="0.12" stroke={cArmy} strokeWidth="1.5"/>
  <line x1="22" y1="17" x2="29" y2="22" stroke={cArmy} strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M27 22h-5v1" stroke={cArmy} strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="10" cy="22" r="1" fill={cArmy} opacity="0.5"/>
  <circle cx="18" cy="22" r="1" fill={cArmy} opacity="0.5"/>
</svg>;

const shipIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <path d="M4 22l3-10h18l3 10" fill={cNavy} opacity="0.12" stroke={cNavy} strokeWidth="1.5" strokeLinejoin="round"/>
  <rect x="11" y="8" width="10" height="5" rx="1" fill={cNavy} opacity="0.1" stroke={cNavy} strokeWidth="1.2"/>
  <line x1="16" y1="8" x2="16" y2="4" stroke={cNavy} strokeWidth="1.5" strokeLinecap="round"/>
  <rect x="13" y="14" width="2" height="2" rx="0.5" fill={cNavy} opacity="0.4"/>
  <rect x="17" y="14" width="2" height="2" rx="0.5" fill={cNavy} opacity="0.4"/>
  <path d="M1 24c2 1.5 5 1.5 7 0s5-1.5 7 0 5 1.5 7 0 5-1.5 7 0" stroke={cNavy} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
</svg>;

const subIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <ellipse cx="16" cy="18" rx="12" ry="5" fill={cDeep} opacity="0.12" stroke={cDeep} strokeWidth="1.5"/>
  <rect x="13" y="11" width="6" height="4" rx="1" fill={cDeep} opacity="0.1" stroke={cDeep} strokeWidth="1.2"/>
  <line x1="19" y1="12" x2="24" y2="9" stroke={cDeep} strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="9" cy="18" r="1.2" fill={cDeep} opacity="0.4"/>
  <circle cx="13" cy="18" r="1.2" fill={cDeep} opacity="0.3"/>
  <path d="M4 18h2" stroke={cDeep} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
</svg>;

const nukeIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="12" stroke={cNuke} strokeWidth="1.5" opacity="0.7"/>
  <circle cx="16" cy="16" r="3" fill={cNuke} opacity="0.6"/>
  <path d="M16 4v7M16 21v7" stroke={cNuke} strokeWidth="2.5" strokeLinecap="round"/>
  <path d="M4 16h7M21 16h7" stroke={cNuke} strokeWidth="2.5" strokeLinecap="round"/>
  <path d="M7.5 7.5l5 5M19.5 19.5l5 5" stroke={cNuke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  <path d="M24.5 7.5l-5 5M7.5 24.5l5-5" stroke={cNuke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
</svg>;

const droneIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <rect x="11" y="14" width="10" height="6" rx="2" fill={cGrey} opacity="0.12" stroke={cGrey} strokeWidth="1.5"/>
  <line x1="6" y1="11" x2="11" y2="14" stroke={cGrey} strokeWidth="1.5"/>
  <line x1="26" y1="11" x2="21" y2="14" stroke={cGrey} strokeWidth="1.5"/>
  <line x1="6" y1="21" x2="11" y2="18" stroke={cGrey} strokeWidth="1.2" opacity="0.6"/>
  <line x1="26" y1="21" x2="21" y2="18" stroke={cGrey} strokeWidth="1.2" opacity="0.6"/>
  <circle cx="6" cy="10" r="3" stroke={cGrey} strokeWidth="1.5"/><circle cx="26" cy="10" r="3" stroke={cGrey} strokeWidth="1.5"/>
  <circle cx="6" cy="22" r="3" stroke={cGrey} strokeWidth="1.2" opacity="0.6"/><circle cx="26" cy="22" r="3" stroke={cGrey} strokeWidth="1.2" opacity="0.6"/>
  <line x1="4" y1="8" x2="8" y2="8" stroke={cGrey} strokeWidth="1.5" strokeLinecap="round"/>
  <line x1="24" y1="8" x2="28" y2="8" stroke={cGrey} strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="16" cy="17" r="1.5" fill={cGrey} opacity="0.4"/>
</svg>;

const budgetIcon = <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="12" fill={cGold} opacity="0.1" stroke={cGold} strokeWidth="1.5"/>
  <path d="M16 7v18" stroke={cGold} strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M12 12c0-2 1.8-3 4-3s4 1 4 3-1.8 2.5-4 3-4 1.5-4 3 1.8 3 4 3 4-1 4-3" stroke={cGold} strokeWidth="1.5" strokeLinecap="round"/>
</svg>;

export const USA_VS_CHINA_CONFIG: ComparisonConfig = {
  entityA: { name: "USA", color: "#3b82f6", flagId: "usa", image: "/leaders/usa.jpg" },
  entityB: { name: "China", color: "#ef4444", flagId: "china", image: "/leaders/china.jpg" },
  title: "USA vs CHINA",
  subtitle: "WHO HAS THE STRONGER MILITARY?",
  targetDuration: 35000,
  metrics: [
    { label: "Active Troops", icon: troopsIcon, valueA: 1390000, valueB: 2035000, formatValue: fmt },
    { label: "Reserve Troops", icon: reserveIcon, valueA: 845000, valueB: 510000, formatValue: fmt },
    { label: "Main Battle Tanks", icon: tankIcon, valueA: 5500, valueB: 5800, formatValue: fmt },
    { label: "Fighter Jets", icon: jetIcon, valueA: 1956, valueB: 1200, formatValue: fmt },
    { label: "Attack Helicopters", icon: heliIcon, valueA: 983, valueB: 281, formatValue: fmt },
    { label: "Naval Warships", icon: shipIcon, valueA: 484, valueB: 730, formatValue: fmt },
    { label: "Submarines", icon: subIcon, valueA: 68, valueB: 78, formatValue: fmt },
    { label: "Nuclear Warheads", icon: nukeIcon, valueA: 3708, valueB: 500, formatValue: fmt },
    { label: "Military Drones", icon: droneIcon, valueA: 14000, valueB: 7000, formatValue: fmt },
    { label: "Defense Budget", icon: budgetIcon, valueA: 886, valueB: 292, formatValue: fmtUsd },
  ],
  sourceLabel: "Data: Global Firepower 2025, SIPRI, IISS",
};
