"use client";
import DotField from "@/registry/react-bits/DotField";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <DotField
        bulgeOnly
        bulgeStrength={67}
        cursorRadius={500}
        dotRadius={3}
        dotSpacing={14}
        glowColor="#5b21b6"
        glowRadius={180}
        gradientFrom="rgba(168, 85, 247, 1)"
        gradientTo="rgba(56, 189, 248, 0.8)"
        waveAmplitude={4}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-foreground">Dot Field</h2>
        <p className="text-muted-foreground">Move your cursor to bend the grid.</p>
      </div>
    </div>
  );
}
