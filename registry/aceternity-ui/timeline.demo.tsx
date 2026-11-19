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
              src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=500&h=300&fit=crop&auto=format&q=80"
              alt="Design system"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1682686580024-580519d4b2d2?w=500&h=300&fit=crop&auto=format&q=80"
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
              src="https://images.unsplash.com/photo-1768248855015-36e55c07ae98?w=500&h=300&fit=crop&auto=format&q=80"
              alt="Startup"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1683009427042-e094996f9780?w=500&h=300&fit=crop&auto=format&q=80"
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
              src="https://images.unsplash.com/photo-1762503203754-62c5a0c969d9?w=500&h=300&fit=crop&auto=format&q=80"
              alt="Graduation"
              className="rounded-lg object-cover w-full h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1573496358322-6d530124361d?w=500&h=300&fit=crop&auto=format&q=80"
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
            src="https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?w=500&h=300&fit=crop&auto=format&q=80"
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
