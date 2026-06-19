"use client";
import Cmp from "@/registry/react-bits/DotGrid";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "600px" }}>
      <Cmp
        dotSize={16}
        gap={32}
        baseColor="#5227FF"
        activeColor="#00c8ff"
        proximity={150}
        speedTrigger={100}
        shockRadius={250}
        shockStrength={5}
      />
    </div>
  );
}
