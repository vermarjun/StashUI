"use client";
import FaultyTerminal from "@/registry/react-bits/FaultyTerminal";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "400px" }}>
      <FaultyTerminal
        tint="#00ff88"
        glitchAmount={1}
        scanlineIntensity={0.3}
        curvature={0.2}
        mouseReact={true}
      />
    </div>
  );
}
