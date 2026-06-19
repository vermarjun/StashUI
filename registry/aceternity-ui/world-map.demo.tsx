import Cmp from "@/registry/aceternity-ui/world-map";

export default function Demo() {
  return (
    <Cmp
      dots={[
        {
          start: { lat: 40.7128, lng: -74.006, label: "New York" },
          end: { lat: 51.5074, lng: -0.1278, label: "London" },
        },
        {
          start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
          end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
        },
        {
          start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
          end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
        },
        {
          start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
          end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
        },
        {
          start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
          end: { lat: 51.5074, lng: -0.1278, label: "London" },
        },
      ]}
    />
  );
}
