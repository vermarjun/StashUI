"use client";
import { ProgressiveBlur } from "@/registry/magic-ui/progressive-blur";

const ids = [
  "1506905925346-21bda4d32df4",
  "1469474968028-56623f02e42e",
  "1504198266287-1659872e6590",
  "1543508282-6319a3e2621f",
  "1498019559366-a1cbd07b5160",
  "1709949908058-a08659bfa922",
  "1618005182384-a83a8bd57fbe",
  "1553729459-efe14ef6055d",
  "1476180814856-a36609db0493",
  "1475727946784-2890c8fdb9c8",
  "1540553016722-983e48a2cd10",
  "1517849845537-4d257902454a",
  "1508873881324-c92a3fc536ba",
  "1618220649687-ba860f3176e7",
  "1525310072745-f49212b5ac6d",
];

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <p className="text-sm font-medium text-foreground">Camera roll</p>
            <p className="text-xs text-muted-foreground">1,284 photos, synced 2 min ago</p>
          </div>
          <span className="text-xs text-muted-foreground">Select</span>
        </div>
        <div className="relative h-[480px]">
          <div data-scroll className="h-full overflow-y-auto p-3 [scrollbar-width:none]">
            <div className="grid grid-cols-3 gap-2 pb-24">
              {ids.map((id) => (
                <img
                  key={id}
                  src={`https://images.unsplash.com/photo-${id}?w=360&h=360&fit=crop&auto=format&q=80`}
                  alt=""
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
          <ProgressiveBlur position="bottom" height="40%" />
        </div>
      </div>
    </div>
  );
}
