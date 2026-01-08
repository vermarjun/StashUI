"use client";

import React from "react";
import { Spline } from "@/registry/inspira-react/spline";

export default function SplineDemo() {
  return (
    <div className="h-96 w-full rounded-xl overflow-hidden border">
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        className="h-full w-full"
      >
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          Loading 3D scene...
        </div>
      </Spline>
    </div>
  );
}
