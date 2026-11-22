"use client";

import SquishSwitch from "./squish-switch";

const SETTINGS = [
  { id: "push", title: "Push notifications", hint: "Mentions, replies and DMs", on: true },
  { id: "digest", title: "Weekly digest", hint: "A Monday summary of your projects", on: false },
  { id: "focus", title: "Focus mode", hint: "Mute everything 9:00 to 12:00", on: false },
];

export default function SquishSwitchDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md divide-y divide-border rounded-2xl border border-border bg-card">
        {SETTINGS.map(s => (
          <div key={s.id} className="flex items-center justify-between gap-6 px-6 py-5">
            <div>
              <p className="text-sm font-medium text-foreground">{s.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>
            </div>
            <SquishSwitch id={s.id} defaultChecked={s.on} ariaLabel={s.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
