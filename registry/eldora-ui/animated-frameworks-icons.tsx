import type { IconType } from "react-icons"
import { SiHtml5, SiNextdotjs, SiReact } from "react-icons/si"

// Stand-in for the upstream `@/components/icons` map, built on react-icons.
export const Icons = {
  react: SiReact,
  nextjs: SiNextdotjs,
  html: SiHtml5,
} satisfies Record<string, IconType>
