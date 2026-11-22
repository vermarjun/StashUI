"use client"

import { MoreHorizontalIcon } from "lucide-react"

import {
  HaloCard,
  HaloCardAction,
  HaloCardButton,
  HaloCardContent,
  HaloCardDescription,
  HaloCardFooter,
  HaloCardHeader,
  HaloCardTitle,
} from "./halo-card"

export default function HaloCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <HaloCard aria-label="Invite teammates" className="w-full max-w-lg">
        <HaloCardHeader>
          <HaloCardTitle>Invite your team</HaloCardTitle>
          <HaloCardDescription>
            Northwind Studio has 3 of 10 seats in use. Invites expire after
            seven days.
          </HaloCardDescription>
          <HaloCardAction>
            <HaloCardButton
              aria-label="More options"
              size="icon"
              type="button"
              variant="secondary"
            >
              <MoreHorizontalIcon aria-hidden className="size-4" />
            </HaloCardButton>
          </HaloCardAction>
        </HaloCardHeader>

        <HaloCardContent>
          <ul className="space-y-3">
            {[
              { name: "Priya Raman", email: "priya@northwind.studio", img: 32, role: "Admin" },
              { name: "Marcus Webb", email: "marcus@northwind.studio", img: 14, role: "Editor" },
              { name: "Lena Fischer", email: "lena@northwind.studio", img: 45, role: "Viewer" },
            ].map((p) => (
              <li className="flex items-center gap-3" key={p.email}>
                <img
                  alt=""
                  className="size-8 rounded-full object-cover"
                  src={`https://i.pravatar.cc/80?img=${p.img}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground text-sm">{p.name}</p>
                  <p className="truncate text-muted-foreground text-xs">{p.email}</p>
                </div>
                <span className="text-muted-foreground text-xs">{p.role}</span>
              </li>
            ))}
          </ul>
        </HaloCardContent>

        <HaloCardFooter className="justify-between gap-3">
          <HaloCardButton type="button" variant="secondary">
            Cancel
          </HaloCardButton>
          <HaloCardButton type="button" variant="primary">
            Send invites
          </HaloCardButton>
        </HaloCardFooter>
      </HaloCard>
    </div>
  )
}
