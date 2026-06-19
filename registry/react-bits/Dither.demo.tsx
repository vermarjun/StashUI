"use client";
import Cmp from "@/registry/react-bits/Dither";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "600px" }}>
      <Cmp
        waveSpeed={0.05}
        waveFrequency={3}
        waveAmplitude={0.3}
        waveColor={[0.5, 0.5, 0.5]}
        colorNum={4}
        pixelSize={2}
        enableMouseInteraction={true}
        mouseRadius={1}
      />
    </div>
  );
}
