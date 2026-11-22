"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Tour,
  TourArrow,
  TourClose,
  TourDescription,
  TourFooter,
  TourHeader,
  TourNext,
  TourPortal,
  TourPrev,
  TourSpotlight,
  TourSpotlightRing,
  TourStep,
  TourStepCounter,
  TourTitle,
} from "./tour";

export default function TourDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-[620px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h1 id="welcome-title" className="text-4xl font-bold tracking-tight">
              Welcome to your dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Take a quick tour to explore the key features.
            </p>
          </div>
          <Button id="start-tour-btn" size="lg" onClick={() => setOpen(true)}>
            Start Tour
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            { id: "feature-1", title: "Analytics", value: "48.2k", note: "Visitors this week, up 12%" },
            { id: "feature-2", title: "Projects", value: "14", note: "Active projects, 3 due Friday" },
            { id: "feature-3", title: "Team", value: "9", note: "Teammates online right now" },
          ].map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="flex flex-col gap-2 rounded-xl border bg-card p-6"
            >
              <h3 className="text-base font-medium text-muted-foreground">{card.title}</h3>
              <p className="text-5xl font-semibold tracking-tight">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.note}</p>
            </div>
          ))}
        </div>
        <div className="flex h-40 items-end gap-2 rounded-xl border bg-card p-6">
          {[38, 52, 44, 61, 57, 72, 66, 81, 74, 88, 79, 93].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-foreground/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Tour
        open={open}
        onOpenChange={setOpen}
        stepFooter={
          <TourFooter>
            <div className="flex w-full items-center justify-between">
              <TourStepCounter />
              <div className="flex gap-2">
                <TourPrev />
                <TourNext />
              </div>
            </div>
          </TourFooter>
        }
      >
        <TourPortal>
          <TourSpotlight />
          <TourSpotlightRing />
          <TourStep target="#welcome-title" side="bottom" align="center">
            <TourHeader>
              <TourTitle>Welcome!</TourTitle>
              <TourDescription>
                Let&apos;s walk through the main features of your dashboard in just a
                few steps.
              </TourDescription>
            </TourHeader>
            <TourClose />
          </TourStep>
          <TourStep target="#feature-1" side="top" align="center">
            <TourArrow />
            <TourHeader>
              <TourTitle>Analytics Dashboard</TourTitle>
              <TourDescription>
                View real-time insights, track KPIs, and monitor your team&apos;s
                progress with interactive charts.
              </TourDescription>
            </TourHeader>
            <TourClose />
          </TourStep>
          <TourStep target="#feature-2" side="top" align="center">
            <TourArrow />
            <TourHeader>
              <TourTitle>Project Management</TourTitle>
              <TourDescription>
                Create, organize, and track projects with powerful tools for
                task management and deadlines.
              </TourDescription>
            </TourHeader>
            <TourClose />
          </TourStep>
          <TourStep target="#feature-3" side="top" align="center" required>
            <TourArrow />
            <TourHeader>
              <TourTitle>Team Collaboration</TourTitle>
              <TourDescription>
                Invite members, assign roles, and collaborate seamlessly. This
                step is required to continue.
              </TourDescription>
            </TourHeader>
            <TourClose />
          </TourStep>
        </TourPortal>
      </Tour>
    </div>
  );
}
