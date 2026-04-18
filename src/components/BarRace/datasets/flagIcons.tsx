import type { ReactNode } from "react";

type FlagRenderer = (size: number) => ReactNode;

interface BandsSpec {
  fill: string;
  ratio?: number;
}

function FlagSvg({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", borderRadius: 4, overflow: "hidden" }}
    >
      {children}
    </svg>
  );
}

function renderHorizontalBands(bands: BandsSpec[]) {
  const totalRatio = bands.reduce((sum, band) => sum + (band.ratio ?? 1), 0);
  let offset = 0;

  return bands.map((band, index) => {
    const height = 40 * ((band.ratio ?? 1) / totalRatio);
    const node = (
      <rect
        key={`h-${band.fill}-${index}`}
        x="0"
        y={offset}
        width="60"
        height={height}
        fill={band.fill}
      />
    );
    offset += height;
    return node;
  });
}

function renderVerticalBands(bands: BandsSpec[]) {
  const totalRatio = bands.reduce((sum, band) => sum + (band.ratio ?? 1), 0);
  let offset = 0;

  return bands.map((band, index) => {
    const width = 60 * ((band.ratio ?? 1) / totalRatio);
    const node = (
      <rect
        key={`v-${band.fill}-${index}`}
        x={offset}
        y="0"
        width={width}
        height="40"
        fill={band.fill}
      />
    );
    offset += width;
    return node;
  });
}

function starPath(cx: number, cy: number, outerRadius: number, innerRadius = outerRadius * 0.45) {
  let path = "";

  for (let point = 0; point < 10; point++) {
    const angle = (-90 + point * 36) * (Math.PI / 180);
    const radius = point % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    path += `${point === 0 ? "M" : "L"} ${x} ${y} `;
  }

  return `${path}Z`;
}

function Star({ cx, cy, outerRadius, fill, innerRadius }: { cx: number; cy: number; outerRadius: number; fill: string; innerRadius?: number }) {
  return <path d={starPath(cx, cy, outerRadius, innerRadius)} fill={fill} />;
}

function StarOfDavid({ cx, cy, radius, color }: { cx: number; cy: number; radius: number; color: string }) {
  const topTriangle = `${cx},${cy - radius} ${cx - radius * 0.88},${cy + radius * 0.5} ${cx + radius * 0.88},${cy + radius * 0.5}`;
  const bottomTriangle = `${cx},${cy + radius} ${cx - radius * 0.88},${cy - radius * 0.5} ${cx + radius * 0.88},${cy - radius * 0.5}`;

  return (
    <>
      <polygon points={topTriangle} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <polygon points={bottomTriangle} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  );
}

function UnionJack({ x = 0, y = 0, width = 60, height = 40 }: { x?: number; y?: number; width?: number; height?: number }) {
  const scaleX = width / 60;
  const scaleY = height / 40;

  return (
    <g transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY})`}>
      <rect x="0" y="0" width="60" height="40" fill="#1f4fa3" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#ffffff" strokeWidth="10" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="10" />
      <line x1="0" y1="0" x2="60" y2="40" stroke="#c8102e" strokeWidth="4.5" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="#c8102e" strokeWidth="4.5" />
      <rect x="24" y="0" width="12" height="40" fill="#ffffff" />
      <rect x="0" y="14" width="60" height="12" fill="#ffffff" />
      <rect x="27" y="0" width="6" height="40" fill="#c8102e" />
      <rect x="0" y="17" width="60" height="6" fill="#c8102e" />
    </g>
  );
}

const argentinaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#75aadb" }, { fill: "#ffffff" }, { fill: "#75aadb" }])}
    <circle cx="30" cy="20" r="4.2" fill="#f6b40e" />
  </FlagSvg>
);

const australiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#0a2f73" />
    <UnionJack width={28} height={18} />
    <Star cx={17} cy={28} outerRadius={5} fill="#ffffff" />
    <Star cx={43} cy={9} outerRadius={4} fill="#ffffff" />
    <Star cx={51} cy={18} outerRadius={2.7} fill="#ffffff" />
    <Star cx={40} cy={24} outerRadius={2.7} fill="#ffffff" />
    <Star cx={49} cy={31} outerRadius={2.7} fill="#ffffff" />
    <Star cx={56} cy={26} outerRadius={2.7} fill="#ffffff" />
  </FlagSvg>
);

const austriaHungaryFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="30" height="40" fill="#f8d548" />
    <rect x="0" y="0" width="30" height="13.34" fill="#111111" />
    <rect x="30" y="0" width="30" height="13.34" fill="#ce2939" />
    <rect x="30" y="13.34" width="30" height="13.33" fill="#ffffff" />
    <rect x="30" y="26.67" width="30" height="13.33" fill="#477050" />
    <rect x="27.5" y="0" width="5" height="40" fill="#0d1120" />
  </FlagSvg>
);

const belarusFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="12" height="40" fill="#ffffff" />
    <path d="M0 0 H12 V40 H0 Z M2 4 L4 2 L6 4 L8 2 L10 4 L8 6 L10 8 L8 10 L10 12 L8 14 L10 16 L8 18 L10 20 L8 22 L10 24 L8 26 L10 28 L8 30 L10 32 L8 34 L10 36 L8 38 L6 36 L4 38 L2 36 L4 34 L2 32 L4 30 L2 28 L4 26 L2 24 L4 22 L2 20 L4 18 L2 16 L4 14 L2 12 L4 10 L2 8 L4 6 Z" fill="#ce1126" />
    <rect x="12" y="0" width="48" height="26" fill="#c8313e" />
    <rect x="12" y="26" width="48" height="14" fill="#009739" />
  </FlagSvg>
);

const bangladeshFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#006a4e" />
    <circle cx="27" cy="20" r="9.5" fill="#f42a41" />
  </FlagSvg>
);

const brazilFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#009b3a" />
    <polygon points="30,6 50,20 30,34 10,20" fill="#ffdf00" />
    <circle cx="30" cy="20" r="8" fill="#002776" />
    <path d="M18 22 C24 17 36 17 42 22" fill="none" stroke="#ffffff" strokeWidth="2" />
  </FlagSvg>
);

const canadaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#d52b1e" }, { fill: "#ffffff", ratio: 1.2 }, { fill: "#d52b1e" }])}
    <path
      d="M30 9 L32 15 L38 12 L35 19 L41 20 L35 23 L37 30 L30 25 L23 30 L25 23 L19 20 L25 19 L22 12 L28 15 Z"
      fill="#d52b1e"
    />
  </FlagSvg>
);

const chinaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#de2910" />
    <Star cx={12} cy={9} outerRadius={5.2} fill="#ffde00" />
    <Star cx={21} cy={5.5} outerRadius={2} fill="#ffde00" />
    <Star cx={24} cy={11} outerRadius={2} fill="#ffde00" />
    <Star cx={24} cy={17} outerRadius={2} fill="#ffde00" />
    <Star cx={19} cy={22} outerRadius={2} fill="#ffde00" />
  </FlagSvg>
);

const cubaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([
      { fill: "#002a8f" },
      { fill: "#ffffff" },
      { fill: "#002a8f" },
      { fill: "#ffffff" },
      { fill: "#002a8f" },
    ])}
    <polygon points="0,0 24,20 0,40" fill="#cf142b" />
    <Star cx={9} cy={20} outerRadius={4.3} fill="#ffffff" />
  </FlagSvg>
);

const egyptFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce1126" }, { fill: "#ffffff" }, { fill: "#000000" }])}
    <rect x="27" y="15" width="6" height="10" rx="1.5" fill="#c09300" />
  </FlagSvg>
);

const ethiopiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#078930" }, { fill: "#fcd116" }, { fill: "#da121a" }])}
    <circle cx="30" cy="20" r="7" fill="#0f47af" />
    <Star cx={30} cy={20} outerRadius={4.2} fill="#fcd116" innerRadius={1.7} />
  </FlagSvg>
);

const finlandFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ffffff" />
    <rect x="16" y="0" width="10" height="40" fill="#003580" />
    <rect x="0" y="15" width="60" height="10" fill="#003580" />
  </FlagSvg>
);

const franceFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#0055a4" }, { fill: "#ffffff" }, { fill: "#ef4135" }])}
  </FlagSvg>
);

const germanyFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#000000" }, { fill: "#dd0000" }, { fill: "#ffce00" }])}
  </FlagSvg>
);

const hungaryFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce2939" }, { fill: "#ffffff" }, { fill: "#477050" }])}
  </FlagSvg>
);

const indiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ff9933" }, { fill: "#ffffff" }, { fill: "#138808" }])}
    <circle cx="30" cy="20" r="4.6" fill="none" stroke="#000080" strokeWidth="1.4" />
    <circle cx="30" cy="20" r="0.9" fill="#000080" />
    <line x1="30" y1="15.4" x2="30" y2="24.6" stroke="#000080" strokeWidth="1" />
    <line x1="25.4" y1="20" x2="34.6" y2="20" stroke="#000080" strokeWidth="1" />
    <line x1="26.7" y1="16.7" x2="33.3" y2="23.3" stroke="#000080" strokeWidth="1" />
    <line x1="33.3" y1="16.7" x2="26.7" y2="23.3" stroke="#000080" strokeWidth="1" />
  </FlagSvg>
);

const indonesiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce1126" }, { fill: "#ffffff" }])}
  </FlagSvg>
);

const iranFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#239f40" }, { fill: "#ffffff" }, { fill: "#da0000" }])}
    <circle cx="30" cy="20" r="2.2" fill="none" stroke="#da0000" strokeWidth="1.4" />
  </FlagSvg>
);

const iraqFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce1126" }, { fill: "#ffffff" }, { fill: "#000000" }])}
    <rect x="21" y="18" width="18" height="4" rx="2" fill="#1f9f3a" />
  </FlagSvg>
);

const israelFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ffffff" />
    <rect x="0" y="5" width="60" height="4" fill="#0038b8" />
    <rect x="0" y="31" width="60" height="4" fill="#0038b8" />
    <StarOfDavid cx={30} cy={20} radius={7.5} color="#0038b8" />
  </FlagSvg>
);

const italyFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#009246" }, { fill: "#ffffff" }, { fill: "#ce2b37" }])}
  </FlagSvg>
);

const japanFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ffffff" />
    <circle cx="30" cy="20" r="9" fill="#bc002d" />
  </FlagSvg>
);

const kazakhstanFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#00afca" />
    <rect x="0" y="0" width="8" height="40" fill="#f7d116" />
    <path d="M3.5 4 L5.5 6 L3.5 8 L5.5 10 L3.5 12 L5.5 14 L3.5 16 L5.5 18 L3.5 20 L5.5 22 L3.5 24 L5.5 26 L3.5 28 L5.5 30 L3.5 32 L5.5 34 L3.5 36" fill="none" stroke="#00afca" strokeWidth="1.2" />
    <circle cx="34" cy="16" r="6" fill="#f7d116" />
    <path d="M22 28 Q34 22 46 28 Q34 30 22 28 Z" fill="#f7d116" />
  </FlagSvg>
);

const kuwaitFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#007a3d" }, { fill: "#ffffff" }, { fill: "#ce1126" }])}
    <polygon points="0,0 14,10 14,30 0,40" fill="#000000" />
  </FlagSvg>
);

const libyaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#e70013", ratio: 1 }, { fill: "#000000", ratio: 2 }, { fill: "#239e46", ratio: 1 }])}
    <circle cx="27" cy="20" r="6" fill="#ffffff" />
    <circle cx="29.5" cy="20" r="5.3" fill="#000000" />
    <Star cx={36} cy={20} outerRadius={3.6} fill="#ffffff" />
  </FlagSvg>
);

const mexicoFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#006847" }, { fill: "#ffffff" }, { fill: "#ce1126" }])}
    <circle cx="30" cy="20" r="3" fill="#8c6239" />
  </FlagSvg>
);

const netherlandsFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ae1c28" }, { fill: "#ffffff" }, { fill: "#21468b" }])}
  </FlagSvg>
);

const nigeriaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#008753" }, { fill: "#ffffff" }, { fill: "#008753" }])}
  </FlagSvg>
);

const northKoreaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([
      { fill: "#024fa2", ratio: 1 },
      { fill: "#ffffff", ratio: 0.45 },
      { fill: "#ed1c27", ratio: 2.1 },
      { fill: "#ffffff", ratio: 0.45 },
      { fill: "#024fa2", ratio: 1 },
    ])}
    <circle cx="17" cy="20" r="7" fill="#ffffff" />
    <Star cx={17} cy={20} outerRadius={4.3} fill="#ed1c27" />
  </FlagSvg>
);

const norwayFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ba0c2f" />
    <rect x="14" y="0" width="12" height="40" fill="#ffffff" />
    <rect x="0" y="14" width="60" height="12" fill="#ffffff" />
    <rect x="17" y="0" width="6" height="40" fill="#00205b" />
    <rect x="0" y="17" width="60" height="6" fill="#00205b" />
  </FlagSvg>
);

const pakistanFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#01411c" />
    <rect x="0" y="0" width="12" height="40" fill="#ffffff" />
    <circle cx="34" cy="20" r="8" fill="#ffffff" />
    <circle cx="36.5" cy="18.5" r="7.2" fill="#01411c" />
    <Star cx={40.5} cy={14.5} outerRadius={3.2} fill="#ffffff" />
  </FlagSvg>
);

const philippinesFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="20" fill="#0038a8" />
    <rect x="0" y="20" width="60" height="20" fill="#ce1126" />
    <polygon points="0,0 24,20 0,40" fill="#ffffff" />
    <circle cx="9" cy="20" r="3.2" fill="#fcd116" />
    <Star cx={4.5} cy={5.5} outerRadius={2.4} fill="#fcd116" />
    <Star cx={4.5} cy={34.5} outerRadius={2.4} fill="#fcd116" />
    <Star cx={18.5} cy={20} outerRadius={2.4} fill="#fcd116" />
  </FlagSvg>
);

const russiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ffffff" }, { fill: "#0039a6" }, { fill: "#d52b1e" }])}
  </FlagSvg>
);

const russianEmpireFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#000000" }, { fill: "#f5c518" }, { fill: "#ffffff" }])}
  </FlagSvg>
);

const russiaUssrFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#cc0000" />
    <Star cx={12} cy={8} outerRadius={4.2} fill="#ffd700" />
    <circle cx="11" cy="16" r="3.6" fill="none" stroke="#ffd700" strokeWidth="1.8" />
    <line x1="9" y1="18.5" x2="16" y2="12" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
  </FlagSvg>
);

const saudiArabiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#006c35" />
    <rect x="14" y="13" width="28" height="3.2" rx="1.6" fill="#ffffff" />
    <rect x="17" y="25" width="24" height="2.2" rx="1.1" fill="#ffffff" />
    <rect x="38" y="24.2" width="6" height="1.4" rx="0.7" fill="#ffffff" />
  </FlagSvg>
);

const southKoreaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ffffff" />
    <path d="M30 10 A10 10 0 0 1 30 30 A5 5 0 0 0 30 20 A5 5 0 0 1 30 10 Z" fill="#cd2e3a" />
    <path d="M30 30 A10 10 0 0 1 30 10 A5 5 0 0 0 30 20 A5 5 0 0 1 30 30 Z" fill="#0047a0" />
    <g stroke="#000000" strokeWidth="2">
      <line x1="11" y1="10" x2="17" y2="6" />
      <line x1="10" y1="14" x2="16" y2="10" />
      <line x1="9" y1="18" x2="15" y2="14" />
      <line x1="45" y1="26" x2="51" y2="22" />
      <line x1="44" y1="30" x2="50" y2="26" />
      <line x1="43" y1="34" x2="49" y2="30" />
      <line x1="44" y1="10" x2="50" y2="14" />
      <line x1="46" y1="6" x2="52" y2="10" />
      <line x1="10" y1="30" x2="16" y2="26" />
      <line x1="12" y1="34" x2="18" y2="30" />
    </g>
  </FlagSvg>
);

const southAfricaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="20" fill="#de3831" />
    <rect x="0" y="20" width="60" height="20" fill="#002395" />
    <polygon points="0,0 22,20 0,40" fill="#000000" />
    <polygon points="0,4 18,20 0,36 0,30 11,20 0,10" fill="#ffb612" />
    <polygon points="0,8 26,20 0,32 0,25 13,20 0,15" fill="#007a4d" />
    <polygon points="60,0 28,16 22,16 48,0" fill="#ffffff" />
    <polygon points="60,40 28,24 22,24 48,40" fill="#ffffff" />
    <polygon points="60,0 32,16 26,16 52,0" fill="#007a4d" />
    <polygon points="60,40 32,24 26,24 52,40" fill="#007a4d" />
  </FlagSvg>
);

const spainFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#aa151b", ratio: 1 }, { fill: "#f1bf00", ratio: 2 }, { fill: "#aa151b", ratio: 1 }])}
    <rect x="18" y="14" width="5" height="12" rx="1.2" fill="#9b5d00" />
  </FlagSvg>
);

const swedenFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#006aa7" />
    <rect x="16" y="0" width="10" height="40" fill="#fecc00" />
    <rect x="0" y="15" width="60" height="10" fill="#fecc00" />
  </FlagSvg>
);

const turkeyFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#e30a17" />
    <circle cx="24" cy="20" r="8" fill="#ffffff" />
    <circle cx="26.5" cy="20" r="6.5" fill="#e30a17" />
    <Star cx={33.5} cy={20} outerRadius={3.8} fill="#ffffff" />
  </FlagSvg>
);

const uaeFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="14" height="40" fill="#ff0000" />
    <rect x="14" y="0" width="46" height="13.34" fill="#00732f" />
    <rect x="14" y="13.34" width="46" height="13.33" fill="#ffffff" />
    <rect x="14" y="26.67" width="46" height="13.33" fill="#000000" />
  </FlagSvg>
);

const ukFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <UnionJack />
  </FlagSvg>
);

const ukraineFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#0057b7" }, { fill: "#ffd700" }])}
  </FlagSvg>
);

const usaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#ffffff" />
    <rect x="0" y="0" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="6.16" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="12.32" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="18.48" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="24.64" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="30.8" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="36.92" width="60" height="3.08" fill="#b22234" />
    <rect x="0" y="0" width="26" height="21.5" fill="#3c3b6e" />
    <circle cx="5" cy="5" r="1.1" fill="#ffffff" />
    <circle cx="11" cy="5" r="1.1" fill="#ffffff" />
    <circle cx="17" cy="5" r="1.1" fill="#ffffff" />
    <circle cx="23" cy="5" r="1.1" fill="#ffffff" />
    <circle cx="8" cy="10.5" r="1.1" fill="#ffffff" />
    <circle cx="14" cy="10.5" r="1.1" fill="#ffffff" />
    <circle cx="20" cy="10.5" r="1.1" fill="#ffffff" />
    <circle cx="5" cy="16" r="1.1" fill="#ffffff" />
    <circle cx="11" cy="16" r="1.1" fill="#ffffff" />
    <circle cx="17" cy="16" r="1.1" fill="#ffffff" />
    <circle cx="23" cy="16" r="1.1" fill="#ffffff" />
  </FlagSvg>
);

const venezuelaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ffcc00" }, { fill: "#0033a0" }, { fill: "#cf142b" }])}
    <circle cx="22" cy="20" r="1.1" fill="#ffffff" />
    <circle cx="26" cy="17.8" r="1.1" fill="#ffffff" />
    <circle cx="30" cy="16.8" r="1.1" fill="#ffffff" />
    <circle cx="34" cy="17.8" r="1.1" fill="#ffffff" />
    <circle cx="38" cy="20" r="1.1" fill="#ffffff" />
    <circle cx="25" cy="22.5" r="1.1" fill="#ffffff" />
    <circle cx="30" cy="23.5" r="1.1" fill="#ffffff" />
    <circle cx="35" cy="22.5" r="1.1" fill="#ffffff" />
  </FlagSvg>
);

const vietnamFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#da251d" />
    <Star cx={30} cy={20} outerRadius={8} fill="#ffff00" />
  </FlagSvg>
);

const polandFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ffffff" }, { fill: "#dc143c" }])}
  </FlagSvg>
);

const ottomanEmpireFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#c8102e" />
    <circle cx="24" cy="20" r="8" fill="#ffffff" />
    <circle cx="26.5" cy="20" r="6.4" fill="#c8102e" />
    <Star cx={34} cy={20} outerRadius={3.8} fill="#ffffff" />
  </FlagSvg>
);

const romaniaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#002b7f" }, { fill: "#fcd116" }, { fill: "#ce1126" }])}
  </FlagSvg>
);

const serbiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#c6363c" }, { fill: "#0c4076" }, { fill: "#ffffff" }])}
  </FlagSvg>
);

const afghanistanFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderVerticalBands([{ fill: "#000000" }, { fill: "#af0000" }, { fill: "#007a36" }])}
    <circle cx="30" cy="20" r="5" fill="none" stroke="#ffffff" strokeWidth="1.2" />
  </FlagSvg>
);

const colombiaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#fcd116", ratio: 2 }, { fill: "#003893" }, { fill: "#ce1126" }])}
  </FlagSvg>
);

const somaliaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#4189dd" />
    <Star cx={30} cy={20} outerRadius={8} fill="#ffffff" />
  </FlagSvg>
);

const syriaFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce1126" }, { fill: "#ffffff" }, { fill: "#000000" }])}
    <Star cx={24} cy={20} outerRadius={3} fill="#007a3d" />
    <Star cx={36} cy={20} outerRadius={3} fill="#007a3d" />
  </FlagSvg>
);

const yemenFlag: FlagRenderer = size => (
  <FlagSvg size={size}>
    {renderHorizontalBands([{ fill: "#ce1126" }, { fill: "#ffffff" }, { fill: "#000000" }])}
  </FlagSvg>
);

const switzerlandFlag: FlagRenderer = (size) => (
  <FlagSvg size={size}>
    <rect x="0" y="0" width="60" height="40" fill="#DA291C" />
    <rect x="25" y="6" width="10" height="28" fill="#ffffff" />
    <rect x="16" y="15" width="28" height="10" fill="#ffffff" />
  </FlagSvg>
);

const FLAG_RENDERERS: Record<string, FlagRenderer> = {
  afghanistan: afghanistanFlag,
  argentina: argentinaFlag,
  australia: australiaFlag,
  austria_hungary: austriaHungaryFlag,
  belarus: belarusFlag,
  bangladesh: bangladeshFlag,
  brazil: brazilFlag,
  canada: canadaFlag,
  china: chinaFlag,
  colombia: colombiaFlag,
  cuba: cubaFlag,
  egypt: egyptFlag,
  ethiopia: ethiopiaFlag,
  finland: finlandFlag,
  france: franceFlag,
  germany: germanyFlag,
  great_britain: ukFlag,
  hungary: hungaryFlag,
  india: indiaFlag,
  indonesia: indonesiaFlag,
  iran: iranFlag,
  iraq: iraqFlag,
  israel: israelFlag,
  italy: italyFlag,
  japan: japanFlag,
  kazakhstan: kazakhstanFlag,
  kuwait: kuwaitFlag,
  libya: libyaFlag,
  mexico: mexicoFlag,
  netherlands: netherlandsFlag,
  nigeria: nigeriaFlag,
  north_korea: northKoreaFlag,
  norway: norwayFlag,
  ottoman_empire: ottomanEmpireFlag,
  pakistan: pakistanFlag,
  poland: polandFlag,
  philippines: philippinesFlag,
  romania: romaniaFlag,
  russia: russiaFlag,
  russian_empire: russianEmpireFlag,
  serbia: serbiaFlag,
  ussr: russiaUssrFlag,
  russia_ussr: russiaUssrFlag,
  saudi_arabia: saudiArabiaFlag,
  somalia: somaliaFlag,
  south_africa: southAfricaFlag,
  south_korea: southKoreaFlag,
  spain: spainFlag,
  syria: syriaFlag,
  sweden: swedenFlag,
  switzerland: switzerlandFlag,
  turkey: turkeyFlag,
  uae: uaeFlag,
  uk: ukFlag,
  ukraine: ukraineFlag,
  usa: usaFlag,
  venezuela: venezuelaFlag,
  yemen: yemenFlag,
  vietnam: vietnamFlag,
};

export function renderFlagIcon(id: string, size: number): ReactNode | null {
  const renderFlag = FLAG_RENDERERS[id];
  return renderFlag ? renderFlag(size) : null;
}
