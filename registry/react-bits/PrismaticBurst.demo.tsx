"use client";

import PrismaticBurst from "@/registry/react-bits/PrismaticBurst";

export default function Demo() {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden relative">
      <PrismaticBurst
        intensity={2}
        speed={0.5}
        animationType="rotate3d"
        colors={["#ff0080", "#7928ca", "#0070f3", "#00dfd8"]}
        distort={0}
        rayCount={6}
        mixBlendMode="lighten"
      />
    </div>
  );
}
