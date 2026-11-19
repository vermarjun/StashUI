"use client";
import AnimatedContent from "@/registry/react-bits/AnimatedContent";

const entries = [
  {
    tag: "v2.4",
    title: "Offline drafts",
    body: "Edits you make on a plane sync the moment you land. Conflicts are merged line by line.",
    props: { direction: "vertical" as const, distance: 120 },
  },
  {
    tag: "v2.3",
    title: "Shared workspaces",
    body: "Invite your team with a link. Roles, comments and history come along for free.",
    props: { direction: "horizontal" as const, distance: 160 },
  },
  {
    tag: "v2.2",
    title: "Command palette",
    body: "Press Cmd K anywhere to jump to a file, run an action or search your whole library.",
    props: { direction: "horizontal" as const, distance: 160, reverse: true },
  },
  {
    tag: "v2.1",
    title: "Faster search",
    body: "A rebuilt index returns results in under 40 ms, even across ten thousand documents.",
    props: { direction: "vertical" as const, distance: 80, scale: 0.85 },
  },
];

export default function Demo() {
  return (
    <div className="w-full bg-background">
      <section className="flex h-[640px] flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          Changelog
        </span>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-foreground">
          What shipped this spring
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Four releases, each one sliding into view as you scroll down.
        </p>
      </section>
      <div className="mx-auto flex max-w-xl flex-col gap-10 px-6 pb-[420px]">
        {entries.map((e) => (
          <AnimatedContent key={e.tag} duration={0.9} ease="power3.out" {...e.props}>
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <span className="font-mono text-xs text-muted-foreground">{e.tag}</span>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">{e.title}</h2>
              <p className="mt-2 text-muted-foreground">{e.body}</p>
            </article>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}
