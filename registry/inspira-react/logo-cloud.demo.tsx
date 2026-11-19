"use client"

import { AnimatedLogoCloud, StaticLogoCloud } from "@/registry/inspira-react/logo-cloud"

const logos = [
  { name: "Vercel", path: "https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg" },
  { name: "React", path: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" },
  { name: "Next.js", path: "https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg" },
  { name: "Tailwind", path: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg" },
  { name: "GitHub", path: "https://www.vectorlogo.zone/logos/github/github-ar21.svg" },
  { name: "Stripe", path: "https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" },
  { name: "Figma", path: "https://www.vectorlogo.zone/logos/figma/figma-ar21.svg" },
  { name: "Supabase", path: "https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg" },
]

export default function LogoCloudDemo() {
  return (
    <div className="w-full flex flex-col gap-8">
      <AnimatedLogoCloud
        title="Trusted by developers worldwide"
        logos={logos}
      />
      <StaticLogoCloud
        title="Built with"
        logos={logos}
        className="justify-items-center md:grid-cols-4 lg:grid-cols-8"
      />
    </div>
  )
}
