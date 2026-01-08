"use client"

import { AnimatedLogoCloud, StaticLogoCloud } from "@/registry/inspira-react/logo-cloud"

const logos = [
  { name: "Vercel", path: "https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg" },
  { name: "React", path: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" },
  { name: "TypeScript", path: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg" },
  { name: "Next.js", path: "https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg" },
  { name: "Tailwind", path: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg" },
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
      />
    </div>
  )
}
