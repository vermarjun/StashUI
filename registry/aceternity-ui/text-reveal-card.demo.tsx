"use client";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/registry/aceternity-ui/text-reveal-card";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#0d0d0f]">
      <TextRevealCard
        text="You know the business"
        revealText="I know the chemistry"
      >
        <TextRevealCardTitle>
          Sometimes, you just need to see it.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Hover over the card to reveal the hidden message.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
