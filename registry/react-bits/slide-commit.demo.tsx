"use client";

import SlideCommit from "@/registry/react-bits/slide-commit";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center bg-background px-6">
      <div className="flex w-[340px] flex-col gap-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pay Northwind Studio</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">$1,250.00</p>
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">Invoice #2041</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>From</span>
            <span className="text-foreground">Checking •• 4821</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Arrives</span>
            <span className="text-foreground">Today, 3:40 PM</span>
          </div>
        </div>
        <SlideCommit label="Slide to pay" doneLabel="Paid" width={292} onConfirm={() => wait(1400)} />
      </div>
    </div>
  );
}
