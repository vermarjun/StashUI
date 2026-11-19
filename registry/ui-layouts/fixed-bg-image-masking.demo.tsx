import FixedBgImageMasking from "@/registry/ui-layouts/fixed-bg-image-masking";

export default function Demo() {
  return (
    <div className="w-full bg-black text-white">
      <section className="flex h-[45vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Scroll down
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
          The image stays put. The shape moves.
        </h2>
      </section>
      <FixedBgImageMasking />
      <section className="flex h-[70vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <h3 className="max-w-xl text-3xl font-semibold tracking-tight">
          A fixed background seen through a paint-splash mask
        </h3>
        <p className="max-w-md text-neutral-400">
          As the section scrolls past, the photo stays pinned to the viewport,
          so different parts of it show through the splash.
        </p>
      </section>
    </div>
  );
}
