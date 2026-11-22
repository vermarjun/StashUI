import { PixelLiquidBg } from "./pixel-liquid-bg";

// The component prepends its canvas inside its own root, so the headline is a
// sibling overlay rather than a child: as a child it shares a row with the
// canvas and gets squeezed against the right edge.
export default function PixelLiquidBgDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <PixelLiquidBg className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm tracking-[0.3em] text-foreground/70 uppercase">
          Move your cursor
        </p>
        <h2 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Liquid, one pixel at a time
        </h2>
      </div>
    </div>
  );
}
