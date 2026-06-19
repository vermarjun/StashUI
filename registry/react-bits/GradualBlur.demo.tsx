import GradualBlur from "@/registry/react-bits/GradualBlur";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-10 py-8 w-full">
      {/* Bottom blur fade on a text list */}
      <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-border bg-background">
        <div className="space-y-3 p-6">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
              <div className="space-y-1 flex-1">
                <div className="h-2.5 w-32 rounded bg-muted" />
                <div className="h-2 w-20 rounded bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
        <GradualBlur position="bottom" strength={3} height="8rem" divCount={7} />
      </div>

      {/* Top blur fade */}
      <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-border bg-background">
        <div className="space-y-3 p-6">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
            </p>
          ))}
        </div>
        <GradualBlur position="top" strength={3} height="6rem" divCount={6} />
      </div>
    </div>
  );
}
