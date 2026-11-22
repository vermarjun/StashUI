"use client";

import { ArrowUpRight } from "lucide-react";
import { RibbonBackground } from "@/registry/inspira-react/ribbon-background";

export default function RibbonBackgroundDemo() {
  return (
    <section className="relative isolate flex min-h-[600px] w-full flex-col overflow-hidden bg-[#050505] text-white">
      <RibbonBackground
        colors={["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"]}
        backgroundColor="#141414"
        enableShadows
        angle={-8}
        speed={1.2}
      />

      <header className="relative z-10 flex items-center justify-between border-b border-white/15 px-6 py-5 sm:px-10">
        <span className="text-sm font-semibold tracking-[0.16em]">NORTHWIND</span>
        <span className="text-xs text-white/55">STUDIO / BRAND / MOTION</span>
      </header>

      <div className="relative z-10 flex flex-1 items-end px-6 py-10 sm:px-10 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl leading-[0.94] font-semibold tracking-tight sm:text-7xl">
            <span className="block">Build interfaces</span>
            <span className="block">that feel alive.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
            Expressive, production-ready motion for product teams who care how things move.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex h-12 items-center gap-3 bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/85"
            >
              See the work
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center gap-3 border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 px-6 py-4 text-xs text-white/55 sm:px-10">
        <span>120+ launches shipped</span>
        <span>Lisbon / Toronto</span>
      </footer>
    </section>
  );
}
