import { DotPattern } from "@/registry/magic-ui/dot-pattern";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-neutral-950">
      <DotPattern
        width={22}
        height={22}
        cx={1}
        cy={1}
        cr={2.2}
        glow
        className="text-white [mask-image:radial-gradient(520px_circle_at_center,white,transparent)]"
      />
      <h2 className="relative z-10 text-center text-5xl font-semibold tracking-tighter text-white md:text-6xl">
        Dot Pattern
      </h2>
      <p className="relative z-10 mt-3 max-w-md text-center text-neutral-400">
        A lightweight SVG background with an optional glow pulse, masked to fade
        out at the edges.
      </p>
    </div>
  );
}
