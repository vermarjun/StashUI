"use client"

import { FeatureCarousel } from "@/registry/cult-ui/feature-carousel"

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&auto=format&q=80`

const image = {
  step1light1: u("1618401471353-b98afee0b2eb"),
  step1light2: u("1517694712202-14dd9538aa97"),
  step2light1: u("1498050108023-c5249f4df085"),
  step2light2: u("1555066931-4365d14bab8c"),
  step3light: u("1551288049-bebda4e38f71"),
  step4light: u("1460925895917-afdab827c52f"),
  alt: "Product screenshot",
}

export default function Demo() {
  return (
    <div className="w-full max-w-3xl p-4">
      <FeatureCarousel
        title="From commit to production"
        description="Everything your team needs to ship."
        image={image}
      />
    </div>
  )
}
