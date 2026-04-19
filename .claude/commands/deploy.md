# Deploy Video

Full pipeline for deploying a bar-race video: validate dataset, record with audio, and publish to YouTube.

## Arguments
- $DATASET_INDEX: Dataset index number (use `npm run record -- --list` to see available)
- $AUDIO_PATH: Path to audio file (mp3)

## Steps

### 1. Validate Dataset

Before recording, double-check the dataset for correctness:

- Run `npx tsc --noEmit` to verify the project compiles
- Read the dataset file and verify:
  - At least 30 items in ITEMS array
  - Every item has `id`, `name`, `color`, and `renderIcon`
  - MILESTONES has entries for all items that should appear in the top 10
  - No milestone years exceed `endYear`
  - USSR and Russia are separate entities (if applicable)
  - Historical states transition to zero when dissolved (if applicable)
  - `skipEmptyStartFrames` is `false`
  - `valueUnit` is set
  - `events` has exactly 3-4 entries with 15+ year gaps between each
  - `topN` is 10
  - Title includes "TOP 10"
  - Time span is between 40-100 years
- Run the dev server and capture a test frame at progress 0.5 to visually verify the chart looks correct
- Report any issues found before proceeding

### 2. Record Video

```bash
npm run record -- $DATASET_INDEX --audio "$AUDIO_PATH"
```

Verify the output MP4 exists in `recordings/` and check its dimensions are correct for Shorts (should be vertical from the recorder, but verify width < height).

### 3. Publish to YouTube

Follow the publishing rules from CLAUDE.md:
- **Title**: max 60 characters, punchy, CTR-optimized
- **Hashtags**: exactly 3 hashtags at end of title — always include `#chart`
- **Description**: 1-2 sentence summary of what the video shows
- Do NOT use YouTube metadata tags — only hashtags in title
- Privacy: public

Use the youtube upload module from `mcp-publish/youtube.mjs` to publish:

```javascript
import { upload } from './mcp-publish/youtube.mjs';
await upload('recordings/<filename>.mp4', {
  title: '<generated title> #tag1 #tag2 #chart',
  description: '<generated description>',
  tags: [],
  privacyStatus: 'public',
});
```

### 4. Post Comment

After uploading, always post this pinned comment on the video:

```
Train like a pro, or build your own workouts 🏋️‍♂️
Start here: https://trainingclub.team/download
```

Use the `addComment` function from `mcp-publish/youtube.mjs`:

```javascript
import { addComment } from './mcp-publish/youtube.mjs';
await addComment(videoId, 'Train like a pro, or build your own workouts 🏋️‍♂️\nStart here: https://trainingclub.team/download');
```

### 5. Report

Print the final result:
- Video URL
- Title used
- Description used
- Any validation warnings found in step 1
