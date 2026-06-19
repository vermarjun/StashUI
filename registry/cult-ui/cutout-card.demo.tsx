"use client";

import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardInsetLabel,
  CutoutCardPin,
  CutoutCorner,
  cutoutCardSurfaceClassName,
} from "@/registry/cult-ui/cutout-card";

export default function CutoutCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <CutoutCard className={`${cutoutCardSurfaceClassName} w-[300px]`}>
        {/* Media area */}
        <CutoutCardMedia className="h-[180px]">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=360&fit=crop"
            alt="Code on screen"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-105"
          />
          <CutoutCardOverlay />

          {/* Bottom-left inset label */}
          <CutoutCardInsetLabel className="bottom-0 left-0 flex items-end">
            <CutoutCorner
              size={20}
              className="text-card rotate-90"
            />
            <span className="bg-card px-2 py-0.5 text-xs font-medium text-card-foreground">
              Featured
            </span>
            <CutoutCorner size={20} className="text-card" />
          </CutoutCardInsetLabel>

          {/* Top-right pin badge */}
          <CutoutCardPin className="right-0 top-0 flex items-start">
            <CutoutCorner size={20} className="text-card rotate-180" />
            <span className="bg-card px-2 py-0.5 text-xs font-medium text-card-foreground">
              New
            </span>
            <CutoutCorner
              size={20}
              className="text-card -rotate-90"
            />
          </CutoutCardPin>
        </CutoutCardMedia>

        {/* Text content */}
        <CutoutCardContent>
          <h3 className="text-base font-semibold leading-tight">
            Developer Toolkit
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A curated set of components and utilities for rapid prototyping.
          </p>
          <CutoutCardFooter className="mt-4">
            <span className="text-xs text-muted-foreground">12 components</span>
            <span className="text-xs font-medium">View →</span>
          </CutoutCardFooter>
        </CutoutCardContent>
      </CutoutCard>
    </div>
  );
}
