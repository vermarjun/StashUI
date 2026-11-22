import { LogoTimeline } from "./logo-timeline"
import type { LogoItem } from "./logo-timeline"

// Brand-free feature pills (the icon map also ships brand logos, e.g.
// "gitHub", "figma", for a real integrations wall).
const logos: LogoItem[] = [
  { label: "Realtime sync", icon: "cloud", animationDelay: -30, animationDuration: 30, row: 1 },
  { label: "Search", icon: "search", animationDelay: -15, animationDuration: 30, row: 1 },
  { label: "Analytics", icon: "analytics", animationDelay: -8, animationDuration: 36, row: 2 },
  { label: "Team spaces", icon: "team", animationDelay: -20, animationDuration: 36, row: 2 },
  { label: "Payments", icon: "payments", animationDelay: -32, animationDuration: 36, row: 2 },
  { label: "AI assistant", icon: "ai", animationDelay: -22, animationDuration: 32, row: 3 },
  { label: "Automations", icon: "automation", animationDelay: -6, animationDuration: 32, row: 3 },
  { label: "Docs", icon: "docs", animationDelay: -12, animationDuration: 34, row: 4 },
  { label: "SSO & audit logs", icon: "security", animationDelay: -27, animationDuration: 34, row: 4 },
  { label: "Calendar", icon: "calendar", animationDelay: -26, animationDuration: 30, row: 5 },
  { label: "Shared inbox", icon: "inbox", animationDelay: -11, animationDuration: 30, row: 5 },
]

export default function LogoTimelineDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <div className="text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground">
          Everything your team needs
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          One workspace, every tool, always in motion.
        </p>
      </div>
      {/* zoom renders the pills larger; the mask fades them in and out at the edges */}
      <div
        className="w-[840px] max-w-full"
        style={{
          zoom: 1.35,
          maskImage:
            "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
        }}
      >
        <LogoTimeline
          items={logos}
          height="h-[300px]"
          iconSize={18}
          showRowSeparator={true}
        />
      </div>
    </div>
  )
}
