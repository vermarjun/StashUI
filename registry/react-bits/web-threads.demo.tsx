"use client";

import WebThreads from "./web-threads";

export default function WebThreadsDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <WebThreads />
      <div className="pointer-events-none absolute inset-x-0 top-14 flex flex-col items-center gap-2 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white">Every signal, connected</h2>
        <p className="text-sm text-white/55">Move across the threads, click to send a pulse.</p>
      </div>
    </div>
  );
}
