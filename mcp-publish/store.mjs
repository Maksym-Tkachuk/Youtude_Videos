import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { homedir } from "os";

const CONFIG_DIR = join(homedir(), ".config", "mcp-video-publish");

export async function ensureDir() {
  await mkdir(CONFIG_DIR, { recursive: true });
}

export async function load(name) {
  try {
    return JSON.parse(
      await readFile(join(CONFIG_DIR, `${name}.json`), "utf8"),
    );
  } catch {
    return null;
  }
}

export async function save(name, data) {
  await ensureDir();
  await writeFile(
    join(CONFIG_DIR, `${name}.json`),
    JSON.stringify(data, null, 2),
  );
}
