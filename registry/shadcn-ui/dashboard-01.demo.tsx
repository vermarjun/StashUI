"use client"

import { Toaster } from "@/components/ui/sonner"

import Dashboard01 from "./dashboard-01"

export default function Dashboard01Demo() {
  return (
    <div className="min-h-svh w-full bg-background text-foreground">
      <Dashboard01 />
      <Toaster />
    </div>
  )
}
