import { LogoTimeline } from "./logo-timeline"
import type { LogoItem } from "./logo-timeline"

const logos: LogoItem[] = [
  { label: "Discord", icon: "discord", animationDelay: -50, animationDuration: 50, row: 1 },
  { label: "X", icon: "twitter", animationDelay: -25, animationDuration: 50, row: 1 },
  { label: "GitHub", icon: "gitHub", animationDelay: -45, animationDuration: 45, row: 2 },
  { label: "React", icon: "react", animationDelay: -22.5, animationDuration: 45, row: 2 },
  { label: "TypeScript", icon: "ts", animationDelay: -60, animationDuration: 60, row: 3 },
  { label: "Tailwind", icon: "tailwind", animationDelay: -40, animationDuration: 60, row: 3 },
  { label: "Radix UI", icon: "radix", animationDelay: -20, animationDuration: 60, row: 3 },
  { label: "Google Drive", icon: "googleDrive", animationDelay: -55, animationDuration: 55, row: 4 },
  { label: "Notion", icon: "notion", animationDelay: -27.5, animationDuration: 55, row: 4 },
  { label: "WhatsApp", icon: "whatsapp", animationDelay: -50, animationDuration: 50, row: 5 },
  { label: "Messenger", icon: "messenger", animationDelay: -25, animationDuration: 50, row: 5 },
  { label: "Figma", icon: "figma", animationDelay: -65, animationDuration: 65, row: 6 },
  { label: "Zapier", icon: "zapier", animationDelay: -43, animationDuration: 65, row: 6 },
  { label: "Linear", icon: "linear", animationDelay: -21.5, animationDuration: 65, row: 6 },
  { label: "PayPal", icon: "paypal", animationDelay: -50, animationDuration: 50, row: 7 },
  { label: "Apple Pay", icon: "applePay", animationDelay: -25, animationDuration: 50, row: 7 },
]

export default function LogoTimelineDemo() {
  return (
    <div className="w-full overflow-hidden">
      <LogoTimeline
        items={logos}
        title="Built with the best tools"
        height="h-[520px]"
        iconSize={18}
        showRowSeparator={true}
      />
    </div>
  )
}
