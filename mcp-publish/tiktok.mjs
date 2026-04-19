import { readFile, stat } from "fs/promises";
import { load, save } from "./store.mjs";

export async function startAuth(clientKey, clientSecret, redirectUri) {
  await save("tiktok-credentials", { clientKey, clientSecret, redirectUri });

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: "user.info.basic,video.publish",
    response_type: "code",
    redirect_uri: redirectUri,
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${params}`;
}

export async function exchangeCode(code) {
  const creds = await load("tiktok-credentials");
  if (!creds)
    throw new Error("TikTok not configured. Call auth_tiktok first.");

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: creds.clientKey,
      client_secret: creds.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: creds.redirectUri,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error_description || data.error);

  await save("tiktok-tokens", { ...data, obtained_at: Date.now() });
  return data;
}

async function refreshTokenIfNeeded() {
  const tokens = await load("tiktok-tokens");
  if (!tokens)
    throw new Error("TikTok not authenticated. Call auth_tiktok first.");

  const age = Date.now() - (tokens.obtained_at || 0);
  const expiresIn = (tokens.expires_in || 86400) * 1000;

  if (age < expiresIn - 3600_000) {
    return tokens.access_token;
  }

  const creds = await load("tiktok-credentials");
  if (!creds || !tokens.refresh_token) {
    throw new Error(
      "TikTok token expired and cannot refresh. Re-run auth_tiktok.",
    );
  }

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: creds.clientKey,
      client_secret: creds.clientSecret,
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error_description || data.error);

  await save("tiktok-tokens", { ...data, obtained_at: Date.now() });
  return data.access_token;
}

export async function upload(
  filePath,
  { title, privacyLevel = "PUBLIC_TO_EVERYONE" },
) {
  const token = await refreshTokenIfNeeded();
  const fileStat = await stat(filePath);
  const fileData = await readFile(filePath);

  const initRes = await fetch(
    "https://open.tiktokapis.com/v2/post/publish/video/init/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_info: {
          title,
          privacy_level: privacyLevel,
          disable_duet: false,
          disable_stitch: false,
          disable_comment: false,
          video_cover_timestamp_ms: 1000,
        },
        source_info: {
          source: "FILE_UPLOAD",
          video_size: fileStat.size,
          chunk_size: fileStat.size,
          total_chunk_count: 1,
        },
      }),
    },
  );

  const initData = await initRes.json();
  if (initData.error?.code) {
    throw new Error(
      `TikTok init failed: ${initData.error.code} — ${initData.error.message}`,
    );
  }

  const uploadUrl = initData.data.upload_url;
  const publishId = initData.data.publish_id;

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Range": `bytes 0-${fileStat.size - 1}/${fileStat.size}`,
      "Content-Type": "video/mp4",
    },
    body: fileData,
  });

  if (!uploadRes.ok) {
    throw new Error(
      `TikTok upload failed: ${uploadRes.status} ${uploadRes.statusText}`,
    );
  }

  return { publishId, status: "processing" };
}

export async function isAuthenticated() {
  return !!(await load("tiktok-tokens"));
}
