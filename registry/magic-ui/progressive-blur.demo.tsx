import { ProgressiveBlur } from "@/registry/magic-ui/progressive-blur";

export default function Demo() {
  return (
    <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl">
      {/* Content to blur over */}
      <div className="flex h-full flex-col justify-start gap-3 p-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-full rounded-full bg-muted-foreground/20"
            style={{ width: `${75 + Math.sin(i) * 20}%` }}
          />
        ))}
      </div>
      {/* Progressive blur overlay anchored to bottom */}
      <ProgressiveBlur position="bottom" height="55%" />
    </div>
  );
}
