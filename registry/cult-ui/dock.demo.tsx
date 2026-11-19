"use client"

import { Dock, DockCard, DockCardInner, DockDivider } from "@/registry/cult-ui/dock"

// Square crops render as round thumbnails inside each dock card.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`

const APPS = [
  { id: "0", src: img("1506905925346-21bda4d32df4"), label: "Mountains" },
  { id: "1", src: img("1517849845537-4d257902454a"), label: "Pug" },
  { id: "2", src: img("1517322048670-4fba75cbbb62"), label: "Palms" },
  { id: "3", src: img("1554931670-4ebfabf6e7a9"), label: "Waterfall" },
  { id: "4", src: img("1709949908058-a08659bfa922"), label: "Campus" },
  { id: "5", src: img("1548192746-dd526f154ed9"), label: "Rose" },
]

export default function Demo() {
  return (
    <div className="relative h-[360px] w-full">
      <Dock>
        {APPS.slice(0, 3).map((app) => (
          <DockCard key={app.id} id={app.id}>
            <DockCardInner src={app.src} id={app.id} />
          </DockCard>
        ))}
        <DockDivider />
        {APPS.slice(3).map((app) => (
          <DockCard key={app.id} id={app.id}>
            <DockCardInner src={app.src} id={app.id} />
          </DockCard>
        ))}
      </Dock>
    </div>
  )
}
