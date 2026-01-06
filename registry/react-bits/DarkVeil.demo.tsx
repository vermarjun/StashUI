"use client";
import DarkVeil from "@/registry/react-bits/DarkVeil";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "400px" }}>
      <DarkVeil
        hueShift={30}
        noiseIntensity={0.05}
        scanlineIntensity={0.2}
        speed={0.5}
        scanlineFrequency={0.5}
        warpAmount={0.1}
        resolutionScale={1}
      />
    </div>
  );
}
