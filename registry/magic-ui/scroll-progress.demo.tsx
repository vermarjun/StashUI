"use client";

import { ScrollProgress } from "@/registry/magic-ui/scroll-progress";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=640&fit=crop&auto=format&q=80`;

const images: Record<number, string> = {
  0: img("1461749280684-dccba630e2f6"),
  2: img("1551288049-bebda4e38f71"),
  4: img("1522071820081-009f0129c71c"),
};

const sections = [
  ["Why a component library", "Most screens are built from the same thirty pieces. Collecting them once, with previews and a one-line install, turns a week of UI work into an afternoon."],
  ["Previews that move", "A static screenshot hides what a component does. Every card in the gallery plays a short loop of the real component being used: hovered, clicked, typed into."],
  ["One source of truth", "Each component lives next to its demo. A generator reads both and writes the gallery, the install files and the agent index, so nothing drifts."],
  ["Built for agents too", "An MCP index lets coding agents pick the right component by reasoning through categories instead of guessing from a search box."],
  ["Install anywhere", "Components avoid framework-specific imports, so the same file drops into a Vite app or a Next.js project without edits."],
  ["What comes next", "More categories, better tagging and a theming pass so every component picks up your design tokens on install."],
];

export default function Demo() {
  return (
    <div className="relative w-full">
      <ScrollProgress className="h-1.5" />
      <article className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-14">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Engineering notes · 6 min read</p>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground">Building StashUI</h1>
          <p className="text-lg text-muted-foreground">How one folder of components became a gallery, an installer and an index agents can read.</p>
        </header>
        {sections.map(([title, body], i) => (
          <section key={title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            <p className="text-lg leading-relaxed text-foreground/80">{body}</p>
            {images[i] && (
              <img src={images[i]} alt="" className="h-64 w-full rounded-xl border border-border object-cover" />
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
