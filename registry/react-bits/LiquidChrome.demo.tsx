"use client";

import { LiquidChrome } from "@/registry/react-bits/LiquidChrome";

export default function Demo() {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={0.2}
        amplitude={0.5}
        frequencyX={3}
        frequencyY={2}
        interactive={true}
      />
    </div>
  );
}
