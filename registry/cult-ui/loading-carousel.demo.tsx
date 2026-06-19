"use client"

import { LoadingCarousel } from "@/registry/cult-ui/loading-carousel"

const tips = [
  {
    text: "Build faster with shadcn-style headless components for your backend.",
    image: "https://picsum.photos/seed/lc1/1200/675",
  },
  {
    text: "Process hundreds of URLs in seconds with AI batch scripts.",
    image: "https://picsum.photos/seed/lc2/1200/675",
  },
  {
    text: "Framer Motion, shadcn, and Tailwind — the perfect landing page stack.",
    image: "https://picsum.photos/seed/lc3/1200/675",
  },
  {
    text: "Vector embeddings and semantic search made easy.",
    image: "https://picsum.photos/seed/lc4/1200/675",
  },
  {
    text: "SEO analysis: scraping, insights, and AI recommendations.",
    image: "https://picsum.photos/seed/lc5/1200/675",
  },
]

export default function Demo() {
  return <LoadingCarousel tips={tips} />
}
