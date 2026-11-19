import { PulsatingButton } from "@/registry/magic-ui/pulsating-button";

export default function Demo() {
  return (
    <div className="flex items-center justify-center gap-10 p-12">
      <PulsatingButton
        pulseColor="rgba(99, 102, 241, 0.75)"
        distance="14px"
        className="bg-indigo-500 px-8 py-3 text-base font-semibold text-white"
      >
        Join the waitlist
      </PulsatingButton>
      <PulsatingButton
        variant="ripple"
        pulseColor="rgba(255, 255, 255, 0.6)"
        distance="12px"
        duration="1.8s"
        className="bg-white px-8 py-3 text-base font-semibold text-neutral-900"
      >
        Start free trial
      </PulsatingButton>
    </div>
  );
}
