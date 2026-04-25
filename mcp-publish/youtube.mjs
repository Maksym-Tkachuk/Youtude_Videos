import { google } from "googleapis";
import { createReadStream, statSync } from "fs";
import http from "http";
import { load, save } from "./store.mjs";

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];
const REDIRECT_PORT = 9876;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;

let callbackServer = null;

async function makeClient() {
  const creds = await load("youtube-credentials");
  if (!creds)
    throw new Error("YouTube not configured. Call auth_youtube first.");

  const client = new google.auth.OAuth2(
    creds.clientId,
    creds.clientSecret,
    REDIRECT_URI,
  );

  const tokens = await load("youtube-tokens");
  if (tokens) {
    client.setCredentials(tokens);
    client.on("tokens", async (t) => {
      const old = (await load("youtube-tokens")) || {};
      await save("youtube-tokens", { ...old, ...t });
    });
  }

  return client;
}

export async function startAuth(clientId, clientSecret) {
  await save("youtube-credentials", { clientId, clientSecret });
  const client = await makeClient();

  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  // Kill old server if running
  if (callbackServer) {
    callbackServer.close();
    callbackServer = null;
  }

  callbackServer = http.createServer(async (req, res) => {
    if (!req.url?.startsWith("/callback")) return;

    const params = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
    const code = params.searchParams.get("code");

    if (!code) {
      res.writeHead(400).end("No authorisation code received");
      return;
    }

    try {
      const { tokens } = await client.getToken(code);
      await save("youtube-tokens", tokens);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<html><body style='font-family:system-ui;text-align:center;padding:4rem'>" +
          "<h1>YouTube authenticated!</h1><p>You can close this tab.</p></body></html>",
      );
    } catch (e) {
      res.writeHead(500).end("Auth failed: " + e.message);
    }

    setTimeout(() => {
      callbackServer?.close();
      callbackServer = null;
    }, 1000);
  });

  callbackServer.listen(REDIRECT_PORT);

  // Auto-close after 5 minutes
  setTimeout(() => {
    callbackServer?.close();
    callbackServer = null;
  }, 300_000);

  return url;
}

export async function updateVideoStatus(videoId, { privacyStatus, publishAt }) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const status = { privacyStatus };
  if (publishAt) {
    status.privacyStatus = "private";
    status.publishAt = publishAt;
  }

  const res = await yt.videos.update({
    part: ["status"],
    requestBody: { id: videoId, status },
  });

  return {
    id: res.data.id,
    privacyStatus: res.data.status.privacyStatus,
    publishAt: res.data.status.publishAt,
  };
}

export async function upload(
  filePath,
  { title, description = "", tags = [], privacyStatus = "public", publishAt },
) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const status = {
    privacyStatus: publishAt ? "private" : privacyStatus,
    selfDeclaredMadeForKids: false,
  };
  if (publishAt) status.publishAt = publishAt; // ISO 8601, e.g. "2026-04-21T11:00:00Z"

  const res = await yt.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title,
        description: description + (description ? "\n\n" : "") + "#Shorts",
        tags,
        categoryId: "22",
      },
      status,
    },
    media: {
      body: createReadStream(filePath),
    },
  });

  return {
    id: res.data.id,
    url: `https://youtube.com/shorts/${res.data.id}`,
  };
}

export async function getComments(videoId, maxResults = 20) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.commentThreads.list({
    part: ["snippet"],
    videoId,
    maxResults,
    order: "time",
  });

  return (res.data.items || []).map((item) => ({
    id: item.id,
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
    text: item.snippet.topLevelComment.snippet.textOriginal,
    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    likeCount: item.snippet.topLevelComment.snippet.likeCount,
    replyCount: item.snippet.totalReplyCount,
  }));
}

export async function addComment(videoId, text) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.commentThreads.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: { textOriginal: text },
        },
      },
    },
  });

  return { commentId: res.data.id };
}

export async function updateChannel(description) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  // Get current channel data
  const ch = await yt.channels.list({ part: ["snippet"], mine: true });
  const channel = ch.data.items?.[0];
  if (!channel) throw new Error("No channel found.");

  // Update description
  channel.snippet.description = description;

  const res = await yt.channels.update({
    part: ["snippet"],
    requestBody: {
      id: channel.id,
      snippet: channel.snippet,
    },
  });

  return { id: res.data.id, description: res.data.snippet.description };
}

export async function createPlaylist(title, description = "") {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.playlists.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: { title, description },
      status: { privacyStatus: "public" },
    },
  });

  return { id: res.data.id, title: res.data.snippet.title };
}

export async function addToPlaylist(playlistId, videoId) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.playlistItems.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        playlistId,
        resourceId: { kind: "youtube#video", videoId },
      },
    },
  });

  return { id: res.data.id };
}

export async function getChannelStats() {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.channels.list({
    part: ["snippet", "statistics", "contentDetails"],
    mine: true,
  });

  const ch = res.data.items?.[0];
  if (!ch) throw new Error("No channel found for this account.");

  return {
    id: ch.id,
    title: ch.snippet.title,
    description: ch.snippet.description,
    subscriberCount: Number(ch.statistics.subscriberCount),
    viewCount: Number(ch.statistics.viewCount),
    videoCount: Number(ch.statistics.videoCount),
    uploadsPlaylistId: ch.contentDetails?.relatedPlaylists?.uploads,
  };
}

export async function listVideos(maxResults = 50) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  // Get the uploads playlist
  const channel = await getChannelStats();
  const playlistId = channel.uploadsPlaylistId;
  if (!playlistId) throw new Error("Could not find uploads playlist.");

  // Fetch playlist items
  const playlistRes = await yt.playlistItems.list({
    part: ["snippet"],
    playlistId,
    maxResults,
  });

  const videoIds = playlistRes.data.items.map(
    (item) => item.snippet.resourceId.videoId,
  );

  if (!videoIds.length) return [];

  // Fetch detailed stats for each video
  const videosRes = await yt.videos.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: videoIds,
  });

  return videosRes.data.items.map((v) => ({
    id: v.id,
    title: v.snippet.title,
    publishedAt: v.snippet.publishedAt,
    duration: v.contentDetails.duration,
    viewCount: Number(v.statistics.viewCount || 0),
    likeCount: Number(v.statistics.likeCount || 0),
    commentCount: Number(v.statistics.commentCount || 0),
    url: `https://youtube.com/shorts/${v.id}`,
  }));
}

export async function getVideoAnalytics(videoId, startDate, endDate) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const ytAnalytics = google.youtubeAnalytics({ version: "v2", auth: client });

  const res = await ytAnalytics.reports.query({
    ids: "channel==MINE",
    startDate,
    endDate,
    metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,shares,subscribersGained,impressions,impressionClickThroughRate",
    dimensions: "video",
    filters: `video==${videoId}`,
  });

  const row = res.data.rows?.[0];
  if (!row) return { videoId, message: "No analytics data available yet (may take 48h)." };

  return {
    videoId,
    views: row[1],
    estimatedMinutesWatched: row[2],
    averageViewDurationSec: row[3],
    averageViewPercentage: row[4],
    likes: row[5],
    shares: row[6],
    subscribersGained: row[7],
    impressions: row[8],
    impressionCTR: row[9],
  };
}

export async function getChannelAnalytics(startDate, endDate) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const ytAnalytics = google.youtubeAnalytics({ version: "v2", auth: client });

  const res = await ytAnalytics.reports.query({
    ids: "channel==MINE",
    startDate,
    endDate,
    metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,shares,subscribersGained,subscribersLost,impressions,impressionClickThroughRate",
  });

  const row = res.data.rows?.[0];
  if (!row) return { message: "No analytics data available for this period." };

  return {
    period: `${startDate} to ${endDate}`,
    views: row[0],
    estimatedMinutesWatched: row[1],
    averageViewDurationSec: row[2],
    averageViewPercentage: row[3],
    likes: row[4],
    shares: row[5],
    subscribersGained: row[6],
    subscribersLost: row[7],
    impressions: row[8],
    impressionCTR: row[9],
  };
}

export async function getTopVideos(startDate, endDate, maxResults = 10) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const ytAnalytics = google.youtubeAnalytics({ version: "v2", auth: client });

  const res = await ytAnalytics.reports.query({
    ids: "channel==MINE",
    startDate,
    endDate,
    metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,impressions,impressionClickThroughRate,subscribersGained",
    dimensions: "video",
    sort: "-views",
    maxResults,
  });

  const yt = google.youtube({ version: "v3", auth: client });
  const videoIds = (res.data.rows || []).map((r) => r[0]);

  let titles = {};
  if (videoIds.length) {
    const vRes = await yt.videos.list({ part: ["snippet"], id: videoIds });
    for (const v of vRes.data.items) {
      titles[v.id] = v.snippet.title;
    }
  }

  return (res.data.rows || []).map((row) => ({
    videoId: row[0],
    title: titles[row[0]] || row[0],
    views: row[1],
    estimatedMinutesWatched: row[2],
    averageViewDurationSec: row[3],
    averageViewPercentage: row[4],
    impressions: row[5],
    impressionCTR: row[6],
    subscribersGained: row[7],
    url: `https://youtube.com/shorts/${row[0]}`,
  }));
}

export async function isAuthenticated() {
  return !!(await load("youtube-tokens"));
}
