import { useState } from "react";
import type { BarRaceItem } from "../types";
import { renderFlagIcon } from "./flagIcons";

function FallbackBadge({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect x="2.5" y="2.5" width="27" height="27" rx="6" fill="rgba(9,14,26,0.92)" stroke="rgba(255,255,255,0.08)" />
      <rect x="7" y="7" width="18" height="18" rx="4.5" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.95" />
      <path d="M10 22 L14.5 17.5 L18 20.5 L22 15" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWithFallback({ src, alt, size, color }: { src: string; alt: string; size: number; color: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackBadge size={size} color={color} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}

/** Use for country datasets: folder = "flags", id = country slug */
export function makeIcon(folder: string, id: string, color = "#ffffff"): BarRaceItem["renderIcon"] {
  return (_barColor: string, size: number) => {
    if (folder === "flags") {
      const flagIcon = renderFlagIcon(id, size);
      if (flagIcon) return flagIcon;
    }

    return <IconWithFallback src={`/${folder}/${id}.svg`} alt={id} size={size} color={_barColor || color} />;
  };
}
