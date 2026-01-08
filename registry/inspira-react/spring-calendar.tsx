"use client";

import React, { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import { TextMorph } from "@/registry/inspira-react/spring-calendar-text-morph";

export interface CalendarEvent {
  title: string;
  day: string;
  time: string;
}

export interface CalendarDay {
  month: string;
  date: number;
  day: string;
  events?: CalendarEvent[];
}

interface SpringCalendarProps {
  calendarData: CalendarDay[];
  initialIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

export function SpringCalendar({
  calendarData,
  initialIndex = 0,
  onActiveIndexChange,
}: SpringCalendarProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  function setActive(index: number) {
    setActiveIndex(index);
    onActiveIndexChange?.(index);
  }

  const activeDay = calendarData[activeIndex];

  return (
    <MotionConfig transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}>
      <motion.div
        layout
        className="bg-muted/50 flex w-full max-w-lg flex-col gap-6 overflow-hidden rounded-3xl border p-8"
        animate={{ height: activeDay.events ? "auto" : "fit-content" }}
      >
        <TextMorph
          text={activeDay.day}
          className="w-fit font-bold"
          morphTime={0.5}
          coolDownTime={0.1}
        />

        {activeDay.events && (
          <motion.div
            key={`event-container-${activeIndex}`}
            layout
            className="flex flex-col gap-4"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <motion.div
              className="flex items-center gap-2"
              layout
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {/* Calendar icon (inline SVG replacement for Nuxt Icon) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span className="font-medium">Upcoming Events</span>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {activeDay.events.map((event) => (
                <motion.div
                  key={`${event.title}-${event.time}`}
                  layout
                  className="w-full max-w-44 rounded-lg border p-3"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {event.day}, {event.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-3">
          {calendarData.map((day, index) => (
            <motion.button
              key={`${day.date}-${index}`}
              layout
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.01 }}
              className={cn(
                "border-border hover:bg-muted-foreground/10 flex flex-col rounded-2xl border p-3 text-center opacity-100 duration-200",
                activeIndex === index ? "bg-muted-foreground/5" : "",
              )}
              onClick={() => setActive(index)}
            >
              <span className="text-xs font-medium uppercase">{day.month}</span>
              <span className="font-semibold">{day.date}</span>
              <span className="text-primary text-xs font-medium uppercase duration-200">
                {day.day}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </MotionConfig>
  );
}

export default SpringCalendar;
