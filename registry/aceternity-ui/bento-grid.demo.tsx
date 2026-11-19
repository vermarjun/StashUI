"use client";

import { BentoGrid, BentoGridItem } from "@/registry/aceternity-ui/bento-grid";
import { Boxes, Code2, MoonStar, Rocket } from "lucide-react";

const DeployHeader = () => (
  <div
    className="relative flex h-full min-h-[6rem] w-full flex-col justify-end overflow-hidden rounded-lg border border-white/[0.08] bg-neutral-950 p-3"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
      backgroundSize: "16px 16px",
    }}
  >
    <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-600/30 blur-3xl transition duration-500 group-hover/bento:bg-violet-500/50" />
    <div className="relative space-y-1.5 font-mono text-[11px] leading-none">
      <p className="text-neutral-500">$ git push origin main</p>
      <p className="text-neutral-400">
        <span className="text-sky-400">▲</span> Building… compiled in 3.2s
      </p>
      <p className="text-emerald-400 transition duration-300 group-hover/bento:translate-x-1">
        ✓ Deployed to production · stashui.dev
      </p>
    </div>
  </div>
);

const CodeHeader = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-col justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-neutral-900 to-neutral-950 p-3 font-mono text-[11px] leading-relaxed">
    <p>
      <span className="text-pink-400">type</span>{" "}
      <span className="text-sky-300">Props</span> = {"{"}
    </p>
    <p className="pl-3">
      size<span className="text-neutral-500">:</span>{" "}
      <span className="text-amber-300">&quot;sm&quot; | &quot;lg&quot;</span>
    </p>
    <p className="pl-3">
      tone<span className="text-neutral-500">:</span>{" "}
      <span className="text-amber-300">&quot;ghost&quot;</span>
    </p>
    <p>{"}"}</p>
    <p className="mt-1 text-emerald-400/80 opacity-60 transition group-hover/bento:opacity-100">
      ✓ 0 type errors
    </p>
  </div>
);

const ComposeHeader = () => (
  <div className="grid h-full min-h-[6rem] w-full grid-cols-3 grid-rows-2 gap-1.5 rounded-lg border border-white/[0.08] bg-neutral-950 p-2">
    <div className="col-span-2 rounded-md bg-gradient-to-br from-sky-500/70 to-indigo-600/70 transition-all duration-500 group-hover/bento:col-span-1" />
    <div className="rounded-md bg-neutral-800 transition-all duration-500 group-hover/bento:col-span-2 group-hover/bento:bg-gradient-to-br group-hover/bento:from-fuchsia-500/70 group-hover/bento:to-pink-600/70" />
    <div className="rounded-md bg-neutral-800" />
    <div className="rounded-md bg-neutral-800" />
    <div className="rounded-md bg-gradient-to-br from-emerald-500/60 to-teal-600/60" />
  </div>
);

const ThemeHeader = () => (
  <div className="relative flex h-full min-h-[6rem] w-full items-center justify-center gap-4 overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-r from-neutral-100 via-neutral-500 to-neutral-950">
    {(["light", "dark"] as const).map((mode) => (
      <div
        key={mode}
        className={
          "w-36 rounded-md border p-2 shadow-lg transition duration-500 group-hover/bento:-translate-y-1 " +
          (mode === "light"
            ? "border-neutral-200 bg-white group-hover/bento:-rotate-3"
            : "border-white/10 bg-neutral-900 group-hover/bento:rotate-3")
        }
      >
        <div className={"mb-1.5 h-2 w-12 rounded-full " + (mode === "light" ? "bg-neutral-800" : "bg-neutral-200")} />
        <div className={"mb-1 h-1.5 w-full rounded-full " + (mode === "light" ? "bg-neutral-200" : "bg-neutral-700")} />
        <div className={"h-1.5 w-2/3 rounded-full " + (mode === "light" ? "bg-neutral-200" : "bg-neutral-700")} />
        <div className="mt-2 h-4 w-14 rounded bg-violet-500" />
      </div>
    ))}
  </div>
);

const items = [
  {
    title: "Ship at the speed of thought",
    description:
      "Stop wrestling with boilerplate and focus on what actually matters.",
    header: <DeployHeader />,
    icon: <Rocket className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Type-safe by default",
    description: "Full TypeScript inference from props to styles.",
    header: <CodeHeader />,
    icon: <Code2 className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Composable primitives",
    description: "Mix and match cells to build any dashboard layout.",
    header: <ComposeHeader />,
    icon: <Boxes className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Dark mode included",
    description: "Tokens adapt automatically, no extra selectors needed.",
    header: <ThemeHeader />,
    icon: <MoonStar className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
];

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
