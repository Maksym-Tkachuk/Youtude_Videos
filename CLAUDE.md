# Bar Race Chart — Dataset Rules

## Adding a new dataset

All datasets live in `src/components/BarRace/datasets/`. Copy the pattern from `games.tsx`.

### Checklist

1. **Create `src/components/BarRace/datasets/<topic>.tsx`**

2. **Define `ITEMS: BarRaceItem[]`**
   - `id` — unique slug, lowercase, no spaces (used as image filename key)
   - `name` — display name
   - `color` — hex string, must contrast clearly against both dark bars and the dark canvas
   - `ITEMS` should contain at least `30` entities so the dataset has real depth beyond the visible top 10
   - If the main leaders are obvious, still keep a deeper reserve list of lower-tier real entities instead of stopping near the top 10
   - `renderIcon` — **REQUIRED, never omit**. Every item must have a visual icon:
     - **Country datasets** → use the shared inline SVG flag registry via `makeIcon(id)` from `src/components/BarRace/datasets/makeIcon.tsx`
     - For country datasets, prefer the shared `ensureCountryItems(...)` helper so the pool stays at or above `30` entries consistently
     - **Game datasets** → use a game logo SVG via `makeIcon(id)` pointing to `public/game-logos/{id}.svg`
     - **Other datasets** → supply a relevant SVG icon inline or via `makeIcon`
     - Never fall back to the first letter of `name` — always provide a real icon

3. **Store icon sources in the right place**
   - **Country flags** live in `src/components/BarRace/datasets/flagIcons.tsx`
   - **Game logos** live in `public/game-logos/{id}.svg` (or `.png`)
   - **Every country-like `id` must have a matching flag renderer** in `flagIcons.tsx`
   - Aliases such as `uk`, `great_britain`, `ussr`, or `russian_empire` must still map to an appropriate real flag SVG
   - Legacy aliases may stay in the flag map for compatibility, but new datasets should use canonical historical IDs

3a. **Keep the full value label clean**
   - `formatValue` controls the **top row label** above the bar and should use a short compact form like `K`, `M`, `B`, `T` when useful
   - `formatValueFull` controls the number **inside the bar** and should show the full number
   - Keep those two formatter hooks separate; `bar-race-row-{n}-value` is short and `bar-race-row-{n}-full-value` is full
   - Do **not** append words inside the formatter functions themselves
   - Show the dataset `unitIcon` SVG immediately to the **right** of that inside-bar number
   - Currency symbols and compact suffixes like `K`, `M`, `B`, `T` are allowed when needed

3b. **Always set `valueUnit`** — a short word shown after the top value label (e.g. `"troops"`, `"users"`, `"medals"`, `"USD"`, `"mb/d"`)
   - This tells viewers what the number means at a glance without cluttering the formatter
   - Every shipped dataset must have `valueUnit` set in its config
   - Keep it short — 1–2 words maximum (e.g. `"people"`, `"warheads"`, `"Mt"`, `"pax"`, `"downloads"`)

4. **Define `MILESTONES: Record<string, Record<number, number>>`**
   - Outer key = `item.id`
   - Inner key = year (integer, or year + fractional month like `2020.5` for mid-year)
   - Value = the measured quantity at that point in time
   - Always start each series from the year it first appeared (value ≈ 0.1 or first real data point)
   - Do not leave milestone years later than `endYear` in the shipped dataset config
   - Sparse data is fine — `buildFrames` interpolates between milestones
   - For yearly datasets, keep visible milestone spacing reasonably dense for smooth playback; aim for updates every `5` years when possible and avoid visible gaps larger than about `10` years unless the topic is inherently event-driven

4a. **Do not combine Russia and USSR**
   - Never use labels like `Russia / USSR` or one continuous data series for both entities
   - Use separate IDs such as `ussr` and `russia`, and `russian_empire` if a pre-1917 Russian state is needed
   - For flow datasets like GDP, oil, military, debt, passengers, production, etc., add an explicit transition-to-zero milestone when a state disappears so interpolation does not carry it into later years
   - For cumulative all-time leaderboards, a defunct entity may stay frozen at its final total, but it still must remain separate from modern Russia

5. **Choose `framesPerYear`**
   - `12` — monthly animation (good for data with notable year-over-year changes within a decade)
   - `1` — yearly animation (good for data spanning centuries or with only annual data)
   - Show month names only when the dataset has real sub-year timing or meaningful fractional-year milestones
   - Do not show months for yearly-only datasets just because playback uses interpolated subframes
   - Timeline tick labels should stay year-only by default; if month detail is needed, prefer showing it only in the active current-date label

6. **Define format helpers**
   ```ts
   function formatValue(n: number): string { ... }      // short label above bar
   function formatValueFull(n: number): string { ... }  // full number inside bar
   ```

7. **Export `<TOPIC>_CONFIG: BarRaceConfig`** — required fields:
   ```ts
   {
     items, milestones,
     title, subtitle,
     unitLabel,          // e.g. "Total Downloads (millions)"
     startYear, endYear,
     formatValue, formatValueFull,
   }
   ```
   - `title` must explicitly include `TOP 10`
   - `topN` should be `10` unless there is a clearly documented reason to use a different count
   - The dataset time span should usually be at least `40` years
   - The dataset time span should ideally be no more than `100` years
   - If the real topic history is shorter than `40` years, use the full available range; if it is much longer than `100` years, prefer a tighter representative window unless the long historical arc is the point of the video
   - `sourceLabel` should always be present for shipped datasets
   - If a dataset uses projections, estimates, or manually aggregated results, make that explicit in `sourceLabel` instead of implying a purely official single-source table
   Optional but recommended:
   ```ts
   {
     topN: 10,
     minValue: 0.1,       // hide items below this threshold
     scaleMode: "log",    // "log" for wide value ranges, "linear" for narrow
     framesPerYear: 12,
     timelineInterval: 5, // year label step on the timeline
     videoWidth: 405,
     videoHeight: 720,
     barHeight: 44,
     gap: 6,
     unitIcon: <svg ...>, // shown to the right of the inside-bar value; use a clear measurement icon
     valueUnit: "troops", // short word shown after the top value label — REQUIRED for all datasets
     sourceLabel: "Data: ...",
     channelLabel: "@yourchannel",
     events: { 1973: "Full sentence news label...", ... }, // 3–4 entries, min 15yr gap between each
   }
   ```

8. **Define `events` — the news ticker**
   - Each dataset must have exactly **3–4 events**, no more
   - Events fire a news ticker that scrolls right-to-left across the screen over **12 seconds**; if two events are too close in time the previous ticker gets cut off mid-scroll
   - **Minimum gap between any two event years must be at least 15 years** so tickers never overlap
   - Event labels must be **full human-readable sentences** (not single words or short codes), e.g.:
     - ✅ `"Soviet Union tests its first atomic bomb — Cold War arms race begins"`
     - ❌ `"USSR Tests"` or `"Cold War"`
   - Write the label from a viewer's perspective — assume they know nothing about the topic; the sentence must make sense on its own
   - Pick the **3–4 most dramatic or pivotal moments** for the dataset topic, spread evenly across the time range
   - Example pattern for a 1950–2025 dataset: events at ~1960, ~1980, ~2000, ~2020

9. **Import and use** in `src/App.tsx` (or wherever the player is mounted):
   ```tsx
   import { TOPIC_CONFIG } from "./components/BarRace/datasets/<topic>";
   <BarRacePlayer config={TOPIC_CONFIG} />
   ```

---

## Layout constraints (do not change)

- `BASE_WIDTH = 405`, `BASE_HEIGHT = 720` — authoring canvas; always design at these dimensions
- The canvas scales up via CSS `transform: scale()` to match `videoWidth`
- The chart area always reserves exactly `topN` rows — never change `topN * slot` height to a dynamic value, or bars will jump when items enter/leave the top N
- The player should start from the earliest frame that fills as many rows as possible up to `topN`; do not force playback to begin on a nearly empty chart if later frames can populate it
- `targetDuration` (default 55 000 ms) controls total animation length; `msPerFrame` is auto-computed

## Color rules

- Follow-up bar-race diagrams should preserve the same palette and visual language as the current reference screens unless the user explicitly asks for a different theme
- Keep the dark navy canvas stack: page/background around `#080c14`, main chart canvas around `#0d1120`, bar tracks around `#1a2235`, and timeline base around `#1e2d45`
- Keep the warm gold highlight system for titles and active timeline accents: `#ffd60a` → `#ffb703` → `#ff9500`
- Keep the year label bright white, inactive timeline labels cool blue-grey, and active timeline labels warm pale gold
- Each item `color` must be readable on `#0d1120` background
- Item colors should stay saturated and high-contrast, similar to the current screen palette, rather than muted or pastel
- For game datasets specifically, avoid pure neon or acid colors like `#00ff..`, `#ffff..`, or highly synthetic purple/pink defaults; prefer richer jewel tones and warm arcade-style colors that still fit the shared navy-and-gold chart theme
- Avoid colors that are too similar between items in the same top-10 range
- Rank number badge colors are hardcoded in `BarRow.tsx` — top 3 use gold `#ffd60a`, ranks 4–10 use cool blue-grey `#86a6c8`; the `rankColors` prop and `DEFAULT_RANK_COLORS` array have been removed
- The `rankColors` field in `BarRaceConfig` is no longer used and should not be set on new datasets
- Timeline labels: only the **currently active year** gets the bright `labelActiveColor` + larger font size + glow; all other already-reached years stay at the regular dim `labelColor` — never make multiple labels bright at once
- Bar row icon is pinned to the **bottom** of the row (`alignSelf: flex-end`); the rank-change arrow aligns to bottom with `paddingBottom` to visually center it against the icon; the rank number stays vertically centered
