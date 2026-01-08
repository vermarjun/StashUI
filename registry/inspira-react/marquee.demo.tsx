"use client"

import { Marquee, ReviewCard } from "@/registry/inspira-react/marquee"

const reviews = [
  {
    img: "https://avatar.vercel.sh/alice",
    name: "Alice",
    username: "@alice",
    body: "This component library is absolutely fantastic!",
  },
  {
    img: "https://avatar.vercel.sh/bob",
    name: "Bob",
    username: "@bob",
    body: "Love the animations. Smooth and performant.",
  },
  {
    img: "https://avatar.vercel.sh/carol",
    name: "Carol",
    username: "@carol",
    body: "Easy to use and looks great out of the box.",
  },
  {
    img: "https://avatar.vercel.sh/dave",
    name: "Dave",
    username: "@dave",
    body: "Best React component library I have used.",
  },
  {
    img: "https://avatar.vercel.sh/eve",
    name: "Eve",
    username: "@eve",
    body: "The Tailwind integration is top notch.",
  },
  {
    img: "https://avatar.vercel.sh/frank",
    name: "Frank",
    username: "@frank",
    body: "Highly recommend to any React developer.",
  },
]

export default function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl py-6">
      <Marquee pauseOnHover>
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover>
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background" />
    </div>
  )
}
