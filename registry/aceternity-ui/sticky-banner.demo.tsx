"use client";

import { StickyBanner } from "@/registry/aceternity-ui/sticky-banner";

const posts = [
  {
    title: "Why we rebuilt our sync engine from scratch",
    body: "Two years of patches had made offline edits fragile. The new engine stores every change as an operation, replays them in order, and resolves conflicts on the server in under 40 ms.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=520&fit=crop&auto=format&q=80",
  },
  {
    title: "Dashboards that load before you blink",
    body: "We moved aggregation into the database and cache the first paint at the edge. Median load time dropped from 2.1 s to 380 ms across 14,000 workspaces.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=520&fit=crop&auto=format&q=80",
  },
  {
    title: "Hiring: product engineers in Berlin and remote",
    body: "We are a team of 22 shipping weekly. If you like small diffs, fast reviews and talking to customers, we would love to meet you.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=520&fit=crop&auto=format&q=80",
  },
];

export default function Demo() {
  return (
    <div className="relative h-[700px] w-full overflow-y-auto bg-background">
      <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
        <p className="mx-0 max-w-[90%] text-base text-white drop-shadow-md">
          Announcing our $12M Series A, led by Northzone.{" "}
          <a
            href="#"
            className="font-semibold underline underline-offset-4 transition duration-200 hover:opacity-80"
            onClick={(e) => e.preventDefault()}
          >
            Read the announcement
          </a>
        </p>
      </StickyBanner>
      <div className="mx-auto max-w-3xl px-8 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Northwind blog
        </p>
        <h1 className="mt-2 text-5xl font-semibold tracking-tight text-foreground">
          Notes from the team
        </h1>
        <div className="mt-12 flex flex-col gap-14">
          {posts.map((p) => (
            <article key={p.title} className="space-y-4">
              <img
                src={p.img}
                alt=""
                className="h-60 w-full rounded-2xl border border-border object-cover"
              />
              <h2 className="text-2xl font-semibold text-foreground">{p.title}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
