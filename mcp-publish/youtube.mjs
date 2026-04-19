import { google } from "googleapis";
import { createReadStream, statSync } from "fs";
import http from "http";
import { load, save } from "./store.mjs";

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
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

export async function upload(
  filePath,
  { title, description = "", tags = [], privacyStatus = "public" },
) {
  const client = await makeClient();
  const tokens = await load("youtube-tokens");
  if (!tokens)
    throw new Error("YouTube not authenticated. Call auth_youtube first.");

  const yt = google.youtube({ version: "v3", auth: client });

  const res = await yt.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title,
        description: description + (description ? "\n\n" : "") + "#Shorts",
        tags,
        categoryId: "22",
      },
      status: {
        privacyStatus,
        selfDeclaredMadeForKids: false,
      },
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

export async function isAuthenticated() {
  return !!(await load("youtube-tokens"));
}
