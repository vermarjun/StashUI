"use client";

import MovingLine from "@/registry/aceternity-ui/moving-line";

const chapters = [
  {
    date: "Day 1",
    title: "Into the clouds",
    body: "We left Zermatt before sunrise and climbed above the inversion layer by seven. The valley vanished under a white sea.",
    images: ["1506905925346-21bda4d32df4", "1693581176773-a5f2362209e6"],
  },
  {
    date: "Day 2",
    title: "Ridge walking",
    body: "A long traverse along the ridge, with the light turning gold over the rock towers in the late afternoon.",
    images: ["1469474968028-56623f02e42e", "1718954572423-2780fe600028"],
  },
  {
    date: "Day 3",
    title: "The way down",
    body: "A still lake at dawn, the first village on the green hills below, and the long train home with sore legs.",
    images: ["1759395073808-17782f3d8d66", "1584043204475-8cc101d6c77a"],
  },
];

export default function Demo() {
  return (
    <div className="w-full bg-background px-6 py-16">
      <MovingLine>
        {chapters.map((c) => (
          <section key={c.title} className="mb-14 w-full">
            <span className="text-sm text-muted-foreground">{c.date}</span>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{c.title}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{c.body}</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {c.images.map((id) => (
                <img
                  key={id}
                  src={`https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&auto=format&q=80`}
                  alt=""
                  className="h-72 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </section>
        ))}
      </MovingLine>
    </div>
  );
}
