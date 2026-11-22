// The embedding model: text in, 384 numbers out, texts with similar meaning land
// close together. all-MiniLM-L6-v2, 23 MB, runs on a CPU in a few milliseconds.
//
// It is optional at runtime. If the package or the model files are missing, or
// the native runtime does not load on this machine, `embedder()` resolves to
// null and search falls back to word matching. Nothing else depends on it.
//
// Model files are looked for in agent/model (filled by `npm run agent:model`),
// then downloaded once to a cache folder if the machine is online.
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const MODEL = "Xenova/all-MiniLM-L6-v2";
export const DIM = 384;

const here = dirname(fileURLToPath(import.meta.url));
// env override, then next to the running app (a deployed bundle), then next to this file (a checkout)
const localDir = () => [process.env.STASHUI_MODEL_DIR, join(process.cwd(), "agent", "model"), join(here, "..", "model")]
  .find((d) => d && existsSync(join(d, MODEL))) || null;

let loading = null;

/** @returns {Promise<null | ((texts: string[]) => Promise<number[][]>)>} */
export function embedder() {
  if (process.env.STASHUI_NO_EMBED) return Promise.resolve(null);
  return (loading ||= (async () => {
    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      const local = localDir();
      if (local) { env.localModelPath = local; env.allowRemoteModels = false; }
      else env.cacheDir = process.env.STASHUI_MODEL_CACHE || join(tmpdir(), "stashui-model");
      const extract = await pipeline("feature-extraction", MODEL, { dtype: "q8" });
      return async (texts) => (await extract(texts, { pooling: "mean", normalize: true })).tolist();
    } catch (e) {
      console.warn(`[stashui] meaning search is off (${String(e?.message || e).split("\n")[0]}); using word matching only`);
      setTimeout(() => { loading = null; }, 10 * 60 * 1000).unref?.();   // try again later, not on every request
      return null;
    }
  })());
}
