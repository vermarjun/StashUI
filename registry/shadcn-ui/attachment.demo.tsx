"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  Loader2Icon,
  PaperclipIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "./attachment"

type Item = {
  id: string
  name: string
  meta: string
  state: "uploading" | "processing" | "error" | "done"
  kind: "image" | "pdf" | "sheet"
  src?: string
}

const initial: Item[] = [
  {
    id: "1",
    name: "hero-shot.jpg",
    meta: "2.4 MB",
    state: "done",
    kind: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  { id: "2", name: "Q3-board-deck.pdf", meta: "Uploading 64%", state: "uploading", kind: "pdf" },
  { id: "3", name: "revenue-by-region.xlsx", meta: "Reading 3 sheets…", state: "processing", kind: "sheet" },
  { id: "4", name: "contract-final-v7.pdf", meta: "File is over 25 MB", state: "error", kind: "pdf" },
]

export default function AttachmentDemo() {
  const [items, setItems] = React.useState(initial)

  React.useEffect(() => {
    const t = setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === "2" ? { ...i, state: "done", meta: "18 pages · 3.1 MB" } : i
        )
      )
    }, 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full min-h-[520px] w-full items-center justify-center p-6">
      <style>{`
        [data-slot=attachment][data-state=uploading] [data-slot=attachment-title],
        [data-slot=attachment][data-state=processing] [data-slot=attachment-title] {
          background: linear-gradient(90deg, var(--muted-foreground) 30%, var(--foreground) 50%, var(--muted-foreground) 70%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: att-shimmer 1.6s linear infinite;
        }
        @keyframes att-shimmer { from { background-position: 100% 0 } to { background-position: -100% 0 } }
      `}</style>
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3">
          <AttachmentGroup>
            {items.map((item) => (
              <Attachment key={item.id} state={item.state} className="w-60">
                <AttachmentMedia variant={item.kind === "image" ? "image" : "icon"}>
                  {item.kind === "image" ? (
                    <img src={item.src} alt="" />
                  ) : item.state === "error" ? (
                    <TriangleAlertIcon />
                  ) : item.state === "uploading" || item.state === "processing" ? (
                    <Loader2Icon className="animate-spin" />
                  ) : item.kind === "sheet" ? (
                    <FileSpreadsheetIcon />
                  ) : (
                    <FileTextIcon />
                  )}
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{item.name}</AttachmentTitle>
                  <AttachmentDescription>{item.meta}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      setItems((prev) => prev.filter((i) => i.id !== item.id))
                    }
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </AttachmentGroup>
          <p className="px-2 text-sm text-muted-foreground">
            Summarise the board deck and flag anything that conflicts with the
            regional revenue sheet.
          </p>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon-sm" aria-label="Attach">
              <PaperclipIcon />
            </Button>
            <Button size="icon-sm" aria-label="Send">
              <ArrowUpIcon />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          {[
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
          ].map((src, i) => (
            <Attachment key={src} orientation="vertical">
              <AttachmentMedia variant="image">
                <img src={src} alt="" />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{i ? "lake.jpg" : "valley.jpg"}</AttachmentTitle>
                <AttachmentDescription>{i ? "1.8 MB" : "3.2 MB"}</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
          <Attachment state="idle" orientation="vertical">
            <AttachmentMedia>
              <PaperclipIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Add file</AttachmentTitle>
              <AttachmentDescription>Up to 25 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </div>
      </div>
    </div>
  )
}
