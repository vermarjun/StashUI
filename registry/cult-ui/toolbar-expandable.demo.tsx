"use client"

import React from "react"
import { LayoutDashboard, Settings, User, Bell } from "lucide-react"
import ToolbarExpandable from "@/registry/cult-ui/toolbar-expandable"

const steps = [
  {
    id: "profile",
    title: "Profile",
    description: "Manage your personal information and account settings.",
    icon: User,
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Update your name, email, and profile picture here.</p>
        <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs">
          Edit Profile
        </button>
      </div>
    ),
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "View your analytics and usage statistics.",
    icon: LayoutDashboard,
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Total visits: <strong>12,430</strong></p>
        <p>Active users: <strong>340</strong></p>
      </div>
    ),
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure how and when you receive alerts.",
    icon: Bell,
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Email notifications are currently <strong>enabled</strong>.</p>
        <p>Push notifications are <strong>disabled</strong>.</p>
      </div>
    ),
  },
  {
    id: "settings",
    title: "Settings",
    description: "Adjust app preferences and advanced options.",
    icon: Settings,
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Theme: <strong>System default</strong></p>
        <p>Language: <strong>English</strong></p>
      </div>
    ),
  },
]

export default function Demo() {
  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4">
      <ToolbarExpandable steps={steps} badgeText="Navigation" />
    </div>
  )
}
