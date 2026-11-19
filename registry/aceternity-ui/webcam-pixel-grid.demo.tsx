"use client";
import { WebcamPixelGrid } from "@/registry/aceternity-ui/webcam-pixel-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center bg-background p-6">
      <div className="relative h-[540px] w-full max-w-4xl overflow-hidden rounded-2xl border border-border">
        <WebcamPixelGrid
          gridCols={80}
          gridRows={50}
          colorMode="monochrome"
          monochromeColor="#ffffff"
          backgroundColor="#0a0a0a"
          maxElevation={22}
          motionSensitivity={0.3}
          gapRatio={0.12}
          mirror={true}
          className="h-full w-full"
          onWebcamError={() => {
            // graceful degradation: component renders its camera-denied UI
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="font-semibold text-white text-xl">You, in pixels</p>
          <p className="text-neutral-400 text-sm">Every cell lifts when it detects motion. Wave at the camera.</p>
        </div>
      </div>
    </div>
  );
}
