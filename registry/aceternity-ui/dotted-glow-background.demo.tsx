import { DottedGlowBackground } from "@/registry/aceternity-ui/dotted-glow-background";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950">
      <DottedGlowBackground
        className="pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]"
        opacity={1}
        gap={12}
        radius={1.8}
        color="rgba(163,163,163,0.9)"
        darkColor="rgba(163,163,163,0.9)"
        glowColor="rgba(56,189,248,1)"
        darkGlowColor="rgba(56,189,248,1)"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-950/80 px-10 py-10 text-center shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 md:text-4xl">
          Ready to buy Pro?
        </h2>
        <p className="text-sm text-neutral-400 md:text-base">
          Unlock every component, template and block. One license, lifetime
          updates, no subscriptions.
        </p>
        <div className="mt-2 flex gap-3">
          <button className="rounded-md bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-900">
            Get Pro
          </button>
          <button className="rounded-md border border-neutral-700 px-5 py-2 text-sm font-medium text-neutral-200">
            Browse components
          </button>
        </div>
      </div>
    </div>
  );
}
