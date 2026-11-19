"use client";
import { ScrollIsland } from "@/registry/inspira-react/scroll-island";

const sections = [
  {
    title: "Why we rewrote the sync engine",
    body: "For three years our sync engine was a queue of JSON patches. It worked until teams started editing the same document from four time zones at once, and then it very much did not.",
  },
  {
    title: "Picking a data model",
    body: "We looked at operational transforms, CRDTs and a plain last-write-wins store. CRDTs won on paper, but the deciding factor was how easy each one was to debug at two in the morning.",
  },
  {
    title: "Shipping it without downtime",
    body: "Every workspace ran both engines side by side for six weeks. We compared their outputs on each save and only switched a workspace over once the two had agreed a million times in a row.",
  },
  {
    title: "What we would do differently",
    body: "Start with the tooling. The visualiser we built in week nine to replay edits would have saved us a month if we had written it on day one.",
  },
];

export default function ScrollIslandDemo() {
  return (
    <div className="w-full bg-background">
      <ScrollIsland title="Rewriting sync">
        {sections.map((s) => (
          <p key={s.title} className="py-1.5 text-sm text-white/70">
            {s.title}
          </p>
        ))}
      </ScrollIsland>
      <article className="mx-auto max-w-2xl px-8 pb-[60vh] pt-40">
        <p className="text-sm text-muted-foreground">Engineering blog, 8 min read</p>
        <h1 className="mt-2 text-5xl font-semibold tracking-tight text-foreground">
          How we rebuilt sync for real-time teams
        </h1>
        {sections.map((s) => (
          <section key={s.title} className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">{s.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
