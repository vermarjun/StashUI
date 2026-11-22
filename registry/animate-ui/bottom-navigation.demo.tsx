"use client"

import * as React from "react"
import {
  BottomNavigation,
  BottomNavigationHighlight,
  BottomNavigationHighlightItem,
  BottomNavigationAccessory,
  BottomNavigationItem,
  BottomNavigationLabel,
} from "./bottom-navigation"
import { House, Plus, Search, User, Wallet } from "lucide-react"

const ITEMS = [
  { value: "home", label: "Home", Icon: House },
  { value: "search", label: "Search", Icon: Search },
  { value: "wallet", label: "Wallet", Icon: Wallet },
  { value: "profile", label: "Profile", Icon: User },
]

const PAYMENTS = [
  { name: "Corner Bakery", time: "08:12", amount: "€4.60" },
  { name: "Metro Transit", time: "09:30", amount: "€2.40" },
  { name: "Maya Chen", time: "12:42", amount: "€18.00" },
  { name: "Green Grocer", time: "14:05", amount: "€36.15" },
  { name: "Hotel Lumen", time: "17:03", amount: "€256.73" },
  { name: "City Gym", time: "18:21", amount: "€29.00" },
  { name: "Book Nook", time: "19:18", amount: "€12.99" },
  { name: "Trattoria Sole", time: "20:47", amount: "€52.92" },
  { name: "Cinema Odeon", time: "21:15", amount: "€13.49" },
  { name: "Night Taxi", time: "22:02", amount: "€15.80" },
]

// Labels below the icons make wider items, beside them only the selected one.
const LAYOUT = {
  below: "w-[4.875rem] flex-col pt-[5px] data-[minimized]:w-12 data-[minimized]:pt-0",
  beside: "px-5 data-[minimized]:w-12 data-[minimized]:px-0",
}

export default function BottomNavigationDemo({
  scrollBehavior = "minimize",
  labels = "below",
  accessory = true,
}: {
  scrollBehavior?: "none" | "hide" | "minimize"
  labels?: "below" | "beside" | "none"
  accessory?: boolean | string
}) {
  const layout = LAYOUT[labels === "below" ? "below" : "beside"]
  const showAccessory = String(accessory) === "true"
  const [value, setValue] = React.useState("home")
  const [presses, setPresses] = React.useState(0)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="relative h-[440px] w-[420px] overflow-hidden rounded-[2rem] border bg-background shadow-sm">
      <div ref={scrollRef} className="h-full overflow-y-auto px-5 pt-6 pb-24">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Today
        </p>
        <ul className="flex flex-col gap-4">
          {PAYMENTS.map((payment) => (
            <li key={payment.name} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                {payment.name[0]}
              </span>
              <span className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{payment.name}</span>
                <span className="text-xs text-muted-foreground">
                  {payment.time}
                </span>
              </span>
              <span className="text-sm font-medium tabular-nums">
                {payment.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <BottomNavigation
          value={value}
          onValueChange={setValue}
          scrollBehavior={scrollBehavior}
          scrollContainer={scrollRef}
          aria-label="Main"
          className="pointer-events-auto flex items-center gap-2.5"
        >
          <BottomNavigationHighlight className="absolute inset-x-0 inset-y-1 z-0 rounded-full bg-muted">
            <ul className="flex items-center rounded-full bg-background/80 px-1 shadow-lg ring-1 ring-border backdrop-blur">
              {ITEMS.map(({ value: item, label, Icon }) => (
                <li key={item}>
                  <BottomNavigationHighlightItem value={item}>
                    <BottomNavigationItem value={item} asChild>
                      <button
                        type="button"
                        aria-label={label}
                        className={`relative z-10 flex h-[3.875rem] items-center justify-center overflow-hidden rounded-full text-muted-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 hover:text-foreground data-[minimized]:h-12 data-[state=active]:text-foreground ${layout}`}
                      >
                        <Icon size={22} className="shrink-0" />
                        {labels === "below" && (
                          <BottomNavigationLabel className="pt-[5px] text-xs leading-4 font-medium">
                            {label}
                          </BottomNavigationLabel>
                        )}
                        {labels === "beside" && (
                          <BottomNavigationLabel
                            show="active"
                            className="pl-2 text-sm font-medium"
                          >
                            {label}
                          </BottomNavigationLabel>
                        )}
                      </button>
                    </BottomNavigationItem>
                  </BottomNavigationHighlightItem>
                </li>
              ))}
            </ul>
          </BottomNavigationHighlight>
          {showAccessory && (
            <BottomNavigationAccessory
              className="size-[3.875rem] rounded-full bg-background/80 p-1 shadow-lg ring-1 ring-border backdrop-blur data-[minimized]:size-12"
            >
              <button
                type="button"
                aria-label="New payment"
                onClick={() => setPresses((count) => count + 1)}
                className="flex size-full items-center justify-center rounded-full text-muted-foreground outline-none transition-colors duration-300 ease-out hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Plus size={22} className="transition-transform duration-300" style={{ transform: `rotate(${presses * 90}deg)` }} />
              </button>
            </BottomNavigationAccessory>
          )}
        </BottomNavigation>
      </div>
    </div>
  )
}
