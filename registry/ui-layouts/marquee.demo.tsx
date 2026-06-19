import { Marquee } from "@/registry/ui-layouts/marquee";

const chips = [
  "React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion",
  "Node.js", "Radix UI", "shadcn/ui", "Vite", "Bun",
];

export default function Demo() {
  return (
    <div className="w-full py-8 flex flex-col gap-4 overflow-hidden">
      {/* forward */}
      <Marquee pauseOnHover className="[--duration:28s]">
        {chips.map((label) => (
          <span
            key={label}
            className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-foreground mx-1 whitespace-nowrap"
          >
            {label}
          </span>
        ))}
      </Marquee>

      {/* reverse */}
      <Marquee reverse pauseOnHover className="[--duration:28s]">
        {chips.map((label) => (
          <span
            key={label}
            className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground mx-1 whitespace-nowrap"
          >
            {label}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
