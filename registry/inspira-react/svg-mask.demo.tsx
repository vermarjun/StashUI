"use client";

import React from "react";
import { SVGMask } from "@/registry/inspira-react/svg-mask";

export default function SVGMaskDemo() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-xl">
      <SVGMask
        size={10}
        revealSize={500}
        reveal={
          <p className="text-4xl font-bold text-white">
            Move your mouse over the text
          </p>
        }
        base={
          <p className="text-4xl font-bold">
            Hover to reveal
          </p>
        }
      />
    </div>
  );
}
