# Deploy Video

Full pipeline: validate → record → publish to YouTube + TikTok.

Orchestrates `/deploy-youtube` and `/deploy-tiktok` skills.

## Arguments
- $DATASET_INDEX: Dataset index numbers (use `npm run record -- --list` to see available)
- $AUDIO_PATH: (Optional) Path to mp3. If not provided, auto-picks random track from `music/`.

## How to Call

```
# Single video — publish immediately to both platforms
/deploy 44

# Multiple videos — auto-stagger 2h apart on YouTube, all at once on TikTok
/deploy 44 47 50

# With specific audio
/deploy 44 /path/to/music.mp3

# Schedule starting at specific time
/deploy 44 47 50 — schedule starting at 7pm

# YouTube only
/deploy-youtube TOP_10_MILITARY_DRONE_FLEETS.mp4

# TikTok only
/deploy-tiktok TOP_10_MILITARY_DRONE_FLEETS.mp4
```

## Best Practices

### Single video
1. Record → upload public to YouTube with comment → upload to TikTok
2. Remind user to pin comment in YouTube Studio

### Multiple videos (staggered)
1. Record all videos
2. Upload **Video 1** to YouTube as **public** with comment — goes live immediately
3. Upload **Videos 2+** to YouTube with `schedule_at` parameter (2h intervals):
   - Video 2: `schedule_at` = now + 2h
   - Video 3: `schedule_at` = now + 4h
   - Video N: `schedule_at` = now + (N-1) × 2h
4. Note scheduled video IDs — comments can only be posted after they go public
5. Upload ALL videos to TikTok immediately (no scheduling available)
6. List "Comments pending" in report for scheduled videos

### Important: Do NOT upload public then switch to scheduled
YouTube does NOT allow scheduling a video that was previously public. Always use `schedule_at` at upload time for videos that need scheduling.

### Timezone
User is in EEST (UTC+3). Always convert local times to UTC for `schedule_at`.

## Steps

### 1. Validate & Verify Data
- `npx tsc --noEmit` must pass
- Dataset must meet all CLAUDE.md rules
- **MANDATORY**: Run `/verify-dataset` on each dataset file before recording. This searches the web for real-world data and fixes inaccuracies. Do NOT skip — viewers call out wrong data in comments, which damages channel credibility.
- If verification finds errors, fix them and re-compile before proceeding.

### 2. Record
```bash
npm run record -- $DATASET_INDEX
```

### 3. Publish YouTube
Invoke `/deploy-youtube` for each video:
- Video 1: no schedule (public immediately)
- Videos 2+: with `schedule_at`

### 4. Publish TikTok
Invoke `/deploy-tiktok` for each video (all immediately, no scheduling available).

### 5. Post Comments
- Public videos: comment posted via `publish_youtube` `comment` parameter
- Scheduled videos: list IDs in report — user asks to post comments after each goes live

### 6. Reply to Existing Comments
Check recent YouTube videos for unreplied viewer comments. Reply with short, friendly responses.

### 7. Report

```
=== DEPLOY REPORT ===

YouTube:
  ✅ Video 1: <URL> — public — comment posted
  ⏰ Video 2: <URL> — scheduled 2:00 PM — comment pending
  ⏰ Video 3: <URL> — scheduled 4:00 PM — comment pending

TikTok:
  ✅ Video 1: processing
  ✅ Video 2: processing
  ✅ Video 3: processing

Reminders:
  - Pin comments in YouTube Studio
  - Post comments on scheduled videos after they go live
  - Reply to viewer comments on recent videos
```

## Platform Comparison

| Feature | YouTube | TikTok |
|---------|---------|--------|
| Upload | ✅ | ✅ |
| Schedule | ✅ `schedule_at` | ❌ |
| Comments | ✅ (public only) | ❌ |
| Description | Separate field | Part of caption |
| Analytics | ✅ | ❌ |
| Playlists | ✅ | ❌ |
