"use client";
/* eslint-disable @next/next/no-img-element */

import SaveButton from "@/registry/kokonut-ui/save-button";

const collections = [
  { id: "weekend", name: "Weekend trips", count: 12, color: "bg-orange-400" },
  { id: "tokyo", name: "Tokyo 2027", count: 31, color: "bg-sky-400" },
  { id: "food", name: "Places to eat", count: 48, color: "bg-emerald-400" },
];

export default function SaveButtonDemo() {
  // A wide, short card keeps the whole thing (card + collections panel)
  // compact, so it can be framed large.
  return (
    <div className="flex h-[520px] w-full items-start justify-center px-4 pt-8">
      <div className="flex w-full max-w-xl items-center gap-5 rounded-3xl border border-border bg-card p-3 pr-5">
        <img
          alt="Mountain ridge above the clouds"
          className="h-32 w-44 shrink-0 rounded-2xl object-cover"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">Cabane du Mont Fort</p>
          <p className="text-sm text-muted-foreground">Verbier · 2,457 m</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Hut above the clouds, 40 min from the lift.
          </p>
        </div>
        <SaveButton collections={collections} />
      </div>
    </div>
  );
}
