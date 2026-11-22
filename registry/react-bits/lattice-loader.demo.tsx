"use client";

import LatticeLoader from "./lattice-loader";

export default function LatticeLoaderDemo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border bg-card p-6 text-foreground">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Research agent</p>
        <LatticeLoader label="Searching 42 sources" pattern="orbit" />
        <LatticeLoader label="Reading pricing pages" pattern="ripple" grid={4} />
        <LatticeLoader status="done" doneLabel="Compared 6 competitors" elapsed={18} />
      </div>
    </div>
  );
}
