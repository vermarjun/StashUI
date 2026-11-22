"use client";

import { CloudShader } from "./cloud-shader";

export default function CloudShaderDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <CloudShader className="h-full" speed={1.4} count={6}>
        <div className="flex flex-col items-center gap-5 px-6 text-center">
          <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
            Now in public beta
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,40,90,0.35)] md:text-6xl">
            Ship to the cloud without thinking about it
          </h1>
          <p className="max-w-md text-base text-white/85 md:text-lg">
            Push your code. We build, scale and keep it running in 32 regions.
          </p>
          <div className="flex gap-3">
            <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-900 shadow-lg">
              Start deploying
            </button>
            <button className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
              Read the docs
            </button>
          </div>
        </div>
      </CloudShader>
    </div>
  );
}
