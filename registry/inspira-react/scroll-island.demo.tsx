"use client";
import { ScrollIsland } from "@/registry/inspira-react/scroll-island";

export default function ScrollIslandDemo() {
  return (
    <div className="relative h-[300vh] w-full bg-background">
      <ScrollIsland title="Page Progress">
        <p className="py-1 text-xs text-muted-foreground">Introduction</p>
        <p className="py-1 text-xs text-muted-foreground">Section 1</p>
        <p className="py-1 text-xs text-muted-foreground">Section 2</p>
        <p className="py-1 text-xs text-muted-foreground">Conclusion</p>
      </ScrollIsland>
      <div className="flex flex-col items-center gap-8 py-32 px-8">
        <p className="text-lg font-semibold">Scroll down to see the island update</p>
        <p className="text-sm text-muted-foreground">The floating island tracks your scroll progress.</p>
      </div>
    </div>
  );
}
