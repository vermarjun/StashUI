"use client";

import * as React from "react";
import { demos } from "@/__registry__/demos.gen";
import { PreviewErrorBoundary } from "@/components/site/preview-error-boundary";

export function PreviewClient({ name }: { name: string }) {
  const Demo = demos[name];
  if (!Demo) {
    return (
      <span className="text-sm text-muted-foreground">No preview available</span>
    );
  }
  return (
    <PreviewErrorBoundary name={name}>
      <React.Suspense fallback={null}>
        <Demo />
      </React.Suspense>
    </PreviewErrorBoundary>
  );
}
