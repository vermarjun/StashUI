"use client"

import { Onboarding } from "@/registry/cult-ui/onboarding"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[420px] p-6 bg-background">
      <Onboarding.Root totalSteps={3} defaultValue={1} className="w-full max-w-sm">
        <Onboarding.StepIndicator className="mb-6 justify-center" />

        <Onboarding.Step step={1}>
          <Onboarding.Header
            title="Welcome to myui"
            description="A personal component library built for speed and aesthetics."
          />
          <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Browse, preview, and install polished components directly into your
            project with a single CLI command.
          </div>
        </Onboarding.Step>

        <Onboarding.Step step={2}>
          <Onboarding.Header
            title="Pick your style"
            description="Components are minimal and monochrome by default — ready for your theme."
          />
          <div className="mt-4 flex flex-col gap-2">
            {["Minimal", "Vibrant", "System default"].map((option) => (
              <div
                key={option}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground cursor-pointer hover:bg-muted/50"
              >
                <span className="size-3 rounded-full border border-muted-foreground/50" />
                {option}
              </div>
            ))}
          </div>
        </Onboarding.Step>

        <Onboarding.Step step={3}>
          <Onboarding.Header
            title="You're all set"
            description="Start exploring components or install your first one now."
          />
          <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Run{" "}
            <code className="font-mono text-foreground">npx shadcn add &lt;component&gt;</code>{" "}
            to install any component from this library.
          </div>
        </Onboarding.Step>

        <Onboarding.Navigation className="mt-6" />
      </Onboarding.Root>
    </div>
  )
}
