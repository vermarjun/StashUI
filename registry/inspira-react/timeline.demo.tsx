"use client";
import React from "react";
import { Timeline } from "@/registry/inspira-react/timeline";

const timelineItems = [
  {
    id: "2024",
    label: "2024",
    content: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Product Launch
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          We launched our flagship product to overwhelming customer response.
          The team worked tirelessly to deliver a polished experience.
        </p>
      </div>
    ),
  },
  {
    id: "2023",
    label: "2023",
    content: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Series A Funding
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Secured $10M in Series A funding to accelerate growth and expand
          the engineering team.
        </p>
      </div>
    ),
  },
  {
    id: "2022",
    label: "2022",
    content: (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Company Founded
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Started in a garage with three passionate founders who believed
          in building something meaningful.
        </p>
      </div>
    ),
  },
];

export default function TimelineDemo() {
  return (
    <Timeline
      title="Our Journey"
      description="Follow the story of how we built a product from idea to reality."
      items={timelineItems}
    />
  );
}
