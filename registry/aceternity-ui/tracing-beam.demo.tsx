"use client";
import { TracingBeam } from "@/registry/aceternity-ui/tracing-beam";

const content = [
  {
    title: "Design Systems",
    body: "Build a consistent visual language across every product surface. Tokens, components, and documentation that scales with your team — from the first prototype to production.",
  },
  {
    title: "Motion & Interaction",
    body: "Smooth, purposeful animation turns static interfaces into living products. Spring physics, scroll-linked effects, and gesture-driven transitions that feel native on every device.",
  },
  {
    title: "Accessible by Default",
    body: "Keyboard navigation, screen-reader semantics, and colour contrast are not afterthoughts. Every component ships meeting WCAG 2.2 AA out of the box, no configuration needed.",
  },
  {
    title: "Open Source",
    body: "MIT-licensed and built in the open. Inspect the source, file an issue, or submit a pull request. The component library grows with its community.",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4">
      <TracingBeam>
        <div className="space-y-16">
          {content.map((item) => (
            <div key={item.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                {item.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              <div className="h-40 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
