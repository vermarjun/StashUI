import { DottedMap } from "@/registry/magic-ui/dotted-map";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full h-full p-8 bg-background">
      <DottedMap
        pulse
        dotColor="currentColor"
        markerColor="#FF6900"
        markers={[
          { lat: 40.7128, lng: -74.006, size: 0.6, pulse: true },
          { lat: 51.5074, lng: -0.1278, size: 0.6, pulse: true },
          { lat: 35.6762, lng: 139.6503, size: 0.6, pulse: true },
          { lat: -33.8688, lng: 151.2093, size: 0.5, pulse: true },
          { lat: 28.6139, lng: 77.209, size: 0.5, pulse: true },
          { lat: -23.5505, lng: -46.6333, size: 0.5, pulse: true },
          { lat: 1.3521, lng: 103.8198, size: 0.5, pulse: true },
          { lat: 48.8566, lng: 2.3522, size: 0.5, pulse: true },
        ]}
      />
    </div>
  );
}
