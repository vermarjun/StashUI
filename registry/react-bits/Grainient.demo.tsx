"use client";

import Grainient from "@/registry/react-bits/Grainient";

export default function Demo() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <Grainient
        color1="#FF9FFC"
        color2="#5227FF"
        color3="#B497CF"
        timeSpeed={0.25}
        grainAmount={0.08}
        warpStrength={1.0}
        zoom={0.9}
      />
    </div>
  );
}
