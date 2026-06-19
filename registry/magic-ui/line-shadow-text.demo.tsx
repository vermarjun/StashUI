"use client";

import { LineShadowText } from "@/registry/magic-ui/line-shadow-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <h1 className="text-5xl font-bold text-foreground">
        <LineShadowText shadowColor="currentColor">
          Ship faster.
        </LineShadowText>
      </h1>
    </div>
  );
}
