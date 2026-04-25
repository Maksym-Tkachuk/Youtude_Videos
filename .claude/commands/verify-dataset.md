# Verify Dataset

Automatically research and verify all data in a generated dataset against real-world sources. Fix any inaccuracies found.

## Arguments
- $DATASET_FILE: Path to the dataset file to verify (e.g. `src/components/BarRace/datasets/chemicalWeapons.tsx`)

## Steps

### 1. Parse the Dataset

Read the dataset file and extract:
- All country/entity names and their milestone data points
- The topic and what the values represent (troops, tonnes, warheads, % GDP, etc.)
- The time range (startYear → endYear)
- Events (year + label)
- The title, subtitle, sourceLabel

### 2. Research Top 10 Countries

For each country that appears in the top 10 at any point in the animation:

- **Search the web** for authoritative data on that country's real values at key years (start, peak, end, and any major transition years)
- Use sources like: World Bank, SIPRI, IISS Military Balance, OPCW, UN, national defense ministries, Wikipedia (with citations)
- Compare the dataset values against the real-world data
- Flag any discrepancy greater than 20% as an error

### 3. Verify Rankings

- **Check the final year (#1 ranking)** — search who is actually #1 in this metric today. If the dataset disagrees, it's wrong.
- **Check the peak year for the top 3 countries** — did they actually peak at approximately that value in that year?
- **Check major crossover points** — if the dataset shows China overtaking USA in year X, verify that's approximately correct.

### 4. Verify Historical Events

For each event in the `events` config:
- **Search the web** to confirm the event actually happened in that year
- Verify the description is factually accurate
- Check that the event is relevant to the dataset topic

### 5. Verify Historical Accuracy

- **USSR/Russia transition**: If present, verify USSR dissolution is at 1991-1992 and Russia's starting value is plausible
- **Country existence**: No data for countries before they existed (South Korea before 1948, Israel before 1948, etc.)
- **Known historical events**: If the topic involves wars, verify wartime spikes match real conflict dates
- **Destroyed/dissolved entities**: Iraq post-2003, USSR post-1991, etc. should show appropriate declines

### 5a. Verify Historical Flag Correctness

Flags must match the historical period of the data:

- **USSR data (pre-1992)** must use `ussr` id with USSR flag — NOT `russia` with the Russian tricolor
- **Russia data (post-1992)** must use `russia` id with Russian flag — NOT `ussr`
- **Russian Empire (pre-1917)** should use `russian_empire` id if applicable
- **Germany (pre-1945)** — consider whether the context warrants a different entity
- **Ottoman Empire (pre-1923)** — use `turkey` only for post-1923 data; for Ottoman-era use `ottoman_empire` if the flag exists
- **Austria-Hungary (pre-1918)** — use `austria_hungary` if available

For **Countdown datasets** (static rankings like "Deadliest Dictators"):
- Each item's `renderIcon` flag must match the **era** of that person/event
- Stalin → should use `makeIcon("flags", "ussr")` NOT `russia`
- Hitler → `germany` is acceptable (same modern flag concept)
- Ottoman-era leaders → use `turkey` as closest available

Check `src/components/BarRace/datasets/flagIcons.tsx` for available flags:
- `ussr` → Soviet flag (red with hammer/sickle)
- `russia` → Russian tricolor
- `russian_empire` → Imperial Russian flag
- `ottoman_empire` → Ottoman flag
- `austria_hungary` → Austro-Hungarian flag

If a flag is used incorrectly, fix the `renderIcon` or `id` to use the historically correct one.

### 5b. Verify All Flags Exist

Check that **every country ID** used in the dataset has a matching flag renderer in `flagIcons.tsx`:
- Read the dataset file and extract all country slug IDs
- Check each one against the `FLAG_RENDERERS` map in `flagIcons.tsx`
- If a country has no flag renderer, it will show a grey fallback placeholder — this is NOT acceptable
- For any missing flag: add an SVG flag renderer to `flagIcons.tsx` and register it in `FLAG_RENDERERS`
- Also add the country to `COUNTRY_CATALOG` in `countryItems.ts` if missing

Common missing flags to watch for: small nations, Caribbean islands, Central American countries, African states that aren't major powers.

### 6. Fix Errors

For each error found:
1. State what the dataset says vs what the real data is
2. Cite the source
3. Edit the file to fix the value
4. Re-verify after fixing

### 7. Report

Print a verification table:

```
| Data Point | Dataset Value | Real Value | Source | Status |
|-----------|--------------|------------|--------|--------|
| USA 2025  | 3,700        | 3,708      | FAS    | ✅ OK  |
| China peak| 500 (2025)   | 500 (2025) | SIPRI  | ✅ OK  |
| USSR peak | 40,000       | 39,967     | OPCW   | ✅ OK  |
| NK 2025   | 25%          | 34%        | SIPRI  | ❌ FIXED |
```

- List ALL verified data points (minimum 10)
- List all corrections made
- Confirm the dataset compiles after fixes (`npx tsc --noEmit`)
