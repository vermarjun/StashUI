"use client";
import Cmp from "@/registry/react-bits/DotField";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "600px" }}>
      <Cmp
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        bulgeOnly={true}
        bulgeStrength={67}
        glowRadius={160}
        waveAmplitude={4}
        gradientFrom="rgba(168, 85, 247, 0.35)"
        gradientTo="rgba(180, 151, 207, 0.25)"
        glowColor="#120F17"
      />
    </div>
  );
}
