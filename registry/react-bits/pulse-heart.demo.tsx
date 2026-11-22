"use client";

import PulseHeart from "./pulse-heart";

export default function PulseHeartDemo() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center gap-6 bg-background p-8">
      <PulseHeart count={1284} size={44} label="Like post" />
      <PulseHeart icon="star" count={326} size={44} likedColor="#facc15" label="Star repository" />
      <PulseHeart icon="thumb" count={87} size={44} likedColor="#60a5fa" label="Upvote answer" />
    </div>
  );
}
