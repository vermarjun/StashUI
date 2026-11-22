"use client";

import { Cover } from "./cover";

export default function CoverDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center px-6">
      <h1 className="relative z-20 mx-auto max-w-4xl bg-gradient-to-b from-neutral-200 via-neutral-100 to-white bg-clip-text py-6 text-center text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
        Ship production sites <br /> at <Cover>warp speed</Cover>
      </h1>
    </div>
  );
}
