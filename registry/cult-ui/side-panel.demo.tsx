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
  { label: "Inbox", description: "12 unread threads" },
  { label: "Projects", description: "4 active, 1 at risk" },
  { label: "Analytics", description: "Weekly growth +8.2%" },
  { label: "Settings", description: "Team, billing, API keys" },
]

const recent = [
  {
    title: "Checkout redesign",
    meta: "Updated 2h ago · Maya Chen",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop&auto=format&q=80",
  },
  {
    title: "Q3 planning offsite",
    meta: "Updated yesterday · Leo Park",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=360&fit=crop&auto=format&q=80",
  },
]

export default function Demo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative w-full min-h-[560px] overflow-hidden rounded-xl bg-background">
      {/* the app underneath */}
      <div className="absolute inset-0 px-10 pt-24">
        <p className="text-sm text-muted-foreground">Good morning, Maya</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-foreground">Today at Northwind</h1>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            ["Revenue", "$48.2k", "+12% vs last week"],
            ["Active users", "3,914", "+4.1% vs last week"],
            ["Open tickets", "27", "6 need a reply"],
          ].map(([k, v, d]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{k}</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-4 z-10 w-full">
        <SidePanel
          className="border border-white/10 bg-neutral-800 shadow-2xl"
          panelOpen={open}
          handlePanelOpen={() => setOpen((v) => !v)}
          renderButton={(toggle) => (
            <button
              onClick={toggle}
              className="flex items-center gap-3 text-white text-base font-medium focus:outline-none"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <MenuIcon open={open} />
              <span className="whitespace-nowrap">{open ? "Close" : "Menu"}</span>
            </button>
          )}
        >
          <div className="grid grid-cols-[220px_1fr] gap-6 px-4 pb-8 pr-10">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl px-3 py-2.5 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <p className="text-white text-base font-medium">{item.label}</p>
                  <p className="text-neutral-400 text-sm">{item.description}</p>
                </div>
              ))}
            </nav>
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-400">Recently viewed</p>
              <div className="grid grid-cols-2 gap-4">
                {recent.map((r) => (
                  <div key={r.title} className="overflow-hidden rounded-2xl bg-neutral-900">
                    <img src={r.img} alt="" className="h-36 w-full object-cover" />
                    <div className="p-3">
                      <p className="text-white font-medium">{r.title}</p>
                      <p className="text-neutral-400 text-sm">{r.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidePanel>
      </div>
    </div>
  )
}
