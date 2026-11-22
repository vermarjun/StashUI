"use client"

import { useMemo, useRef } from "react"
import { addDays, addMinutes, setHours, startOfDay, startOfWeek } from "date-fns"
import { PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
  EventCalendar,
  type EventCalendarApi,
  type EventCalendarRenderEventProps,
} from "./event-calendar-reui"
import { EventCalendarContent } from "./event-calendar-reui-content"
import {
  EventCalendarNav,
  EventCalendarToolbar,
} from "./event-calendar-reui-nav"
import type {
  CalendarEvent,
  EventCalendarResource,
} from "./event-calendar-reui-types"

/** Team members - passing resources unlocks the resource day view, so the
 *  view switcher offers every view the calendar ships. */
const TEAM: EventCalendarResource[] = [
  { id: "alex", title: "Alex Rivera", color: "var(--color-blue-500, #3b82f6)" },
  { id: "mia", title: "Mia Tanaka", color: "var(--color-violet-500, #8b5cf6)" },
  { id: "sam", title: "Sam Okafor", color: "var(--color-emerald-500, #10b981)" },
]

/** Demo events: a balanced current week (timed, multi-day, all-day, two
 *  custom-rendered chips) plus a light scatter in the nearby weeks so the
 *  month view reads naturally without crowding any cell. */
function buildEvents(anchor: Date): CalendarEvent[] {
  const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 })
  const at = (dayOffset: number, hour: number, minute = 0) =>
    addMinutes(setHours(addDays(week, dayOffset), hour), minute)
  const day = (dayOffset: number) => addDays(week, dayOffset)

  return [
    {
      id: "team-sync",
      title: "Team sync",
      start: at(1, 9, 0),
      end: at(1, 9, 30),
      resourceId: "alex",
    },
    {
      id: "design-review",
      title: "Design review",
      start: at(2, 11, 0),
      end: at(2, 12, 0),
      resourceId: "mia",
      color: "var(--color-violet-500, #8b5cf6)",
    },
    {
      id: "product-demo",
      title: "Product demo",
      start: at(3, 15, 0),
      end: at(3, 16, 0),
      resourceId: "sam",
      color: "var(--color-emerald-500, #10b981)",
    },
    {
      id: "roadmap-planning",
      title: "Roadmap planning",
      start: at(4, 10, 0),
      end: at(4, 11, 30),
      resourceId: "alex",
      color: "var(--color-indigo-500, #6366f1)",
    },
    {
      id: "client-call",
      title: "Client call",
      start: at(5, 14, 0),
      end: at(5, 15, 0),
      resourceId: "mia",
      color: "var(--color-amber-500, #f59e0b)",
    },
    {
      id: "team-offsite",
      title: "Team offsite",
      start: day(4),
      end: day(6),
      allDay: true,
      color: "var(--color-rose-500, #f43f5e)",
    },
    {
      id: "sprint-planning",
      title: "Sprint planning",
      start: at(9, 9, 30),
      end: at(9, 10, 30),
      resourceId: "sam",
      color: "var(--color-blue-500, #3b82f6)",
    },
    {
      id: "quarterly-review",
      title: "Quarterly review",
      start: at(17, 13, 0),
      end: at(17, 14, 30),
      resourceId: "alex",
      color: "var(--color-cyan-500, #06b6d4)",
    },
  ]
}

/**
 * Custom chip content for a couple of events - proof that the chip is fully
 * yours to shape via `renderEvent`. Returning undefined for everything else
 * falls back to the built-in dot + title + time.
 */
function renderEventContent({ occurrence }: EventCalendarRenderEventProps) {
  const { event } = occurrence

  // Attendee avatars (real shadcn Avatar + AvatarFallback) in place of the
  // leading color dot; a thin ring-1 keeps the overlap crisp at this size.
  if (event.id === "design-review") {
    return (
      <>
        <span className="flex shrink-0 -space-x-1">
          <Avatar className="ring-background size-4 ring-1">
            <AvatarFallback className="bg-violet-500 text-[8px] font-semibold text-white">
              MJ
            </AvatarFallback>
          </Avatar>
          <Avatar className="ring-background size-4 ring-1">
            <AvatarFallback className="bg-sky-500 text-[8px] font-semibold text-white">
              AL
            </AvatarFallback>
          </Avatar>
        </span>
        <span className="truncate font-medium">{event.title}</span>
      </>
    )
  }

  // Title with a trailing status pill. The dot, title and pill share one
  // flex row so the leading dot stays glued to the label - a stacked
  // (flex-col) timed-grid chip would otherwise drop the dot onto its own line.
  if (event.id === "client-call") {
    return (
      <span className="flex w-full min-w-0 items-center gap-1.5">
        <span
          aria-hidden
          className="-me-0.5 size-1.5 shrink-0 rounded-full bg-(--ec-event-color)"
        />
        <span className="truncate font-medium">{event.title}</span>
        <span className="ms-auto shrink-0 rounded bg-(--ec-event-color)/25 px-1 text-[10px] font-semibold">
          30m
        </span>
      </span>
    )
  }

  return undefined
}

export default function EventCalendarDemo() {
  const events = useMemo(() => buildEvents(new Date()), [])
  const apiRef = useRef<EventCalendarApi | null>(null)
  const newEventCount = useRef(0)

  // Add a one-hour event at noon today and jump to it.
  const addEvent = () => {
    const api = apiRef.current
    if (!api) return
    const start = setHours(startOfDay(new Date()), 12)
    const end = addMinutes(start, 60)
    api.addEvent({
      id: `new-event-${newEventCount.current++}`,
      title: "Lunch with Priya",
      start,
      end,
      resourceId: "alex",
      color: "var(--color-blue-500, #3b82f6)",
    })
    api.goTo(start)
  }

  return (
    <div className="w-full p-4">
      <div className="w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
        <EventCalendar
          defaultEvents={events}
          defaultView="month"
          resources={TEAM}
          apiRef={apiRef}
          renderEvent={renderEventContent}
          offDays
          className="h-[620px] w-full"
        >
          <div className="flex flex-wrap items-center gap-2 pe-2">
            <EventCalendarNav className="min-w-0 flex-1" />
            <EventCalendarToolbar>
              <Button size="sm" onClick={addEvent}>
                <PlusIcon className="size-4" aria-hidden="true" />
                New event
              </Button>
            </EventCalendarToolbar>
          </div>
          <EventCalendarContent />
        </EventCalendar>
      </div>
    </div>
  )
}
