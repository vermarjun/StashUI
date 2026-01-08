"use client";

import { cn } from "@/lib/utils";

interface LampEffectProps {
  delay?: number;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export function LampEffect({
  delay = 0.5,
  duration = 0.8,
  className,
  children,
}: LampEffectProps) {
  const durationStr = `${duration}s`;
  const delayStr = `${delay}s`;

  const animationStyle = (name: string) => ({
    animation: `${name} ease-in-out ${durationStr} forwards`,
    animationDelay: delayStr,
  });

  return (
    <div
      className={cn(
        "relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-950",
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        {/* Conic Gradient Left */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            ...animationStyle("lamp-conic-gradient"),
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-60 overflow-visible from-cyan-500 via-transparent to-transparent text-white opacity-50 [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>

        {/* Conic Gradient Right */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            ...animationStyle("lamp-conic-gradient"),
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-60 from-transparent via-transparent to-cyan-500 text-white opacity-50 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute right-0 bottom-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute right-0 bottom-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />

        {/* Spotlight */}
        <div
          style={animationStyle("lamp-spotlight")}
          className="absolute inset-auto z-30 h-36 w-32 -translate-y-24 rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Glowing Line */}
        <div
          style={animationStyle("lamp-glowing-line")}
          className="absolute inset-auto z-50 h-0.5 w-60 -translate-y-28 bg-cyan-400"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>

      <style>{`
        @keyframes lamp-spotlight {
          from { width: 8rem; }
          to { width: 16rem; }
        }
        @keyframes lamp-glowing-line {
          from { width: 15rem; }
          to { width: 30rem; }
        }
        @keyframes lamp-conic-gradient {
          from { opacity: 0.5; width: 15rem; }
          to { opacity: 1; width: 30rem; }
        }
      `}</style>
    </div>
  );
}
