"use client";

import { LightSpeed } from "@/registry/inspira-react/light-speed";

export default function LightSpeedDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-black">
      <LightSpeed
        effectOptions={{
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-2xl font-bold text-white drop-shadow-lg">
          Click &amp; hold to speed up
        </p>
      </div>
    </div>
  );
}
