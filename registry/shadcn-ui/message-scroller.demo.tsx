"use client"

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller"

type Msg = { id: string; role: "user" | "assistant"; text: string }

const seed: Msg[] = [
  { id: "m1", role: "user", text: "Can you help me plan a 3-day trip to Lisbon in October?" },
  { id: "m2", role: "assistant", text: "Absolutely. October is a great time: warm days around 22°C, fewer crowds, and the light over the Tagus is gorgeous. Day 1 could be Alfama and the Castelo de São Jorge in the morning, then a slow lunch in Mouraria and fado at night." },
  { id: "m3", role: "user", text: "Love that. What about day 2?" },
  { id: "m4", role: "assistant", text: "Day 2: take tram 15 out to Belém for the tower, the Jerónimos monastery and pastéis de nata at the original bakery. Come back via LX Factory for dinner and a rooftop drink at sunset." },
  { id: "m5", role: "user", text: "And a day trip for day 3?" },
]

const reply =
  "Day 3: catch the 40-minute train to Sintra early. Start at Pena Palace before the tour buses arrive, walk down through the Moorish Castle ruins, and finish at Quinta da Regaleira's initiation well. Be back in Lisbon by 6pm for a farewell dinner in Príncipe Real."

export default function MessageScrollerDemo() {
  const [msgs, setMsgs] = React.useState<Msg[]>(seed)

  React.useEffect(() => {
    let i = 0
    let iv: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      setMsgs((m) => [...m, { id: "m6", role: "assistant", text: "" }])
      iv = setInterval(() => {
        i += 4
        setMsgs((m) =>
          m.map((x) => (x.id === "m6" ? { ...x, text: reply.slice(0, i) } : x))
        )
        if (i >= reply.length && iv) clearInterval(iv)
      }, 40)
    }, 900)
    return () => {
      clearTimeout(start)
      if (iv) clearInterval(iv)
    }
  }, [])

  return (
    <div className="flex h-full min-h-[600px] w-full items-center justify-center p-6">
      <div className="flex h-[540px] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3 text-sm font-medium">
          Trip planner
        </div>
        <MessageScrollerProvider autoScroll defaultScrollPosition="end">
          <MessageScroller className="flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-5 p-5">
                {msgs.map((m) => (
                  <MessageScrollerItem
                    key={m.id}
                    messageId={m.id}
                    scrollAnchor={m.role === "user"}
                    className={m.role === "user" ? "self-end" : ""}
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "max-w-sm rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                          : "max-w-md text-sm leading-relaxed text-foreground"
                      }
                    >
                      {m.text || "…"}
                    </div>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
        </MessageScrollerProvider>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <div className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            Ask a follow-up…
          </div>
          <Button size="icon-sm" aria-label="Send">
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
