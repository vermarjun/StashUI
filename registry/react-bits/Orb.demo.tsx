"use client";

import Orb from "@/registry/react-bits/Orb";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <div className="w-[400px] h-[400px]">
        <Orb
          hue={200}
          hoverIntensity={0.3}
          rotateOnHover={true}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>
    </div>
  );
}
