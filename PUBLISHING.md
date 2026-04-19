# Video Publishing Guide

- **Repository**: https://github.com/Maksym-Tkachuk/Youtude_Videos
- **TikTok OAuth callback**: https://maksym-tkachuk.github.io/Youtude_Videos/

## Overview

This project has two main workflows: **recording** bar-race animations as MP4 videos, and **publishing** them to YouTube and TikTok. Recording is done via an npm script. Publishing is done through Claude Code using an MCP server.

---

## Recording Videos

### Prerequisites

- **ffmpeg** installed: `brew install ffmpeg`
- **puppeteer** (already in devDependencies)

### Commands

```bash
# List all available datasets with their index numbers
npm run record -- --list

# Record a single dataset by index
npm run record -- 5

# Record ALL datasets (takes a while)
npm run record
```

### Output

- Videos are saved to `recordings/` as `<DATASET_TITLE>.mp4`
- Format: 1080x1920 (9:16 vertical), 30 fps, ~45 seconds
- Ready for YouTube Shorts and TikTok without re-encoding

---

## Publishing Videos

Publishing uses an MCP server (`mcp-publish/`) that integrates with Claude Code. Once authenticated, you can ask Claude to publish videos directly from the conversation.

### First-Time Setup

You need API credentials for each platform. This is a one-time process.

#### YouTube

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable **YouTube Data API v3** (APIs & Services > Library)
4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Add authorized redirect URI: `http://localhost:9876/callback`
8. Copy the **Client ID** and **Client Secret**

Then in Claude Code, say:

> Authenticate with YouTube, client ID is `YOUR_CLIENT_ID`, secret is `YOUR_CLIENT_SECRET`

Claude will return a URL. Open it in your browser, sign in with your YouTube account, and authorize. Tokens are saved automatically to `~/.config/mcp-video-publish/youtube-tokens.json`.

#### TikTok

1. Go to [TikTok Developer Portal](https://developers.tiktok.com)
2. Create a new app
3. Request the **video.publish** and **user.info.basic** scopes
4. Wait for scope approval from TikTok
5. Add authorized redirect URI: `https://maksym-tkachuk.github.io/Youtude_Videos/`
6. Copy the **Client Key** and **Client Secret**

Then in Claude Code, say:

> Authenticate with TikTok, client key is `YOUR_CLIENT_KEY`, secret is `YOUR_CLIENT_SECRET`, redirect URI is `https://maksym-tkachuk.github.io/Youtude_Videos/`

After authorizing, the callback page shows an auth code. Copy it and tell Claude:

> Complete TikTok auth, code is `THE_CODE`

Tokens are saved to `~/.config/mcp-video-publish/tiktok-tokens.json`.

### Publishing Rules

Every video must follow these rules when publishing:

- **Title**: max 60 characters. Keep it punchy and descriptive.
- **Tags**: at most 3 tags. Pick the most relevant keywords only.
- **Description**: always include a short description (1-2 sentences) that tells viewers what the video is about.

### Publishing

Once authenticated, just talk to Claude in natural language:

```
# List what's available
> Show me my recordings

# Publish to YouTube only
> Publish TOP_10_NUCLEAR_TEST_DETONATIONS.mp4 to YouTube

# Publish to TikTok only
> Publish TOP_10_GOLD_RESERVES.mp4 to TikTok

# Publish to both platforms at once
> Publish TOP_10_PRISON_POPULATIONS.mp4 to YouTube and TikTok
```

### Available MCP Tools

| Tool | What it does |
|---|---|
| `list_recordings` | Lists all MP4 files in `recordings/` with sizes and dates |
| `auth_youtube` | Starts YouTube OAuth flow (needs client ID + secret) |
| `auth_tiktok` | Step 1 of TikTok OAuth (needs client key + secret + redirect URI) |
| `complete_tiktok_auth` | Step 2 of TikTok OAuth (paste the code from the callback page) |
| `publish_youtube` | Uploads a video to YouTube as a Short |
| `publish_tiktok` | Uploads a video to TikTok |
| `publish_all` | Uploads to both YouTube and TikTok in one go |

### YouTube-Specific Options

- **privacy**: `public` (default), `private`, or `unlisted`
- **tags**: comma-separated keywords for discoverability
- **description**: text shown below the video
- `#Shorts` is appended to the description automatically

### TikTok-Specific Options

- **privacy**: `PUBLIC_TO_EVERYONE` (default), `MUTUAL_FOLLOW_FRIENDS`, or `SELF_ONLY`

---

## Full Workflow Example

```bash
# 1. Record the video
npm run record -- 12

# 2. In Claude Code, publish it
> Publish TOP_10_MILITARY_SPENDING.mp4 to YouTube and TikTok
```

Claude will automatically generate a title (max 60 chars), up to 3 tags, and a short description based on the dataset content and publishing rules.

---

## Where Credentials Are Stored

All OAuth tokens and API credentials are stored locally, outside the repo:

```
~/.config/mcp-video-publish/
  youtube-credentials.json   # OAuth client ID/secret
  youtube-tokens.json        # Access + refresh tokens
  tiktok-credentials.json    # App client key/secret
  tiktok-tokens.json         # Access + refresh tokens
```

These files are never committed to git. YouTube tokens auto-refresh. TikTok tokens refresh automatically when expired (if the refresh token is still valid), otherwise re-run `auth_tiktok`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `YouTube not authenticated` | Run `auth_youtube` with your credentials |
| `TikTok token expired` | Run `auth_tiktok` again |
| `No recordings found` | Run `npm run record` first |
| `ffmpeg not found` | `brew install ffmpeg` |
| MCP tools not showing | Restart Claude Code so it picks up `.mcp.json` |
