import { Spotlight, SpotLightItem } from "@/registry/ui-layouts/spotlight";

const features = [
  { title: "Proximity Spotlight", body: "A radial gradient follows your global cursor position, illuminating nearby cards from a distance." },
  { title: "Hover Focus", body: "Locks a tight spotlight on the card you're hovering — perfect for grids and feature sections." },
  { title: "Cursor Flow Gradient", body: "A soft highlight tracks the cursor within each card, revealing depth as you move." },
];

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4">
      <Spotlight className="grid gap-4 sm:grid-cols-1">
        {features.map((f) => (
          <SpotLightItem key={f.title}>
            <div className="rounded-lg bg-background p-6 h-full">
              <p className="text-sm font-semibold text-foreground mb-2">{f.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          </SpotLightItem>
        ))}
      </Spotlight>
    </div>
  );
}
