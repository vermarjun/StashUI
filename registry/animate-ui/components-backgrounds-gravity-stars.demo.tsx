import { GravityStarsBackground } from "@/registry/animate-ui/components-backgrounds-gravity-stars";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950">
      <GravityStarsBackground
        className="absolute inset-0 h-full w-full text-white"
        starsCount={240}
        starsSize={3}
        starsOpacity={1}
        glowIntensity={20}
        movementSpeed={0.35}
        mouseInfluence={240}
        gravityStrength={160}
        starsInteraction
      />
      <div className="pointer-events-none relative z-10 text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-white">
          Gravity Stars
        </h2>
        <p className="mt-3 text-neutral-400">
          Move your cursor and the stars fall toward it.
        </p>
      </div>
    </div>
  );
}
