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
  },
  async ({ video_path, title, description, tags, privacy, comment }) => {
    try {
      const fullPath = resolveVideoPath(video_path);
      await stat(fullPath);

      const result = await youtube.upload(fullPath, {
        title,
        description: description || "",
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        privacyStatus: privacy || "public",
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
            text: `Uploaded to YouTube!\nURL: ${result.url}\nVideo ID: ${result.id}${commentInfo}`,
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
