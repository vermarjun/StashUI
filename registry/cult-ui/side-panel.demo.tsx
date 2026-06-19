"use client"

import { useState } from "react"
import { SidePanel } from "@/registry/cult-ui/side-panel"

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-1 w-5 h-5 justify-center">
      <span
        className={`block h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}
      />
      <span
        className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
      />
    </div>
  )
}

const navItems = [
  { label: "Dashboard", description: "Overview & metrics" },
  { label: "Projects", description: "Active work" },
  { label: "Analytics", description: "Charts & reports" },
  { label: "Settings", description: "Account & preferences" },
]

export default function Demo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-start justify-start w-full min-h-[480px] bg-background">
      <SidePanel
        panelOpen={open}
        handlePanelOpen={() => setOpen((v) => !v)}
        renderButton={(toggle) => (
          <button
            onClick={toggle}
            className="flex items-center gap-2 text-white text-sm font-medium focus:outline-none"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <MenuIcon open={open} />
            {open && <span className="whitespace-nowrap">Close</span>}
          </button>
        )}
      >
        <nav className="px-4 pb-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="rounded-lg px-3 py-2 cursor-pointer hover:bg-neutral-700 transition-colors"
            >
              <p className="text-white text-sm font-medium">{item.label}</p>
              <p className="text-neutral-400 text-xs">{item.description}</p>
            </div>
          ))}
        </nav>
      </SidePanel>
    </div>
  )
}
