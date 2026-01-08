"use client";

import { GithubGlobe } from "@/registry/inspira-react/github-globe";

const GLOBE_DATA = [
  { order: 1, startLat: 28.6, startLng: 77.2, endLat: 37.8, endLng: -122.4, arcAlt: 0.3, color: "#06b6d4" },
  { order: 2, startLat: 51.5, startLng: -0.12, endLat: 40.7, endLng: -74.0, arcAlt: 0.2, color: "#a855f7" },
  { order: 3, startLat: -33.9, startLng: 151.2, endLat: 35.7, endLng: 139.7, arcAlt: 0.25, color: "#f59e0b" },
  { order: 4, startLat: 48.9, startLng: 2.35, endLat: 55.8, endLng: 37.6, arcAlt: 0.15, color: "#10b981" },
  { order: 5, startLat: 1.35, startLng: 103.8, endLat: 22.3, endLng: 114.2, arcAlt: 0.1, color: "#ef4444" },
];

export default function GithubGlobeDemo() {
  return (
    <div className="flex items-center justify-center bg-neutral-950 p-8 min-h-[450px]">
      <GithubGlobe
        data={GLOBE_DATA}
        globeConfig={{
          globeColor: "#1d072e",
          showAtmosphere: true,
          atmosphereColor: "#8b5cf6",
          atmosphereAltitude: 0.1,
          polygonColor: "rgba(255,255,255,0.5)",
          arcTime: 2000,
          arcLength: 0.9,
          rings: 1,
          maxRings: 3,
          autoRotate: true,
          autoRotateSpeed: 0.5,
        }}
        className="h-96 w-96"
      />
    </div>
  );
}
