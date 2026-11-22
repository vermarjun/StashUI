import type { IconType } from "react-icons"
import {
  SiApplepay,
  SiDiscord,
  SiFigma,
  SiGithub,
  SiGoogledrive,
  SiLinear,
  SiMessenger,
  SiNotion,
  SiPaypal,
  SiRadixui,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWhatsapp,
  SiX,
  SiZapier,
} from "react-icons/si"

// Stand-in for the upstream `@/components/icons` map, built on react-icons.
export const Icons = {
  discord: SiDiscord,
  twitter: SiX,
  gitHub: SiGithub,
  react: SiReact,
  ts: SiTypescript,
  tailwind: SiTailwindcss,
  radix: SiRadixui,
  googleDrive: SiGoogledrive,
  notion: SiNotion,
  whatsapp: SiWhatsapp,
  messenger: SiMessenger,
  figma: SiFigma,
  zapier: SiZapier,
  linear: SiLinear,
  paypal: SiPaypal,
  applePay: SiApplepay,
} satisfies Record<string, IconType>
