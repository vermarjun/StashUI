"use client";

import { FlipCard } from "@/registry/animate-ui/components-community-flip-card";

const DEMO_DATA = {
  name: "Alex Rivera",
  username: "alexrivera",
  image: "https://api.dicebear.com/9.x/avataaars/svg?seed=alexrivera",
  bio: "Full-stack engineer & open-source contributor. Building tools that make developers' lives easier.",
  stats: {
    following: 312,
    followers: 4800,
    posts: 127,
  },
  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
};

export default function FlipCardDemo() {
  return (
    <div className="flex items-center justify-center min-h-[320px] w-full">
      <FlipCard data={DEMO_DATA} />
    </div>
  );
}
