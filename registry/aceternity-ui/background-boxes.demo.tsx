import { Boxes } from "@/registry/aceternity-ui/background-boxes";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
      <Boxes />
      <h1 className="pointer-events-none relative z-20 text-xl text-white md:text-4xl">
        Tailwind is Awesome
      </h1>
      <p className="pointer-events-none relative z-20 mt-2 text-center text-neutral-300">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}
