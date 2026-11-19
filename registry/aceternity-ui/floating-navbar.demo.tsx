"use client";
import { FloatingNav } from "@/registry/aceternity-ui/floating-navbar";

const navItems = [
  { name: "Home", link: "#" },
  { name: "About", link: "#about" },
  { name: "Pricing", link: "#pricing" },
  { name: "Contact", link: "#contact" },
];

const sections = [
  {
    title: "Ship faster with a design system that scales",
    body: "Tokens, components and patterns that stay in sync from Figma to production, so your team spends time on product instead of pixels.",
  },
  {
    title: "Built for teams of every size",
    body: "From a two-person startup to a hundred-engineer platform team, the same primitives compose into dashboards, marketing sites and docs.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard navigation, focus management and ARIA come built in. Every component is tested with screen readers before it ships.",
  },
  {
    title: "Pricing that grows with you",
    body: "Start free, upgrade when you need private components and SSO. No per-seat surprises at renewal time.",
  },
];

export default function Demo() {
  return (
    <div className="relative w-full bg-neutral-950 text-white">
      <FloatingNav navItems={navItems} />
      <header className="flex h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Scroll down, then back up
        </p>
        <h1 className="max-w-3xl bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
          The navbar hides while you read
        </h1>
        <p className="max-w-lg text-neutral-400">
          Scroll up a little and it floats back in as a pill, right where your
          thumb expects it.
        </p>
      </header>
      {sections.map((s, i) => (
        <section
          key={s.title}
          className="mx-auto flex h-[60vh] max-w-4xl items-center gap-10 border-t border-neutral-900 px-6"
        >
          <span className="text-6xl font-bold text-neutral-800">0{i + 1}</span>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{s.title}</h2>
            <p className="mt-3 max-w-xl text-neutral-400">{s.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
