interface ControlsTheme {
  accent: string;
  secondary: string;
  bg: string;
  activeBg: string;
}

interface ControlsProps {
  playing: boolean;
  frameIdx: number;
  totalFrames: number;
  videoWidth: number;
  testIdPrefix: string;
  onTogglePlay: () => void;
  onScrub: (idx: number) => void;
  theme: ControlsTheme;
}

export default function Controls({ playing, frameIdx, totalFrames, videoWidth, testIdPrefix, onTogglePlay, onScrub, theme }: ControlsProps) {
  return (
    <div data-testid={`${testIdPrefix}-controls`} style={{ width: videoWidth, marginTop: 16 }}>
      <input
        data-testid={`${testIdPrefix}-controls-scrubber`}
        type="range"
        min={0}
        max={totalFrames - 1}
        value={frameIdx}
        onChange={e => onScrub(Number(e.target.value))}
        style={{ width: "100%", accentColor: theme.accent, cursor: "pointer", marginBottom: 12 }}
      />
      <div data-testid={`${testIdPrefix}-controls-actions`} style={{ display: "flex", justifyContent: "flex-start" }}>
        <button data-testid={`${testIdPrefix}-controls-toggle`} onClick={onTogglePlay} style={{
          background: playing ? theme.activeBg : theme.bg,
          border: `1px solid ${playing ? theme.accent : theme.secondary}`,
          color: playing ? theme.accent : theme.secondary,
          borderRadius: 6,
          padding: "10px 32px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 1,
          fontFamily: "'Trebuchet MS', sans-serif",
        }}>
          {playing ? "⏸ PAUSE" : frameIdx >= totalFrames - 1 ? "↺ REPLAY" : "▶ PLAY"}
        </button>
      </div>
    </div>
  );
}
