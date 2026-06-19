"use client";
import { WebcamPixelGrid } from "@/registry/aceternity-ui/webcam-pixel-grid";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="relative w-full h-full max-w-2xl max-h-[420px] rounded-xl overflow-hidden border border-border">
        <WebcamPixelGrid
          gridCols={64}
          gridRows={48}
          colorMode="webcam"
          backgroundColor="#0a0a0a"
          maxElevation={18}
          motionSensitivity={0.35}
          gapRatio={0.08}
          mirror={true}
          className="w-full h-full"
          onWebcamError={() => {
            // graceful degradation — component renders camera-denied UI
          }}
        />
      </div>
    </div>
  );
}
