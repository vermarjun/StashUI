import { MagicCard } from "@/registry/magic-ui/magic-card";

export default function Demo() {
  return (
    <div className="flex gap-6 p-8">
      <MagicCard className="w-56 h-40 flex flex-col items-center justify-center gap-2 rounded-2xl p-6 cursor-pointer">
        <span className="text-2xl">✦</span>
        <p className="text-sm font-medium text-foreground">Gradient mode</p>
        <p className="text-xs text-muted-foreground text-center">Hover to see the gradient follow</p>
      </MagicCard>
      <MagicCard
        mode="orb"
        className="w-56 h-40 flex flex-col items-center justify-center gap-2 rounded-2xl p-6 cursor-pointer"
      >
        <span className="text-2xl">◎</span>
        <p className="text-sm font-medium text-foreground">Orb mode</p>
        <p className="text-xs text-muted-foreground text-center">Hover to see the glowing orb</p>
      </MagicCard>
    </div>
  );
}
