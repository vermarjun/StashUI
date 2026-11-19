"use client";

import { Code2, Layers, Sparkles } from "lucide-react";

import CardSwap, { Card } from "@/registry/react-bits/CardSwap";

const CARDS = [
  { Icon: Layers, title: "Design systems", body: "Tokens, primitives and patterns that keep every screen consistent." },
  { Icon: Sparkles, title: "Motion", body: "Springs, staggers and transitions that make interfaces feel alive." },
  { Icon: Code2, title: "Components", body: "Copy-paste building blocks that install in one command." },
];

export default function Demo() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center gap-10 overflow-hidden px-8">
      <div className="max-w-xs shrink-0 space-y-3">
        <h3 className="font-semibold text-3xl text-foreground tracking-tight">Card swap</h3>
        <p className="text-muted-foreground text-sm">
          Cards cycle from the front of the stack to the back on a timer. Hover to pause.
        </p>
      </div>
      {/* sized box: the stack anchors to its bottom-right, back cards fan up/right into the padding */}
      <div className="shrink-0 pt-[150px] pr-[150px] pb-[80px]">
        <div className="relative h-[300px] w-[440px]">
      <CardSwap cardDistance={60} delay={2600} height={300} pauseOnHover verticalDistance={70} width={440}>
        {CARDS.map(({ Icon, title, body }) => (
          <Card customClass="border-border! bg-card! overflow-hidden p-0 text-card-foreground" key={title}>
            <div className="flex items-center gap-2 border-border border-b px-4 py-3 text-sm">
              <Icon className="size-4 text-muted-foreground" />
              <span className="font-medium">{title}</span>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-muted" />
                <div className="h-2 w-1/2 rounded-full bg-muted" />
                <div className="h-2 w-2/3 rounded-full bg-muted" />
              </div>
            </div>
          </Card>
        ))}
      </CardSwap>
        </div>
      </div>
    </div>
  );
}
