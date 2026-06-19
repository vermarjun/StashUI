import { IconCloud } from "@/registry/magic-ui/icon-cloud"

// Brand icons fetched from simpleicons CDN — PNG at 64×64.
const slugs = [
  "typescript", "javascript", "react", "nextdotjs", "vercel",
  "tailwindcss", "nodedotjs", "prisma", "postgresql", "mongodb",
  "graphql", "docker", "git", "github", "figma",
  "vitess", "vite", "vitest", "jest", "eslint",
]

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
)

export default function Demo() {
  return (
    <div className="flex items-center justify-center">
      <IconCloud images={images} />
    </div>
  )
}
