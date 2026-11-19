import { StarsBackground } from "@/registry/aceternity-ui/stars-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-neutral-950">
      {/* zoom so the 0.5px stars stay visible at card size */}
      <div className="absolute inset-0" style={{ zoom: 2.5 }}>
        <StarsBackground starDensity={0.0006} allStarsTwinkle minTwinkleSpeed={0.4} maxTwinkleSpeed={1} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-2xl font-semibold text-white">Stars Background</p>
      </div>
    </div>
  );
}
