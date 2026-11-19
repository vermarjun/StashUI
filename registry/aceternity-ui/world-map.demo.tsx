import Cmp from "@/registry/aceternity-ui/world-map";

export default function Demo() {
  return (
    <div className="w-full bg-black py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-bold text-3xl text-white md:text-5xl">
          Remote <span className="text-neutral-400">Connectivity</span>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 md:text-lg">
          Break free from traditional boundaries. Work from anywhere, at the comfort of your own
          studio apartment. Perfect for nomads and travellers.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-4">
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
      </div>
    </div>
  );
}
