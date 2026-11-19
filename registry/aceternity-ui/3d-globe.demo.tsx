"use client";
import Cmp, { type GlobeMarker } from "@/registry/aceternity-ui/3d-globe";

const markers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://i.pravatar.cc/80?img=12", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://i.pravatar.cc/80?img=32", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://i.pravatar.cc/80?img=5", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://i.pravatar.cc/80?img=47", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://i.pravatar.cc/80?img=25", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://i.pravatar.cc/80?img=15", label: "New Delhi" },
  { lat: -23.5505, lng: -46.6333, src: "https://i.pravatar.cc/80?img=44", label: "São Paulo" },
  { lat: 37.7749, lng: -122.4194, src: "https://i.pravatar.cc/80?img=8", label: "San Francisco" },
  { lat: 1.3521, lng: 103.8198, src: "https://i.pravatar.cc/80?img=21", label: "Singapore" },
  { lat: 30.0444, lng: 31.2357, src: "https://i.pravatar.cc/80?img=60", label: "Cairo" },
  { lat: 55.7558, lng: 37.6173, src: "https://i.pravatar.cc/80?img=36", label: "Moscow" },
  { lat: -1.2921, lng: 36.8219, src: "https://i.pravatar.cc/80?img=52", label: "Nairobi" },
];

export default function Demo() {
  return (
    <Cmp
      markers={markers}
      className="h-[560px]"
      config={{
        showAtmosphere: true,
        atmosphereColor: "#4da6ff",
        atmosphereIntensity: 0.7,
        ambientIntensity: 1.4,
        pointLightIntensity: 2,
        bumpScale: 5,
        autoRotateSpeed: 0.3,
      }}
    />
  );
}
