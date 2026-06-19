"use client";
import Cmp, { Card } from "@/registry/react-bits/CardSwap";

const CARDS = [
  { label: "Design Systems", color: "#4F46E5", emoji: "🎨" },
  { label: "Motion & Animation", color: "#10B981", emoji: "✨" },
  { label: "Component Libraries", color: "#F59E0B", emoji: "📦" },
];

export default function Demo() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Cmp
        width={320}
        height={220}
        cardDistance={50}
        verticalDistance={60}
        delay={3500}
        pauseOnHover
        easing="elastic"
      >
        {CARDS.map((c, i) => (
          <Card
            key={i}
            customClass="flex flex-col items-center justify-center gap-3 select-none"
            style={{ background: `linear-gradient(135deg, ${c.color}22, ${c.color}44)` }}
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="text-sm font-medium text-foreground">{c.label}</span>
          </Card>
        ))}
      </Cmp>
    </div>
  );
}
