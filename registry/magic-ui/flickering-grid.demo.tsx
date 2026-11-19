import { FlickeringGrid } from "@/registry/magic-ui/flickering-grid";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950">
      <FlickeringGrid
        className="absolute inset-0 z-0 h-full w-full [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        flickerChance={0.4}
        color="rgb(212, 212, 220)"
        maxOpacity={0.8}
      />
      <div className="relative z-10 rounded-xl border border-neutral-800 bg-neutral-950/80 px-8 py-6 text-center backdrop-blur-sm">
        <h2 className="text-4xl font-semibold tracking-tight text-white">
          Flickering Grid
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Canvas squares that fade in and out at random.
        </p>
      </div>
    </div>
  );
}
