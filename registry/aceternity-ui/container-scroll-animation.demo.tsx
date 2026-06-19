"use client";
import { ContainerScroll } from "@/registry/aceternity-ui/container-scroll-animation";

export default function Demo() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Introducing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Scroll into view
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Scroll down to watch the card rotate from a dramatic 3-D tilt into
            a flat, full-bleed presentation.
          </p>
        </div>
      }
    >
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6 bg-background rounded-xl">
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs font-mono"
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          Component content renders here once the container is fully flat.
        </p>
      </div>
    </ContainerScroll>
  );
}
