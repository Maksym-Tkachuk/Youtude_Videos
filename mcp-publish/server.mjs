#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readdir, stat } from "fs/promises";
import { join, resolve, isAbsolute, dirname } from "path";
import { fileURLToPath } from "url";
import * as youtube from "./youtube.mjs";
import * as tiktok from "./tiktok.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const RECORDINGS_DIR = join(PROJECT_ROOT, "recordings");

const server = new McpServer({
  name: "video-publish",
  version: "1.0.0",
});

// ── List recordings ────────────────────────────────────────────────────────

server.tool(
  "list_recordings",
  "List available MP4 recordings ready to publish",
  {},
  async () => {
    try {
      const files = await readdir(RECORDINGS_DIR);
      const mp4s = files.filter((f) => f.endsWith(".mp4")).sort();

      if (!mp4s.length) {
        return {
          content: [
            { type: "text", text: "No recordings found in " + RECORDINGS_DIR },
          ],
        };
      }

      const entries = [];
      for (const f of mp4s) {
        const s = await stat(join(RECORDINGS_DIR, f));
        entries.push(
          `  ${f}  (${(s.size / 1e6).toFixed(1)} MB, ${s.mtime.toLocaleDateString()})`,
        );
      }

      return {
        content: [
          {
            type: "text",
            text: `Recordings:\n${entries.join("\n")}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── YouTube auth ───────────────────────────────────────────────────────────

server.tool(
  "auth_youtube",
  "Authenticate with YouTube. Starts OAuth flow and returns a URL to open in your browser.",
  {
    client_id: z.string().describe("Google OAuth2 client ID"),
    client_secret: z.string().describe("Google OAuth2 client secret"),
  },
  async ({ client_id, client_secret }) => {
    try {
      const url = await youtube.startAuth(client_id, client_secret);
      return {
        content: [
          {
            type: "text",
            text:
              `Open this URL in your browser to authenticate with YouTube:\n\n${url}\n\n` +
              `After authorising, you'll be redirected to http://localhost:9876/callback — tokens are saved automatically.\n` +
              `Then you can use publish_youtube to upload videos.`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Auth error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── TikTok auth (two-step: get URL, then exchange code) ────────────────────

server.tool(
  "auth_tiktok",
  "Step 1: Start TikTok OAuth. Returns a URL to open in your browser. After authorizing, you'll see an auth code on the callback page — copy it and use complete_tiktok_auth.",
  {
    client_key: z.string().describe("TikTok app client key"),
    client_secret: z.string().describe("TikTok app client secret"),
    redirect_uri: z
      .string()
      .describe("Public redirect URI registered in TikTok developer portal (localhost not supported)"),
  },
  async ({ client_key, client_secret, redirect_uri }) => {
    try {
      const url = await tiktok.startAuth(client_key, client_secret, redirect_uri);
      return {
        content: [
          {
            type: "text",
            text:
              `Open this URL in your browser to authenticate with TikTok:\n\n${url}\n\n` +
              `After authorising, you'll be redirected to your callback page which displays an auth code.\n` +
              `Copy that code and use complete_tiktok_auth to finish authentication.`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Auth error: " + e.message }],
        isError: true,
      };
    }
  },
);

server.tool(
  "complete_tiktok_auth",
  "Step 2: Finish TikTok authentication by exchanging the auth code for tokens.",
  {
    code: z.string().describe("Authorization code from the TikTok callback page"),
  },
  async ({ code }) => {
    try {
      await tiktok.exchangeCode(code);
      return {
        content: [
          {
            type: "text",
            text: "TikTok authenticated! You can now use publish_tiktok to upload videos.",
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Auth error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Update YouTube Video Status ───────────────────────────────────────────

server.tool(
  "update_video_status",
  "Change a YouTube video's privacy status or schedule it for later publishing",
  {
    video_id: z.string().describe("YouTube video ID"),
    privacy: z.enum(["public", "private", "unlisted"]).optional().describe("New privacy status"),
    schedule_at: z.string().optional().describe("Schedule publish time in ISO 8601 (e.g. 2026-04-22T15:00:00Z). Sets video to private until this time."),
  },
  async ({ video_id, privacy, schedule_at }) => {
    try {
      const result = await youtube.updateVideoStatus(video_id, {
        privacyStatus: privacy || "private",
        publishAt: schedule_at || undefined,
      });
      return {
        content: [{
          type: "text",
          text: `Video ${result.id} updated!\nPrivacy: ${result.privacyStatus}${result.publishAt ? `\nScheduled for: ${result.publishAt}` : ""}`,
        }],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Publish to YouTube ─────────────────────────────────────────────────────

server.tool(
  "publish_youtube",
  "Upload a video to YouTube as a Short",
  {
    video_path: z
      .string()
      .describe("Path to MP4 file (absolute, or just the filename from recordings/)"),
    title: z.string().describe("Video title"),
    description: z.string().optional().describe("Video description"),
    tags: z.string().optional().describe("Comma-separated tags"),
    privacy: z
      .enum(["public", "private", "unlisted"])
      .optional()
      .describe("Privacy status (default: public)"),
    comment: z.string().optional().describe("Comment to post on the video after upload"),
    schedule_at: z.string().optional().describe("Schedule publish time in ISO 8601 format (e.g. 2026-04-21T11:00:00Z). Video uploads as private and auto-publishes at this time."),
  },
  async ({ video_path, title, description, tags, privacy, comment, schedule_at }) => {
    try {
      const fullPath = resolveVideoPath(video_path);
      await stat(fullPath);

      const result = await youtube.upload(fullPath, {
        title,
        description: description || "",
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        privacyStatus: privacy || "public",
        publishAt: schedule_at || undefined,
      });

      let commentInfo = "";
      if (comment) {
        try {
          await youtube.addComment(result.id, comment);
          commentInfo = "\nComment posted!";
        } catch (e) {
          commentInfo = `\nComment failed: ${e.message}`;
        }
      }

      return {
        content: [
          {
            type: "text",
            text: `Uploaded to YouTube!\nURL: ${result.url}\nVideo ID: ${result.id}${schedule_at ? `\nScheduled for: ${schedule_at}` : ""}${commentInfo}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "YouTube upload error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Publish to TikTok ──────────────────────────────────────────────────────

server.tool(
  "publish_tiktok",
  "Upload a video to TikTok",
  {
    video_path: z
      .string()
      .describe("Path to MP4 file (absolute, or just the filename from recordings/)"),
    title: z.string().describe("Video caption"),
    privacy: z
      .enum(["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "SELF_ONLY"])
      .optional()
      .describe("Privacy level (default: PUBLIC_TO_EVERYONE)"),
  },
  async ({ video_path, title, privacy }) => {
    try {
      const fullPath = resolveVideoPath(video_path);
      await stat(fullPath);

      const result = await tiktok.upload(fullPath, {
        title,
        privacyLevel: privacy || "PUBLIC_TO_EVERYONE",
      });

      return {
        content: [
          {
            type: "text",
            text:
              `Uploaded to TikTok!\nPublish ID: ${result.publishId}\n` +
              `Status: ${result.status} (may take a few minutes to appear on your profile)`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "TikTok upload error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Publish to both platforms ──────────────────────────────────────────────

server.tool(
  "publish_all",
  "Upload a video to both YouTube and TikTok at once",
  {
    video_path: z
      .string()
      .describe("Path to MP4 file (absolute, or just the filename from recordings/)"),
    title: z.string().describe("Video title"),
    description: z.string().optional().describe("YouTube description"),
    tags: z.string().optional().describe("YouTube comma-separated tags"),
    comment: z.string().optional().describe("Comment to post on the YouTube video after upload"),
  },
  async ({ video_path, title, description, tags, comment }) => {
    const fullPath = resolveVideoPath(video_path);

    try {
      await stat(fullPath);
    } catch {
      return {
        content: [{ type: "text", text: `File not found: ${fullPath}` }],
        isError: true,
      };
    }

    const results = [];

    let ytId = null;
    try {
      const yt = await youtube.upload(fullPath, {
        title,
        description: description || "",
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        privacyStatus: "public",
      });
      ytId = yt.id;
      results.push(`YouTube: ${yt.url}`);
    } catch (e) {
      results.push(`YouTube failed: ${e.message}`);
    }

    if (ytId && comment) {
      try {
        await youtube.addComment(ytId, comment);
        results.push("YouTube comment posted!");
      } catch (e) {
        results.push(`YouTube comment failed: ${e.message}`);
      }
    }

    try {
      const tt = await tiktok.upload(fullPath, { title });
      results.push(`TikTok: publish ID ${tt.publishId} (processing)`);
    } catch (e) {
      results.push(`TikTok failed: ${e.message}`);
    }

    return { content: [{ type: "text", text: results.join("\n") }] };
  },
);

// ── Comment on YouTube video ───────────────────────────────────────────────

server.tool(
  "comment_youtube",
  "Post a comment on an existing YouTube video",
  {
    video_id: z.string().describe("YouTube video ID"),
    comment: z.string().describe("Comment text"),
  },
  async ({ video_id, comment }) => {
    try {
      await youtube.addComment(video_id, comment);
      return {
        content: [{ type: "text", text: `Comment posted on video ${video_id}!` }],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Comment error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Read YouTube Comments ─────────────────────────────────────────────────

server.tool(
  "read_comments",
  "Read comments on a YouTube video",
  {
    video_id: z.string().describe("YouTube video ID"),
    max_results: z.number().optional().describe("Max comments to return (default: 20)"),
  },
  async ({ video_id, max_results }) => {
    try {
      const comments = await youtube.getComments(video_id, max_results || 20);
      if (!comments.length) {
        return { content: [{ type: "text", text: "No comments found." }] };
      }
      const lines = comments.map(
        (c, i) =>
          `${i + 1}. **${c.author}** (${c.publishedAt?.split("T")[0]})${c.likeCount ? ` · ${c.likeCount} likes` : ""}${c.replyCount ? ` · ${c.replyCount} replies` : ""}\n   ${c.text}`,
      );
      return { content: [{ type: "text", text: lines.join("\n\n") }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Update YouTube Channel ────────────────────────────────────────────────

server.tool(
  "update_channel",
  "Update YouTube channel description",
  {
    description: z.string().describe("New channel description"),
  },
  async ({ description }) => {
    try {
      const result = await youtube.updateChannel(description);
      return {
        content: [
          {
            type: "text",
            text: `Channel updated!\nDescription:\n${result.description}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Create YouTube Playlist ───────────────────────────────────────────────

server.tool(
  "create_playlist",
  "Create a new YouTube playlist",
  {
    title: z.string().describe("Playlist title"),
    description: z.string().optional().describe("Playlist description"),
  },
  async ({ title, description }) => {
    try {
      const result = await youtube.createPlaylist(title, description || "");
      return {
        content: [
          {
            type: "text",
            text: `Playlist created!\nID: ${result.id}\nTitle: ${result.title}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Add video to playlist ─────────────────────────────────────────────────

server.tool(
  "add_to_playlist",
  "Add a video to a YouTube playlist",
  {
    playlist_id: z.string().describe("YouTube playlist ID"),
    video_id: z.string().describe("YouTube video ID"),
  },
  async ({ playlist_id, video_id }) => {
    try {
      await youtube.addToPlaylist(playlist_id, video_id);
      return {
        content: [
          { type: "text", text: `Added video ${video_id} to playlist ${playlist_id}` },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── YouTube Channel Stats ─────────────────────────────────────────────────

server.tool(
  "channel_stats",
  "Get YouTube channel overview: subscribers, total views, video count",
  {},
  async () => {
    try {
      const stats = await youtube.getChannelStats();
      return {
        content: [
          {
            type: "text",
            text:
              `Channel: ${stats.title}\n` +
              `Subscribers: ${stats.subscriberCount.toLocaleString()}\n` +
              `Total Views: ${stats.viewCount.toLocaleString()}\n` +
              `Videos: ${stats.videoCount}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── List all videos with stats ────────────────────────────────────────────

server.tool(
  "list_videos",
  "List all YouTube videos with view counts, likes, and comments",
  {
    max_results: z.number().optional().describe("Max videos to return (default: 50)"),
  },
  async ({ max_results }) => {
    try {
      const videos = await youtube.listVideos(max_results || 50);
      if (!videos.length) {
        return { content: [{ type: "text", text: "No videos found." }] };
      }

      const lines = videos.map(
        (v, i) =>
          `${i + 1}. ${v.title}\n   Views: ${v.viewCount.toLocaleString()} | Likes: ${v.likeCount.toLocaleString()} | Comments: ${v.commentCount}\n   ${v.url} | Published: ${v.publishedAt?.split("T")[0]}`,
      );

      return {
        content: [{ type: "text", text: lines.join("\n\n") }],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Video analytics (detailed) ────────────────────────────────────────────

server.tool(
  "video_analytics",
  "Get detailed analytics for a specific YouTube video: views, watch time, retention, CTR, impressions",
  {
    video_id: z.string().describe("YouTube video ID"),
    start_date: z
      .string()
      .optional()
      .describe("Start date YYYY-MM-DD (default: 30 days ago)"),
    end_date: z
      .string()
      .optional()
      .describe("End date YYYY-MM-DD (default: today)"),
  },
  async ({ video_id, start_date, end_date }) => {
    try {
      const end = end_date || new Date().toISOString().split("T")[0];
      const start =
        start_date ||
        new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

      const data = await youtube.getVideoAnalytics(video_id, start, end);

      if (data.message) {
        return { content: [{ type: "text", text: data.message }] };
      }

      return {
        content: [
          {
            type: "text",
            text:
              `Video Analytics (${start} to ${end})\n` +
              `Video ID: ${data.videoId}\n` +
              `Views: ${data.views?.toLocaleString()}\n` +
              `Watch Time: ${data.estimatedMinutesWatched?.toFixed(1)} min\n` +
              `Avg View Duration: ${data.averageViewDurationSec?.toFixed(1)}s\n` +
              `Avg View %: ${data.averageViewPercentage?.toFixed(1)}%\n` +
              `Likes: ${data.likes}\n` +
              `Shares: ${data.shares}\n` +
              `Subscribers Gained: ${data.subscribersGained}\n` +
              `Impressions: ${data.impressions?.toLocaleString()}\n` +
              `CTR: ${(data.impressionCTR * 100)?.toFixed(2)}%`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Analytics error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Channel analytics (period overview) ───────────────────────────────────

server.tool(
  "channel_analytics",
  "Get channel-wide analytics for a date range: views, watch time, retention, CTR, subscriber changes",
  {
    start_date: z
      .string()
      .optional()
      .describe("Start date YYYY-MM-DD (default: 30 days ago)"),
    end_date: z
      .string()
      .optional()
      .describe("End date YYYY-MM-DD (default: today)"),
  },
  async ({ start_date, end_date }) => {
    try {
      const end = end_date || new Date().toISOString().split("T")[0];
      const start =
        start_date ||
        new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

      const data = await youtube.getChannelAnalytics(start, end);

      if (data.message && !data.views) {
        return { content: [{ type: "text", text: data.message }] };
      }

      return {
        content: [
          {
            type: "text",
            text:
              `Channel Analytics (${data.period})\n` +
              `Views: ${data.views?.toLocaleString()}\n` +
              `Watch Time: ${data.estimatedMinutesWatched?.toFixed(1)} min\n` +
              `Avg View Duration: ${data.averageViewDurationSec?.toFixed(1)}s\n` +
              `Avg View %: ${data.averageViewPercentage?.toFixed(1)}%\n` +
              `Likes: ${data.likes}\n` +
              `Shares: ${data.shares}\n` +
              `Subscribers Gained: +${data.subscribersGained}\n` +
              `Subscribers Lost: -${data.subscribersLost}\n` +
              `Net Subscribers: ${data.subscribersGained - data.subscribersLost}\n` +
              `Impressions: ${data.impressions?.toLocaleString()}\n` +
              `CTR: ${(data.impressionCTR * 100)?.toFixed(2)}%`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Analytics error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Top videos by views ───────────────────────────────────────────────────

server.tool(
  "top_videos",
  "Get top performing videos ranked by views with detailed metrics",
  {
    start_date: z
      .string()
      .optional()
      .describe("Start date YYYY-MM-DD (default: 30 days ago)"),
    end_date: z
      .string()
      .optional()
      .describe("End date YYYY-MM-DD (default: today)"),
    max_results: z.number().optional().describe("Number of videos (default: 10)"),
  },
  async ({ start_date, end_date, max_results }) => {
    try {
      const end = end_date || new Date().toISOString().split("T")[0];
      const start =
        start_date ||
        new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

      const videos = await youtube.getTopVideos(start, end, max_results || 10);

      if (!videos.length) {
        return {
          content: [{ type: "text", text: "No analytics data for this period." }],
        };
      }

      const lines = videos.map(
        (v, i) =>
          `${i + 1}. ${v.title}\n` +
          `   Views: ${v.views?.toLocaleString()} | Watch: ${v.estimatedMinutesWatched?.toFixed(1)}min | Retention: ${v.averageViewPercentage?.toFixed(1)}%\n` +
          `   Impressions: ${v.impressions?.toLocaleString()} | CTR: ${(v.impressionCTR * 100)?.toFixed(2)}% | Subs: +${v.subscribersGained}\n` +
          `   ${v.url}`,
      );

      return {
        content: [
          {
            type: "text",
            text: `Top Videos (${start} to ${end})\n\n${lines.join("\n\n")}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [{ type: "text", text: "Analytics error: " + e.message }],
        isError: true,
      };
    }
  },
);

// ── Helpers ────────────────────────────────────────────────────────────────

function resolveVideoPath(p) {
  if (isAbsolute(p)) return p;
  if (!p.includes("/") && !p.includes("\\")) {
    return join(RECORDINGS_DIR, p);
  }
  return resolve(PROJECT_ROOT, p);
}

// ── Start ──────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
