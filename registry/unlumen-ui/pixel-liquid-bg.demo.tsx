import { PixelLiquidBg } from "./pixel-liquid-bg";

export default function PixelLiquidBgDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <PixelLiquidBg className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs tracking-[0.3em] text-foreground/60 uppercase">
            Move your cursor
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Liquid, one pixel at a time
          </h2>
        </div>
      </PixelLiquidBg>
    </div>
  );
}
