"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { UndoPill } from "./undo-pill";

const initial = [
  { id: 1, from: "Maya Lin", subject: "Q3 roadmap review notes", time: "9:41" },
  { id: 2, from: "Daniel Okafor", subject: "Re: Deploy window moved to Thursday", time: "8:15" },
  { id: 3, from: "Sofia Ramirez", subject: "Updated icon set, v2.4", time: "Yesterday" },
];

export default function UndoPillDemo() {
  const [mail, setMail] = React.useState(initial);
  const [deleted, setDeleted] = React.useState<(typeof initial)[number] | null>(null);

  const remove = (id: number) => {
    const item = mail.find((m) => m.id === id);
    if (!item) return;
    setMail((m) => m.filter((x) => x.id !== id));
    setDeleted(item);
  };

  const undo = () => {
    if (deleted) setMail((m) => [...m, deleted].sort((a, b) => a.id - b.id));
    setDeleted(null);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-2 shadow-xl">
        <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Inbox
        </p>
        <ul className="min-h-[12.5rem]">
          {mail.map((m) => (
            <li
              key={m.id}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted/60"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-card-foreground">{m.from}</p>
                <p className="truncate text-xs text-muted-foreground">{m.subject}</p>
              </div>
              <span className="text-xs text-muted-foreground">{m.time}</span>
              <button
                type="button"
                aria-label={`Delete ${m.subject}`}
                onClick={() => remove(m.id)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-rose-500/15 hover:text-rose-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-10 items-center">
        <UndoPill
          open={deleted !== null}
          label="Message deleted"
          duration={5}
          onUndo={undo}
          onExpire={() => setDeleted(null)}
        />
      </div>
    </div>
  );
}
