"use client";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { GlowingEffect } from "@/registry/aceternity-ui/glowing-effect";

const items = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Box className="h-4 w-4" />,
    title: "Do things the right way",
    description: "Running out of copy so I'll write anything.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <Settings className="h-4 w-4" />,
    title: "The best AI code editor ever.",
    description: "Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Lock className="h-4 w-4" />,
    title: "You should buy Aceternity UI Pro",
    description: "It's the best money you'll ever spend",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Sparkles className="h-4 w-4" />,
    title: "This card is also built by Cursor",
    description: "I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Search className="h-4 w-4" />,
    title: "Coming soon on Aceternity UI",
    description: "Shipping soon. Follow along for updates.",
  },
];

function GridItem({ area, icon, title, description }: { area: string; icon: ReactNode; title: string; description: string }) {
  return (
    <li className={`min-h-[12rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect borderWidth={3} disabled={false} glow inactiveZone={0.01} proximity={64} spread={40} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="w-fit rounded-lg border border-border p-2 text-foreground">{icon}</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-balance text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Demo() {
  return (
    <ul className="grid w-full max-w-5xl grid-cols-1 grid-rows-none gap-4 p-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {items.map((item) => (
        <GridItem key={item.title} {...item} />
      ))}
    </ul>
  );
}
