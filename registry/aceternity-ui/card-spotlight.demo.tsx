"use client";

import { CardSpotlight } from "@/registry/aceternity-ui/card-spotlight";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[420px] p-8 bg-background">
      <CardSpotlight className="max-w-sm w-full min-h-[220px]">
        <p className="relative z-20 text-base font-bold text-white">
          Authentication Steps
        </p>
        <p className="relative z-20 mt-4 text-sm text-neutral-400">
          Move your cursor over the card to watch a radial spotlight illuminate
          the surface with a canvas particle reveal beneath.
        </p>
        <ul className="relative z-20 mt-6 space-y-2 text-xs text-neutral-500">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Enter your credentials
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Verify via two-factor
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Access granted
          </li>
        </ul>
      </CardSpotlight>
    </div>
  );
}
