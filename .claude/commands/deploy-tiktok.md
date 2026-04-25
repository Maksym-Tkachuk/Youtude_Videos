# Deploy to TikTok

Upload a recorded video to TikTok with proper caption and hashtags.

## Arguments
- $VIDEO_PATH: Path to MP4 file (filename from recordings/ or absolute path)
- $TITLE: (Optional) Video title — auto-generated if not provided

## Steps

### 1. Generate Caption

TikTok has no separate description field — everything goes in the caption:
```
<video title> <1-2 sentence summary>

👉 Follow for daily charts!
💪 Train like a pro with Training Club — link in bio!
#military #geopolitics #chart #dataviz #<topic-specific>
```
- Include 4-5 relevant hashtags at the end
- Keep caption under 2,200 characters (TikTok limit)

### 2. Upload

- **Privacy**: `SELF_ONLY` while app is unaudited, `PUBLIC_TO_EVERYONE` once approved
- If TikTok auth fails or upload errors, log the error — don't crash

### 3. Report

```
TikTok: Publish ID <id> | Status: processing
Privacy: SELF_ONLY (unaudited) | PUBLIC_TO_EVERYONE (approved)
```

### Known Limitations
- No scheduling via API — videos go live immediately
- No comments via API
- No analytics via API
- No playlists
- App must be approved by TikTok for public posting (currently SELF_ONLY)
