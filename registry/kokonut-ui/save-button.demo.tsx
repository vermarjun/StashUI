"use client";
/* eslint-disable @next/next/no-img-element */

import SaveButton from "@/registry/kokonut-ui/save-button";

export default function SaveButtonDemo() {
  return (
    <div className="flex h-[520px] w-full items-start justify-center px-4 pt-10">
      <div className="w-full max-w-xs rounded-3xl border border-border bg-card p-3">
        <img
          alt="Mountain ridge above the clouds"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
        />
        <div className="flex items-center justify-between gap-3 px-1 pt-3">
          <div className="min-w-0">
            <p className="truncate font-medium text-sm">Cabane du Mont Fort</p>
            <p className="text-xs text-muted-foreground">Verbier · 2,457 m</p>
          </div>
          <SaveButton />
        </div>
      </div>
    </div>
  );
}
