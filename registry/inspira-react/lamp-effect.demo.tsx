"use client";

import { LampEffect } from "@/registry/inspira-react/lamp-effect";

export default function LampEffectDemo() {
  return (
    <LampEffect delay={0.3} duration={0.8}>
      <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl">
        Build lamps <br /> the right way
      </h1>
      <p className="mt-4 text-center text-slate-400">
        A beautiful lamp effect built with pure CSS animations.
      </p>
    </LampEffect>
  );
}
