"use client";

export default function Demo() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-b from-background to-muted">
      {/* Scrollable content behind the blur */}
      <div className="flex flex-col gap-3 p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3"
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-muted-foreground/20" />
            <div className="flex flex-col gap-1">
              <div className="h-3 w-32 rounded-full bg-foreground/20" />
              <div className="h-2 w-20 rounded-full bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>
      {/* EdgeBlur overlaid — uses relative positioning within the container */}
      <div className="absolute inset-x-0 bottom-0 h-20 isolate pointer-events-none">
        {[1, 2, 3, 6, 12].map((blur) => (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: "linear-gradient(to top, black, transparent)",
              WebkitMaskImage: "linear-gradient(to top, black, transparent)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
