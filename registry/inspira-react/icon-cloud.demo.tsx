"use client";

import { IconCloud } from "@/registry/inspira-react/icon-cloud";

const DEMO_IMAGES = [
  "https://cdn.simpleicons.org/typescript",
  "https://cdn.simpleicons.org/javascript",
  "https://cdn.simpleicons.org/react",
  "https://cdn.simpleicons.org/nextdotjs",
  "https://cdn.simpleicons.org/nodedotjs",
  "https://cdn.simpleicons.org/tailwindcss",
  "https://cdn.simpleicons.org/git",
  "https://cdn.simpleicons.org/github",
  "https://cdn.simpleicons.org/docker",
  "https://cdn.simpleicons.org/postgresql",
  "https://cdn.simpleicons.org/redis",
  "https://cdn.simpleicons.org/graphql",
];

export default function IconCloudDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center bg-black p-8">
      <IconCloud images={DEMO_IMAGES} className="size-[300px]" />
    </div>
  );
}
