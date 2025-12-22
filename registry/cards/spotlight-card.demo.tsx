import { Sparkles } from "lucide-react";
import { SpotlightCard } from "@/registry/cards/spotlight-card";

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="max-w-xs">
      <Sparkles className="size-5 text-muted-foreground" />
      <h3 className="mt-3 text-base font-semibold">Spotlight Card</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Move your cursor across the card to reveal the spotlight that tracks your pointer.
      </p>
    </SpotlightCard>
  );
}
