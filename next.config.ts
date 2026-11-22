import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // This project lives inside a parent folder that also has a lockfile, so pin
  // the workspace root to avoid Next inferring the wrong one.
  outputFileTracingRoot: projectRoot,

  // Meaning search (agent/core/embed.mjs) runs a small embedding model through
  // native code. Keep those packages out of the bundle, and make sure a
  // standalone build carries them and the model files.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
  outputFileTracingIncludes: {
    // The runtime is loaded through a dynamic require the tracer cannot follow, so
    // it is listed by hand: Linux binaries only (the package carries five platforms).
    "/api/**": [
      "./agent/model/**",
      "./node_modules/@huggingface/transformers/package.json",
      "./node_modules/@huggingface/transformers/dist/transformers.node.*",
      "./node_modules/@huggingface/tokenizers/**",
      "./node_modules/@huggingface/jinja/**",
      "./node_modules/onnxruntime-node/package.json",
      "./node_modules/onnxruntime-node/dist/**",
      "./node_modules/onnxruntime-node/bin/napi-v6/linux/**",
      "./node_modules/onnxruntime-common/**",
    ],
  },

  // Lets a dev server and a production server run side by side from one
  // checkout (the recording Mac does: dev for verification, prod for takes).
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // This gallery aggregates hundreds of third-party components whose source and
  // auto-generated demos are not guaranteed strict-clean. Runtime issues are
  // contained by a per-preview error boundary, so we don't let imperfect vendor
  // types/lint block the production build. Our own code is checked via
  // `npm run typecheck` (registry/<library>/ dirs excluded).
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Hide the dev indicator so it doesn't show inside every preview iframe.
  devIndicators: false,

  async headers() {
    return [
      // Grid clips + posters are requested with ?v=<content hash> (see
      // scripts/build-previews.mjs), so a versioned URL never changes and the
      // browser can keep it forever without even revalidating.
      {
        source: "/previews/:path*",
        has: [{ type: "query", key: "v" }],
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // The service worker must always be fresh so updates roll out.
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
