# Generate Dataset

Generate a new bar-race chart dataset from scratch, register it in the app, and verify correctness.

## Arguments
- $TOPIC: The topic for the dataset (e.g. "submarine fleets", "wheat production", "space launches")

## Steps

### 1. Topic Feasibility Check

Before writing any code, evaluate the topic:
- **Rankings must change dynamically over time** — the whole point is watching bars overtake each other. If one entity dominates start to finish, the video is boring.
- Mentally check: do the top 3 positions change at least 2-3 times across the time span? If not, suggest a reframe or alternate topic.
- Avoid cumulative all-time totals where leaders lock in early — prefer rate-based, annual, or per-capita metrics.
- **Prefer military/geopolitical topics** — they consistently deliver the highest views. Dark/controversial history is a reliable secondary driver. Gaming topics underperform.
- War framing boosts economic data by 40-60% (e.g. "WW1 Spending" > "GDP by Country").

If the topic is unsuitable, explain why and suggest alternatives before proceeding.

### 2. Research Data

Research the topic to gather accurate historical data:
- Find real milestone data points for at least 30 entities across the full time range
- Use authoritative sources (World Bank, UN, SIPRI, national statistics, etc.)
- Note the source for the `sourceLabel` field
- If using projections or estimates, note that for `sourceLabel`

### 3. Create the Dataset File

Create `src/components/BarRace/datasets/<topic>.tsx` following these rules exactly:

#### Items Array (`ITEMS: BarRaceItem[]`)
- Must contain **at least 30 entities** — use `ensureCountryItems(...)` for country datasets to guarantee this
- Each item needs: `id` (lowercase slug, no spaces), `name` (display name), `color` (hex, high-contrast on dark `#0d1120` background)
- **Never omit `renderIcon`** — every item must have a visual icon:
  - **Country datasets** → use `ensureCountryItems(...)` from `./countryItems` (auto-adds `makeIcon("flags", id)`)
  - **Game datasets** → use `makeIcon("game-logos", id)` pointing to `public/game-logos/{id}.svg`
  - **Other datasets** → supply a relevant SVG icon inline or via `makeIcon`
  - **Never** fall back to the first letter of `name`
- Colors must be saturated, high-contrast, and distinguishable from each other in the top 10
- Avoid pure neon (`#00ff..`, `#ffff..`) — use richer jewel tones

#### USSR / Russia Rules
- **Never combine** — use separate IDs: `ussr`, `russia`, and `russian_empire` if pre-1917
- For flow datasets (GDP, oil, military, production, etc.), add explicit transition-to-zero milestone when a state dissolves (e.g. `[1992, 0]` for USSR)
- For cumulative leaderboards, a defunct entity may stay frozen at its final total

#### Milestones (`MILESTONES: Record<string, Record<number, number>>`)
- Use a `series(...points)` helper: `function series(...points: Array<[number, number]>) { return Object.fromEntries(points) as Record<number, number>; }`
- Outer key = `item.id`, inner key = year, value = measured quantity
- Start each series from the year it first appeared (value ~ 0.1 or first real data point)
- **No milestone years later than `endYear`**
- Aim for milestone updates every ~5 years; avoid gaps larger than ~10 years
- Sparse data is fine — `buildFrames` interpolates

#### Format Helpers
```ts
function formatValue(n: number): string { ... }      // short label above bar — use K, M, B, T
function formatValueFull(n: number): string { ... }  // full number inside bar
```
- Keep these two separate — `formatValue` is compact, `formatValueFull` is full
- Do **not** append unit words inside the formatter — that's what `valueUnit` is for
- Currency symbols and compact suffixes are allowed

#### Config Export (`<TOPIC>_CONFIG: BarRaceConfig`)
Required fields:
```ts
{
  items, milestones,
  title,              // MUST include "TOP 10"
  subtitle,           // engaging question or tagline
  unitLabel,          // e.g. "Annual Production (million tonnes)"
  valueUnit,          // REQUIRED — short word: "troops", "Mt", "USD", "mb/d"
  startYear, endYear, // time span 40-100 years
  formatValue, formatValueFull,
  topN: 10,
  skipEmptyStartFrames: false,  // ALWAYS false
  sourceLabel,        // ALWAYS present — e.g. "Data: World Steel Association"
}
```

Recommended optional fields:
```ts
{
  minValue: 0.1,
  scaleMode: "log",        // "log" for wide ranges, "linear" for narrow
  framesPerYear: 12,       // 12 = monthly, 1 = yearly
  timelineInterval: 5,
  videoWidth: 405,
  videoHeight: 720,
  barHeight: 44,
  gap: 6,
  unitIcon: <svg .../>,    // measurement icon shown right of inside-bar value
  events: { ... },         // news ticker — see below
}
```

#### Events (News Ticker)
- Exactly **3-4 events**, no more
- **Minimum 15-year gap** between any two event years
- Labels must be **full human-readable sentences** — not single words
  - Good: `"Soviet Union tests its first atomic bomb — Cold War arms race begins"`
  - Bad: `"USSR Tests"` or `"Cold War"`
- Pick the **3-4 most dramatic/pivotal moments**, spread evenly across the time range

#### Time Span Rules
- Must be at least **40 years** (use full available range if shorter)
- Ideally no more than **100 years** (unless long arc is the point)
- Choose `startYear` where at least 3-5 items have milestone data
- Show month names only when dataset has real sub-year timing

### 4. Register the Dataset

#### 4a. Add import and entry in `src/components/GameRace.tsx`
- Add the import at the top with the other dataset imports
- Add a new entry to the `DATASETS` array with an appropriate emoji label

### 5. Verify — Compilation

Run `npx tsc --noEmit` and fix any TypeScript errors.

### 6. Verify — Data Integrity

Read the created file back and programmatically check:
- [ ] At least 30 items in ITEMS (or ensureCountryItems brings it to 30+)
- [ ] Every item has `id`, `name`, `color`
- [ ] MILESTONES has entries for all items expected in top 10
- [ ] No milestone year exceeds `endYear`
- [ ] No milestone year is before `startYear` for entries that matter
- [ ] USSR and Russia are separate (if applicable)
- [ ] Historical states transition to zero when dissolved (if applicable)
- [ ] `skipEmptyStartFrames` is `false`
- [ ] `valueUnit` is set
- [ ] `events` has exactly 3-4 entries
- [ ] Event gaps are all >= 15 years
- [ ] Event labels are full sentences
- [ ] `topN` is 10
- [ ] Title includes "TOP 10"
- [ ] Time span is 40-100 years
- [ ] `sourceLabel` is present
- [ ] `formatValue` produces compact labels (K/M/B/T)
- [ ] `formatValueFull` produces full numbers

### 7. Verify — Visual Check

Start the dev server and capture test screenshots to verify the chart:

```bash
npm run dev &
```

Then use Playwright or a browser to capture frames at progress 0.0, 0.25, 0.5, 0.75, and 1.0:
- Bar ordering must be correct at every frame — #1 bar must always be the longest
- Bars should swap positions and show dynamic ranking changes
- No single entity should dominate the entire timeline without competition
- Check that flags/icons render correctly

If the chart looks static, broken, or has ordering issues — fix the data before finishing.

### 8. Report

Print the final result:
- Dataset file path
- Number of items
- Time span (startYear - endYear)
- Number of events
- Any warnings or issues found during verification
- The dataset index number for recording (check with `npm run record -- --list`)
