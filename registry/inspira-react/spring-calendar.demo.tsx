"use client";

import React from "react";
import { SpringCalendar, CalendarDay } from "@/registry/inspira-react/spring-calendar";

const CALENDAR_DATA: CalendarDay[] = [
  {
    month: "Jun",
    date: 9,
    day: "Mon",
    events: [
      { title: "Team Standup", day: "Mon", time: "9:00 AM" },
      { title: "Design Review", day: "Mon", time: "2:00 PM" },
    ],
  },
  {
    month: "Jun",
    date: 10,
    day: "Tue",
  },
  {
    month: "Jun",
    date: 11,
    day: "Wed",
    events: [{ title: "Sprint Planning", day: "Wed", time: "10:00 AM" }],
  },
  {
    month: "Jun",
    date: 12,
    day: "Thu",
  },
  {
    month: "Jun",
    date: 13,
    day: "Fri",
    events: [{ title: "Demo Day", day: "Fri", time: "4:00 PM" }],
  },
];

export default function SpringCalendarDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <SpringCalendar calendarData={CALENDAR_DATA} initialIndex={0} />
    </div>
  );
}
