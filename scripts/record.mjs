#!/usr/bin/env node
/**
 * Record bar-race animations as 1080×1920 MP4 (YouTube Shorts format).
 *
 * Steps through each video frame via the React component's setProgress API,
 * screenshots the bar-race-viewport element, then assembles with ffmpeg.
 *
 * Usage:
 *   npm run record              # record ALL datasets
 *   npm run record -- 27        # record dataset #27 only
 *   npm run record -- --list    # list available datasets
 *   npm run record -- 27 --audio /path/to/music.mp3   # with background audio
 *
 * Requires: puppeteer (devDep), ffmpeg (system — brew install ffmpeg)
 */

import puppeteer from "puppeteer";
import { execSync, spawn } from "child_process";
import { mkdir, rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "recordings");
const FRAMES_TMP = path.join(OUTPUT_DIR, ".frames");

const FPS = 30;
const DPR = 1080 / 405; // ≈ 2.667 → 1080×1920 px output
const PORT = 5199;
const END_HOLD_SEC = 3;

// ── helpers ─────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeout = 25_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* not ready */
    }
    await sleep(300);
  }
  throw new Error(`Dev server at ${url} didn't start in ${timeout} ms`);
}

function sanitise(s) {
  return s
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 80);
}

// ── record one dataset ──────────────────────────────────────────────────────

// ── parse --audio flag ─────────────────────────────────────────────────────

let AUDIO_PATH = null;
{
  const ai = process.argv.indexOf("--audio");
  if (ai !== -1 && process.argv[ai + 1]) {
    AUDIO_PATH = path.resolve(process.argv[ai + 1]);
  }
}

async function recordDataset(page, idx) {
  const url = `http://localhost:${PORT}/?record=1&dataset=${idx}`;
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForFunction("window.__barRace?.ready", { timeout: 15_000 });
  await sleep(300); // let GameRace useEffect populate metadata

  const meta = await page.evaluate(() => ({
    frames: window.__barRace.totalFrames,
    dur: window.__barRace.targetDuration,
    label: window.__barRace.label,
  }));

  const vidFrames = Math.ceil((meta.dur / 1000) * FPS);
  const holdFrames = END_HOLD_SEC * FPS;
  const totalCapture = vidFrames + holdFrames;
  const tag = sanitise(meta.label);

  console.log(`  "${meta.label}"`);
  console.log(
    `  ${meta.frames} data → ${vidFrames} video frames (${(vidFrames / FPS).toFixed(1)}s) + ${END_HOLD_SEC}s hold`,
  );

  const dir = path.join(FRAMES_TMP, tag);
  await rm(dir, { recursive: true, force: true }).catch(() => {});
  await mkdir(dir, { recursive: true });

  // target the 9:16 viewport frame
  const el = await page.$('[data-testid="bar-race-viewport"]');
  if (!el) throw new Error("bar-race-viewport not found");

  // disable wall-clock keyframe animations (news ticker, pulse, slide-in) so they
  // don't race ahead of frame-by-frame playback; keep CSS transitions ENABLED so
  // the row-slide (top) and bar-fill (width) animations render smoothly across frames.
  await page.addStyleTag({
    content: "* { animation-duration: 0s !important; }",
  });

  // ── frame-by-frame capture ────────────────────────────────────────────
  const t0 = Date.now();

  for (let v = 0; v < totalCapture; v++) {
    // progress 0→1 over the main animation frames, then hold at 1.0
    const t = Math.min(1, v / (vidFrames - 1));

    await page.evaluate((t) => window.__barRace.setProgress(t), t);
    // double-rAF: guarantees React has flushed the render
    await page.evaluate(
      () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
    );

    const padded = String(v).padStart(5, "0");
    await el.screenshot({ path: path.join(dir, `f${padded}.png`) });

    if ((v + 1) % 100 === 0 || v === totalCapture - 1) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
      const pct = (((v + 1) / totalCapture) * 100).toFixed(0);
      process.stdout.write(`    ${pct}%  (${v + 1}/${totalCapture} frames, ${elapsed}s)\r`);
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`    captured ${totalCapture} frames in ${elapsed}s        `);

  // ── encode with ffmpeg ────────────────────────────────────────────────
  const out = path.join(OUTPUT_DIR, `${tag}.mp4`);
  const videoDuration = totalCapture / FPS;
  const ffmpegArgs = [
    "ffmpeg -y",
    `-framerate ${FPS}`,
    `-i "${dir}/f%05d.png"`,
  ];

  if (AUDIO_PATH) {
    ffmpegArgs.push(`-i "${AUDIO_PATH}"`);
    ffmpegArgs.push(`-t ${videoDuration.toFixed(2)}`);
    ffmpegArgs.push("-c:a aac -b:a 128k -shortest");
  }

  ffmpegArgs.push("-c:v libx264 -pix_fmt yuv420p");
  ffmpegArgs.push("-preset medium -crf 18");
  ffmpegArgs.push(`"${out}"`);

  execSync(ffmpegArgs.join(" "), { stdio: "inherit" });

  console.log(`  ✓ ${out}\n`);
  await rm(dir, { recursive: true, force: true });
}

// ── main ────────────────────────────────────────────────────────────────────

async function main() {
  // preflight
  try {
    execSync("ffmpeg -version", { stdio: "pipe" });
  } catch {
    console.error("Error: ffmpeg not found.\n  brew install ffmpeg");
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("Starting dev server …");
  const vite = spawn("npx", ["vite", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["pipe", "pipe", "pipe"],
  });

  try {
    await waitForServer(`http://localhost:${PORT}`);
    console.log("Dev server ready\n");

    const browser = await puppeteer.launch({
      headless: true,
      protocolTimeout: 0,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 405, height: 720, deviceScaleFactor: DPR });

    // discover datasets
    await page.goto(`http://localhost:${PORT}/?record=1`, { waitUntil: "networkidle0" });
    await page.waitForFunction("window.__barRace?.ready", { timeout: 15_000 });
    await sleep(400);

    const dsCount = await page.evaluate(() => window.__barRace.datasetCount || 1);
    const dsLabels = await page.evaluate(() => window.__barRace.datasetLabels || []);

    if (process.argv.includes("--list")) {
      console.log("Available datasets:");
      dsLabels.forEach((l, i) => console.log(`  ${i}: ${l}`));
      await browser.close();
      return;
    }

    // Find the dataset index arg (skip --list, --audio and its value)
    const positionalArgs = process.argv.slice(2).filter((a, i, arr) => {
      if (a === "--list" || a === "--audio") return false;
      if (i > 0 && arr[i - 1] === "--audio") return false;
      return true;
    });
    const arg = positionalArgs[0];
    let indices;
    if (arg !== undefined && arg !== "--list") {
      const i = parseInt(arg, 10);
      if (isNaN(i) || i < 0 || i >= dsCount) {
        console.error(`Invalid index ${arg}. Use --list to see datasets.`);
        process.exit(1);
      }
      indices = [i];
    } else {
      indices = Array.from({ length: dsCount }, (_, i) => i);
    }

    console.log(`Recording ${indices.length} dataset(s) → ${OUTPUT_DIR}/\n`);

    for (const idx of indices) {
      console.log(`[${idx + 1}/${dsCount}]`);
      await recordDataset(page, idx);
    }

    await browser.close();
  } finally {
    vite.kill("SIGTERM");
  }

  await rm(FRAMES_TMP, { recursive: true, force: true }).catch(() => {});
  console.log("Done! Videos saved to recordings/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
