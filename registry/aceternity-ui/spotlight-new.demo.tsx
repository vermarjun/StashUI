import { Spotlight } from "@/registry/aceternity-ui/spotlight-new";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-black antialiased">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .22) 0, hsla(210, 100%, 55%, .08) 50%, hsla(210, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .16) 0, hsla(210, 100%, 55%, .06) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 45%, .05) 80%, transparent 100%)"
        duration={4}
        xOffset={140}
      />
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 text-center">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">
          Ship in days, <br /> not quarters.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-neutral-300">
          One workspace for specs, reviews and releases. Your team stays in
          flow while the busywork runs itself.
        </p>
      </div>
    </div>
  );
}
