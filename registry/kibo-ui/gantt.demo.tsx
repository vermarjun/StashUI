"use client";

import { useState } from "react";
import {
  type GanttFeature,
  GanttFeatureItem,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttHeader,
  GanttMarker,
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  type GanttStatus,
  GanttTimeline,
  GanttToday,
} from "./gantt";

// The provider centres its timeline on the middle of the current year, so the
// roadmap is pinned to February–August of whatever year it is.
const Y = new Date().getFullYear();
const d = (month: number, day: number) => new Date(Y, month, day);

const planned: GanttStatus = { id: "planned", name: "Planned", color: "oklch(0.7 0.02 260)" };
const progress: GanttStatus = { id: "progress", name: "In progress", color: "oklch(0.78 0.15 75)" };
const done: GanttStatus = { id: "done", name: "Done", color: "oklch(0.72 0.17 155)" };

const initial: { group: string; features: GanttFeature[] }[] = [
  {
    group: "Research",
    features: [
      { id: "r1", name: "Customer interviews", startAt: d(1, 3), endAt: d(1, 28), status: done },
      { id: "r2", name: "Competitive audit", startAt: d(1, 17), endAt: d(2, 14), status: done },
    ],
  },
  {
    group: "Design",
    features: [
      { id: "d1", name: "Information architecture", startAt: d(2, 3), endAt: d(2, 31), status: done },
      { id: "d2", name: "Hi-fi mockups", startAt: d(3, 1), endAt: d(4, 9), status: progress },
      { id: "d3", name: "Design system tokens", startAt: d(3, 14), endAt: d(4, 2), status: progress },
    ],
  },
  {
    group: "Engineering",
    features: [
      { id: "e1", name: "Billing API v2", startAt: d(3, 20), endAt: d(5, 5), status: progress },
      { id: "e2", name: "Web app rebuild", startAt: d(4, 4), endAt: d(6, 18), status: planned },
      { id: "e3", name: "Mobile beta", startAt: d(5, 8), endAt: d(7, 1), status: planned },
    ],
  },
  {
    group: "Launch",
    features: [
      { id: "l1", name: "Public beta", startAt: d(6, 6), endAt: d(6, 31), status: planned },
      { id: "l2", name: "Press & launch week", startAt: d(7, 3), endAt: d(7, 21), status: planned },
    ],
  },
];

const markers = [
  { id: "m1", date: d(2, 31), label: "Design freeze" },
  { id: "m2", date: d(6, 6), label: "Beta" },
];

export default function GanttDemo() {
  const [groups, setGroups] = useState(initial);

  const handleMove = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) return;
    setGroups((gs) =>
      gs.map((g) => ({
        ...g,
        features: g.features.map((f) => (f.id === id ? { ...f, startAt, endAt } : f)),
      }))
    );
  };

  return (
    <div className="h-[600px] w-full p-4">
      <GanttProvider className="border" range="monthly" zoom={100}>
        <GanttSidebar>
          {groups.map((g) => (
            <GanttSidebarGroup key={g.group} name={g.group}>
              {g.features.map((f) => (
                <GanttSidebarItem feature={f} key={f.id} />
              ))}
            </GanttSidebarGroup>
          ))}
        </GanttSidebar>
        <GanttTimeline>
          <GanttHeader />
          <GanttFeatureList>
            {groups.map((g) => (
              <GanttFeatureListGroup key={g.group}>
                {g.features.map((f) => (
                  <div className="flex" key={f.id}>
                    <GanttFeatureItem onMove={handleMove} {...f}>
                      <p className="flex-1 truncate text-xs">{f.name}</p>
                    </GanttFeatureItem>
                  </div>
                ))}
              </GanttFeatureListGroup>
            ))}
          </GanttFeatureList>
          {markers.map((m) => (
            <GanttMarker key={m.id} {...m} />
          ))}
          <GanttToday />
        </GanttTimeline>
      </GanttProvider>
    </div>
  );
}
