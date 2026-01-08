"use client";
import React from "react";
import { TracingBeam } from "@/registry/inspira-react/tracing-beam";

const content = [
  {
    title: "Getting Started",
    description:
      "Begin your journey with our comprehensive documentation. Learn the fundamentals and set up your development environment in minutes.",
  },
  {
    title: "Core Concepts",
    description:
      "Understand the architecture and design principles that power the system. Dive deep into the core abstractions and how they work together.",
  },
  {
    title: "Advanced Usage",
    description:
      "Explore advanced patterns and configurations. Learn how to customize and extend the system to fit your specific needs.",
  },
  {
    title: "Deployment",
    description:
      "Ship your application with confidence. Follow our battle-tested deployment guide to get your project live in production.",
  },
];

export default function TracingBeamDemo() {
  return (
    <div className="bg-white dark:bg-neutral-950 py-10">
      <TracingBeam>
        <div className="mx-auto max-w-2xl space-y-12 px-4 py-8">
          {content.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                {item.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
