"use client";
import { SnowfallBg } from "@/registry/inspira-react/snowfall-bg";

export default function SnowfallBgDemo() {
  return (
    <SnowfallBg
      color="#ffffff"
      quantity={120}
      speed={1}
      maxRadius={3}
      minRadius={1}
      className="relative h-[600px] w-full overflow-hidden rounded-lg bg-slate-900"
    />
  );
}
