"use client";
import type React from "react";
import GooeyNav from "@/registry/react-bits/GooeyNav";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Demo() {
  return (
    <div
      className="flex h-[360px] w-full items-center justify-center bg-[#060010] text-lg"
      // particles read --color-1..4; keep them white so they merge into the pill
      style={
        {
          "--color-1": "#ffffff",
          "--color-2": "#ffffff",
          "--color-3": "#ffffff",
          "--color-4": "#ffffff",
        } as React.CSSProperties
      }
    >
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
      />
    </div>
  );
}
