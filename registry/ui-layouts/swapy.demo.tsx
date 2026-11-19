"use client";

import {
  DragHandle,
  SwapyItem,
  SwapyLayout,
  SwapySlot,
} from "@/registry/ui-layouts/swapy";

const config = { animation: "dynamic" as const };

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex h-full flex-col justify-end p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="w-full max-w-3xl p-4">
      <SwapyLayout id="swapy-demo" config={config} className="grid grid-cols-3 gap-3">
        <SwapySlot id="a" className="col-span-2 h-48 rounded-xl">
          <SwapyItem id="item-a" className="relative h-full overflow-hidden rounded-xl border border-border bg-card">
            <DragHandle />
            <img
              src="https://images.unsplash.com/photo-1689229799782-b96891a0aa0d?w=800&h=400&fit=crop&auto=format&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-lg font-semibold text-white">Summer campaign</p>
              <p className="text-xs text-white/70">Drag any card by its handle</p>
            </div>
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="b" className="h-48 rounded-xl">
          <SwapyItem id="item-b" className="relative h-full rounded-xl border border-border bg-card">
            <DragHandle />
            <Stat label="Revenue" value="$48.2k" note="+12% this month" />
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="c" className="h-48 rounded-xl">
          <SwapyItem id="item-c" className="relative h-full rounded-xl border border-border bg-card">
            <DragHandle />
            <Stat label="Subscribers" value="3,912" note="+284 new" />
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="d" className="h-48 rounded-xl">
          <SwapyItem id="item-d" className="relative h-full rounded-xl border border-border bg-foreground">
            <DragHandle className="text-background/60" />
            <div className="flex h-full flex-col justify-end p-5">
              <p className="text-xs text-background/60">Conversion</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-background">4.7%</p>
              <p className="mt-1 text-xs text-background/60">Best week yet</p>
            </div>
          </SwapyItem>
        </SwapySlot>
        <SwapySlot id="e" className="h-48 rounded-xl">
          <SwapyItem id="item-e" className="relative h-full overflow-hidden rounded-xl border border-border bg-card">
            <DragHandle />
            <img
              src="https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=400&h=400&fit=crop&auto=format&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          </SwapyItem>
        </SwapySlot>
      </SwapyLayout>
    </div>
  );
}
