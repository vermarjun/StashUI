"use client"

import { LoadingCarousel } from "@/registry/cult-ui/loading-carousel"

const tips = [
  {
    text: "Build faster with shadcn-style headless components for your backend.",
    image: "https://images.unsplash.com/photo-1452626212852-811d58933cae?w=1200&h=675&fit=crop&auto=format&q=80",
  },
  {
    text: "Process hundreds of URLs in seconds with AI batch scripts.",
    image: "https://images.unsplash.com/photo-1523612192437-66de9804ac3c?w=1200&h=675&fit=crop&auto=format&q=80",
  },
  {
    text: "Framer Motion, shadcn, and Tailwind: the perfect landing page stack.",
    image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=1200&h=675&fit=crop&auto=format&q=80",
  },
  {
    text: "Vector embeddings and semantic search made easy.",
    image: "https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&h=675&fit=crop&auto=format&q=80",
  },
  {
    text: "SEO analysis: scraping, insights, and AI recommendations.",
    image: "https://images.unsplash.com/photo-1532423622396-10a3f979251a?w=1200&h=675&fit=crop&auto=format&q=80",
  },
]

export default function Demo() {
  return <LoadingCarousel tips={tips} autoplayInterval={3500} className="max-w-4xl" />
}
