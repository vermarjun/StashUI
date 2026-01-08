"use client";

import { useState } from "react";
import { MultiStepLoader } from "@/registry/inspira-react/multi-step-loader";

const steps = [
  { text: "Initializing project...", afterText: "Project initialized!" },
  { text: "Installing dependencies...", afterText: "Dependencies installed." },
  { text: "Configuring environment...", afterText: "Config ready." },
  { text: "Building assets...", afterText: "Build complete." },
  { text: "Deploying to production...", afterText: "Live! 🎉" },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-4 p-8">
      <MultiStepLoader
        steps={steps}
        loading={loading}
        defaultDuration={1200}
        onComplete={() => setTimeout(() => setLoading(false), 800)}
        onClose={() => setLoading(false)}
      />
      <button
        onClick={() => setLoading(true)}
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Start Loader
      </button>
    </div>
  );
}
