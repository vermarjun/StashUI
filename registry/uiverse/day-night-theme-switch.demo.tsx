"use client"

import * as React from "react"

import { DayNightThemeSwitch } from "./day-night-theme-switch"

export default function DayNightThemeSwitchDemo() {
  const [night, setNight] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-6">
      <DayNightThemeSwitch checked={night} onCheckedChange={setNight} size={40} />
      <p className="text-sm text-muted-foreground">
        {night ? "Night mode · 21:40, quiet hours on" : "Day mode · 09:15, sunny and 22°C"}
      </p>
    </div>
  )
}
