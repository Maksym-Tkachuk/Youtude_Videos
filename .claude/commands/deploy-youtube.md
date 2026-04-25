# Deploy to YouTube

Upload a recorded video to YouTube with proper title, description, and scheduling.

## Arguments
- $VIDEO_PATH: Path to MP4 file (filename from recordings/ or absolute path)
- $TITLE: (Optional) Video title — auto-generated if not provided
- $SCHEDULE_AT: (Optional) ISO 8601 time to schedule publish (e.g. 2026-04-23T12:00:00Z)

## Steps

### 1. Generate Title & Description

If title not provided, generate from the video filename:
- **Title**: max 60 characters, curiosity-driven phrasing
  - Question hook: "Which Country Has the Most Tanks?" > "Top 10 Tank Fleets"
  - Dramatic framing: "How WW1 Bankrupted Europe" > "WW1 Government Spending"
- **Hashtags**: exactly 3 at end of title — always include `#chart`
- **Description**:
  ```
  <1-2 sentence summary>

  👉 Subscribe for daily charts!
  💪 Train like a pro with Training Club — link in channel bio!
  ```

### 2. Upload

- **Always use `schedule_at`** when deploying multiple videos (2h intervals)
- For single video with no schedule specified → upload as **public**
- Do NOT include `comment` parameter — user will add comments manually after the video goes public
- Note video IDs in report so user can post comments later

### 3. Report

```
YouTube: <URL>
Video ID: <id>
Title: <title>
Status: public | scheduled for <time> (EEST)
Comment: user will add manually after publish
```

### Staggering (multiple videos)
- Video 1: `schedule_at` = specified time or now
- Video 2: `schedule_at` = +2 hours
- Video 3: `schedule_at` = +4 hours
- Use EEST (UTC+3) for display, UTC for API

### Known Limitations
- YouTube does NOT allow scheduling a video that was previously public
- Comments cannot be posted on scheduled/private videos
- Pinning comments must be done manually in YouTube Studio
