#!/usr/bin/env node
// Download the embedding model into agent/model so the server never has to fetch
// it at runtime. About 23 MB. The folder is git-ignored; a deploy runs this and
// ships the folder next to the app.
//
// Run: npm run agent:model
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MODEL } from "../core/embed.mjs";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "model");
if (existsSync(join(dir, MODEL, "onnx", "model_quantized.onnx"))) {
  console.log(`model already in ${dir}`);
  process.exit(0);
}
const { pipeline, env } = await import("@huggingface/transformers");
env.cacheDir = dir;
const extract = await pipeline("feature-extraction", MODEL, { dtype: "q8" });
const out = await extract(["ready"], { pooling: "mean", normalize: true });
console.log(`model ${MODEL} saved to ${dir} (${out.dims[1]} dimensions)`);
