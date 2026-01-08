"use client";

import { useEffect, useRef } from "react";
import type { LightSpeedOptions, LightSpeedProps } from "@/registry/inspira-react/light-speed-app";
import { defaultOptions, distortions, LightSpeedApp } from "@/registry/inspira-react/light-speed-app";

export function LightSpeed({ effectOptions }: LightSpeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mergedOptions: LightSpeedOptions = {
      ...defaultOptions,
      ...effectOptions,
    };

    if (typeof mergedOptions.distortion === "string") {
      mergedOptions.distortion = distortions[mergedOptions.distortion];
    }

    const lightSpeedApp = new LightSpeedApp(containerRef.current, mergedOptions);
    lightSpeedApp.loadAssets().then(lightSpeedApp.init);

    return () => {
      lightSpeedApp.dispose();
    };
  }, [effectOptions]);

  return <div ref={containerRef} className="block h-full w-full overflow-hidden" />;
}

export type { LightSpeedOptions, LightSpeedProps };
export { defaultOptions, distortions };
