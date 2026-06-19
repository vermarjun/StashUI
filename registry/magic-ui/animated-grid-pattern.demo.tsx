import { AnimatedGridPattern } from "@/registry/magic-ui/animated-grid-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.5}
        duration={4}
        repeatDelay={0.5}
        className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
      />
    </div>
  );
}
