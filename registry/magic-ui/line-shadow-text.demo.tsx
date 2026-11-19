"use client";

import { LineShadowText } from "@/registry/magic-ui/line-shadow-text";

export default function Demo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center p-8">
      <h1 className="text-balance text-6xl font-semibold leading-none tracking-tighter text-foreground md:text-[150px]">
        Ship{" "}
        <LineShadowText className="italic" shadowColor="white">
          Fast
        </LineShadowText>
      </h1>
    </div>
  );
}
