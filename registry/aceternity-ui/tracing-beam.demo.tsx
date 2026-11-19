"use client";
import { TracingBeam } from "@/registry/aceternity-ui/tracing-beam";

const posts = [
  {
    badge: "Field notes",
    title: "Waking up above the clouds",
    body: "We set the alarm for 4:30 and climbed in the dark. By the time the sun cleared the ridge, the whole valley had disappeared under a slow white sea, and only the peaks were left standing.",
    image: "1506905925346-21bda4d32df4",
  },
  {
    badge: "Route",
    title: "Three days on the high path",
    body: "The trail stays above 2,000 metres for most of its length. Huts are spaced a day apart, water is easy to find until August, and the last stretch is a gentle descent through pine forest.",
    image: "1693581176773-a5f2362209e6",
  },
  {
    badge: "Gear",
    title: "What we would pack again",
    body: "A light shell, two pairs of wool socks, a paper map and a battery pack. Everything else stayed in the bag. The single best item was a cheap thermos for coffee at the first viewpoint.",
    image: "1584043204475-8cc101d6c77a",
  },
  {
    badge: "Afterwards",
    title: "Coming back down",
    body: "Walking into the first village felt strange after three quiet days. We sat by the lake, ate far too much bread and started planning the next trip before the train even left.",
    image: "1759395073808-17782f3d8d66",
  },
];

export default function Demo() {
  return (
    <div className="w-full bg-background px-6 py-16">
      <TracingBeam className="px-6">
        <div className="relative mx-auto max-w-2xl pt-4 antialiased">
          {posts.map((p) => (
            <article key={p.title} className="mb-16">
              <span className="mb-4 inline-block rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                {p.badge}
              </span>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">{p.title}</h2>
              <img
                src={`https://images.unsplash.com/photo-${p.image}?w=1200&h=700&fit=crop&auto=format&q=80`}
                alt=""
                className="mb-6 h-80 w-full rounded-xl object-cover"
              />
              <p className="leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
