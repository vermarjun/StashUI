import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // This project lives inside a parent folder that also has a lockfile, so pin
  // the workspace root to avoid Next inferring the wrong one.
  outputFileTracingRoot: projectRoot,

  // This gallery aggregates hundreds of third-party components whose source and
  // auto-generated demos are not guaranteed strict-clean. Runtime issues are
  // contained by a per-preview error boundary, so we don't let imperfect vendor
  // types/lint block the production build. Our own code is checked via
  // `npm run typecheck` (registry/<library>/ dirs excluded).
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Hide the dev indicator so it doesn't show inside every preview iframe.
  devIndicators: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
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
