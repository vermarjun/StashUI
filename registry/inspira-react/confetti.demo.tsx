"use client";

import { ConfettiButton } from "@/registry/inspira-react/confetti";

export default function ConfettiDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 p-8">
      <p className="text-muted-foreground text-sm">Click the button to fire confetti</p>
      <ConfettiButton
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        options={{
          particleCount: 100,
          spread: 80,
          colors: ["#6366f1", "#ec4899", "#f59e0b", "#10b981"],
        }}
      >
        🎉 Celebrate!
      </ConfettiButton>
    </div>
  );
}
