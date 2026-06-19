"use client";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/registry/aceternity-ui/draggable-card";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[520px] w-full bg-background overflow-hidden">
      <DraggableCardContainer>
        <DraggableCardBody className="bg-card border border-border">
          <div className="flex flex-col gap-3">
            <div className="h-32 w-full rounded-lg bg-muted" />
            <h3 className="text-base font-semibold text-foreground">
              Drag me around
            </h3>
            <p className="text-sm text-muted-foreground">
              This card can be freely dragged within the viewport. Tilt follows
              the cursor; on release it bounces with spring physics.
            </p>
            <div className="flex gap-2 mt-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                motion/react
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                spring
              </span>
            </div>
          </div>
        </DraggableCardBody>
      </DraggableCardContainer>
    </div>
  );
}
