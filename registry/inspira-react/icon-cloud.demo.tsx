"use client";

import { IconCloud } from "@/registry/inspira-react/icon-cloud";

const DEMO_IMAGES = [
  "https://simpleicons.org/icons/typescript.svg",
  "https://simpleicons.org/icons/javascript.svg",
  "https://simpleicons.org/icons/react.svg",
  "https://simpleicons.org/icons/nextdotjs.svg",
  "https://simpleicons.org/icons/nodedotjs.svg",
  "https://simpleicons.org/icons/tailwindcss.svg",
  "https://simpleicons.org/icons/git.svg",
  "https://simpleicons.org/icons/github.svg",
  "https://simpleicons.org/icons/docker.svg",
  "https://simpleicons.org/icons/postgresql.svg",
  "https://simpleicons.org/icons/redis.svg",
  "https://simpleicons.org/icons/graphql.svg",
];

export default function IconCloudDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center bg-black p-8">
      <IconCloud images={DEMO_IMAGES} className="size-[300px]" />
    </div>
  );
}
