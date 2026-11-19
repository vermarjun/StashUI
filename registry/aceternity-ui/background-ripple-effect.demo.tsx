import { BackgroundRippleEffect } from "@/registry/aceternity-ui/background-ripple-effect";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-start justify-start overflow-hidden bg-neutral-950">
      <BackgroundRippleEffect rows={11} />
      <div className="pointer-events-none mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-100 md:text-5xl lg:text-6xl">
          Interactive Background Boxes Ripple Effect
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-400">
          Click anywhere on the grid to send a ripple outward from that cell.
          Hover a cell to light it up.
        </p>
      </div>
    </div>
  );
}
