"use client";

import EmojiReaction from "./emoji-reaction";

export default function EmojiReactionDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            alt="Priya Nair"
            className="size-9 rounded-full object-cover"
            src="https://i.pravatar.cc/80?img=45"
          />
          <div>
            <p className="font-medium text-foreground text-sm">Priya Nair</p>
            <p className="text-muted-foreground text-xs">#launch · 2m ago</p>
          </div>
        </div>
        <p className="mt-3 text-foreground/90 text-sm leading-relaxed">
          v2.4 is live 🎉 Checkout is 38% faster and the new onboarding flow
          shipped to everyone. Huge thanks to the payments squad.
        </p>
        <EmojiReaction
          allowMultiple
          className="mt-4"
          reactions={[
            { count: 24, emoji: "❤️", id: "heart", label: "Heart" },
            { count: 12, emoji: "🚀", id: "rocket", label: "Rocket", reacted: true },
            { count: 7, emoji: "👏", id: "clap", label: "Clap" },
            { count: 3, emoji: "😂", id: "laugh", label: "Laugh" },
          ]}
          showPicker
          size="lg"
        />
      </div>
    </div>
  );
}
