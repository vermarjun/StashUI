"use client";

import ModelViewer from "@/registry/react-bits/ModelViewer";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-background">
      <ModelViewer
        url="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        width={480}
        height={480}
        environmentPreset="studio"
        autoRotate={true}
        autoRotateSpeed={0.4}
        enableManualRotation={true}
        enableHoverRotation={false}
        enableMouseParallax={false}
        enableManualZoom={true}
        fadeIn={true}
        showScreenshotButton={false}
        defaultRotationX={-20}
        defaultRotationY={10}
        defaultZoom={1.4}
      />
    </div>
  );
}
