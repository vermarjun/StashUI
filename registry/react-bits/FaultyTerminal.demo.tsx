"use client";

import FaultyTerminal from "@/registry/react-bits/FaultyTerminal";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <FaultyTerminal
        brightness={1}
        curvature={0.1}
        digitSize={1.2}
        flickerAmount={1}
        glitchAmount={1}
        gridMul={[2, 1]}
        mouseReact
        mouseStrength={0.5}
        noiseAmp={1}
        pageLoadAnimation
        scale={1.5}
        scanlineIntensity={0.5}
        timeScale={0.5}
        tint="#a7ef9e"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <h3 className="font-semibold text-5xl text-white tracking-tight drop-shadow-lg">System failure</h3>
        <p className="text-sm text-white/70">A glitching CRT grid that reacts to the cursor.</p>
      </div>
    </div>
  );
}
