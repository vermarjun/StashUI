"use client"

import { FeatureCarousel } from "@/registry/cult-ui/feature-carousel"

const image = {
  step1light1: "https://picsum.photos/seed/step1a/1200/630",
  step1light2: "https://picsum.photos/seed/step1b/1200/630",
  step2light1: "https://picsum.photos/seed/step2a/1200/630",
  step2light2: "https://picsum.photos/seed/step2b/1200/630",
  step3light: "https://picsum.photos/seed/step3/1200/630",
  step4light: "https://picsum.photos/seed/step4/1200/630",
  alt: "Feature screenshot",
}

export default function Demo() {
  return (
    <div className="w-full max-w-2xl p-4">
      <FeatureCarousel
        title="Powerful Features"
        description="Everything you need to build amazing products."
        image={image}
      />
    </div>
  )
}
