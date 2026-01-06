"use client";

import GradientBlinds from "@/registry/react-bits/GradientBlinds";

export default function Demo() {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <GradientBlinds
        gradientColors={["#FF9FFC", "#5227FF", "#00D4FF"]}
        blindCount={20}
        angle={15}
        noise={0.2}
        spotlightOpacity={0.8}
      />
    </div>
  );
}
