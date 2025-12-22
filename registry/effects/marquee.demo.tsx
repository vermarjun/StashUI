import { Marquee } from "@/registry/effects/marquee";

const items = ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Radix", "Motion"];

export default function MarqueeDemo() {
  return (
    <div className="relative w-full max-w-md overflow-hidden">
      <Marquee pauseOnHover className="[--duration:18s]">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground">
            {item}
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background" />
    </div>
  );
}
