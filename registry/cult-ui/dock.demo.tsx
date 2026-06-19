"use client"

import { Dock, DockCard, DockCardInner, DockDivider } from "@/registry/cult-ui/dock"

const APPS = [
  {
    id: "0",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Finder_Icon_macOS_Big_Sur.png/240px-Finder_Icon_macOS_Big_Sur.png",
    label: "Finder",
  },
  {
    id: "1",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Safari_browser_logo.svg/240px-Safari_browser_logo.svg.png",
    label: "Safari",
  },
  {
    id: "2",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mail_%28iOS%29.svg/240px-Mail_%28iOS%29.svg.png",
    label: "Mail",
  },
  {
    id: "3",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/ITunes_12.2_logo.svg/240px-ITunes_12.2_logo.svg.png",
    label: "Music",
  },
  {
    id: "4",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/240px-Notion-logo.svg.png",
    label: "Notion",
  },
]

export default function Demo() {
  return (
    <div className="relative w-full h-40 bg-background">
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
