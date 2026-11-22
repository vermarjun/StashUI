"use client";

import Toolbar from "@/registry/kokonut-ui/editor-toolbar-dock";

/** A board with something on it, so the dock has a canvas to work over. */
function Board() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--foreground) 22%, transparent) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* artboard */}
      <div className="absolute top-10 left-12 w-[300px] rounded-xl border border-border bg-card p-4 shadow-xl">
        <p className="text-[11px] text-muted-foreground">Landing / Hero</p>
        <div className="mt-3 h-24 rounded-lg bg-gradient-to-br from-indigo-400 via-violet-400 to-pink-400" />
        <div className="mt-3 h-3 w-3/4 rounded-full bg-foreground/80" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-muted-foreground/60" />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded-md bg-foreground" />
          <div className="h-7 w-20 rounded-md border border-border" />
        </div>
      </div>
      {/* selected shape */}
      <div className="absolute top-16 right-20 size-36 rounded-full bg-amber-300/90 outline-2 outline-sky-400 outline-offset-4">
        <span className="absolute -top-7 left-0 rounded bg-sky-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
          Ellipse 144 × 144
        </span>
      </div>
      {/* sticky note */}
      <div className="absolute right-56 bottom-24 w-40 -rotate-3 rounded-md bg-yellow-200 p-3 text-xs leading-snug text-zinc-800 shadow-lg">
        Make the CTA pop more. Try the violet?
      </div>
      {/* connector */}
      <svg className="absolute inset-0 size-full" fill="none">
        <path
          d="M 360 150 C 460 150, 470 110, 560 110"
          stroke="rgb(56 189 248)"
          strokeDasharray="5 5"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default function EditorToolbarDockDemo() {
  // Scaled up (transform, so the dock's own layout stays native) so the dock
  // reads at thumbnail size inside an 8:5 frame.
  return (
    <div className="flex h-[680px] w-full items-center justify-center overflow-hidden px-4">
      <div className="shrink-0 origin-center scale-[1.35]">
        <Toolbar className="h-[460px] w-[800px]">
          <Board />
        </Toolbar>
      </div>
    </div>
  );
}
