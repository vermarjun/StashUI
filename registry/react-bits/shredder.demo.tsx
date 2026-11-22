"use client";

import Shredder from "./shredder";

const FILES = [
  { id: 1, name: "Invoice_March_2024.pdf", kind: "PDF", size: "184 KB", tone: "#e5484d" },
  { id: 2, name: "old-logo-final-v7.png", kind: "PNG", size: "2.1 MB", tone: "#3b82f6" },
  { id: 3, name: "Offsite agenda (draft).docx", kind: "DOC", size: "42 KB", tone: "#6366f1" },
  { id: 4, name: "meeting-notes-2023.txt", kind: "TXT", size: "3 KB", tone: "#71717a" },
  { id: 5, name: "Q2_forecast_backup.xlsx", kind: "XLS", size: "96 KB", tone: "#22c55e" },
];

export default function ShredderDemo() {
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center p-6">
      <Shredder
        items={FILES}
        autoAnimate
        loop
        renderItem={item => (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white"
              style={{ background: item.tone }}
            >
              {item.kind}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.size}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
