"use client";

import Lightfall from "@/registry/react-bits/Lightfall";

export default function Demo() {
  return (
    <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden">
      <Lightfall
        colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
        backgroundColor="#0A29FF"
        speed={0.5}
        streakCount={4}
        streakWidth={1}
        streakLength={1}
        glow={1}
        density={0.6}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.5}
        opacity={1}
      />
    </div>
  );
}
