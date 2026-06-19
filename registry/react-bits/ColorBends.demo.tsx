"use client";
import Cmp from "@/registry/react-bits/ColorBends";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "600px" }}>
      <Cmp
        colors={["#5227FF", "#00c8ff", "#7cff67", "#ff6b6b"]}
        speed={0.2}
        warpStrength={1.2}
        frequency={1}
        intensity={1.5}
        noise={0.1}
        transparent={false}
      />
    </div>
  );
}
