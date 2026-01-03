"use client";

import { Timeline } from "@/registry/aceternity-ui/timeline";

export default function Demo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Launched the new design system and component library with 50+ components.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/seed/timeline1/500/300"
              alt="Design system"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://picsum.photos/seed/timeline2/500/300"
              alt="Components"
              className="rounded-lg object-cover w-full h-32"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Joined a fast-growing startup as a senior frontend engineer.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Built and shipped the core product features that drove 3x user growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/seed/timeline3/500/300"
              alt="Startup"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://picsum.photos/seed/timeline4/500/300"
              alt="Team"
              className="rounded-lg object-cover w-full h-32"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Graduated with a degree in Computer Science and started freelancing.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/seed/timeline5/500/300"
              alt="Graduation"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://picsum.photos/seed/timeline6/500/300"
              alt="Work"
              className="rounded-lg object-cover w-full h-32"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Started learning web development through online courses and personal projects.
          </p>
          <img
            src="https://picsum.photos/seed/timeline7/500/300"
            alt="Learning"
            className="rounded-lg object-cover w-full h-32 mb-4"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
