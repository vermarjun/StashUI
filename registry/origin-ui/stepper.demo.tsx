"use client";

import { useState } from "react";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/origin-ui/stepper";

const steps = [
  { step: 1, title: "Account", description: "Create your account" },
  { step: 2, title: "Profile", description: "Set up your profile" },
  { step: 3, title: "Review", description: "Review your details" },
  { step: 4, title: "Done", description: "All set!" },
];

export default function Demo() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Stepper value={active} onValueChange={setActive}>
        {steps.map(({ step, title, description }, idx) => (
          <StepperItem key={step} step={step} className="flex-1">
            <StepperTrigger className="flex flex-col items-center gap-1.5 w-full">
              <StepperIndicator />
              <div className="text-center">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription>{description}</StepperDescription>
              </div>
            </StepperTrigger>
            {idx < steps.length - 1 && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex justify-center gap-3">
        <button
          className="rounded-md border border-border px-4 py-1.5 text-sm disabled:opacity-40"
          disabled={active <= 1}
          onClick={() => setActive((s) => Math.max(1, s - 1))}
          type="button"
        >
          Back
        </button>
        <button
          className="rounded-md bg-primary px-4 py-1.5 text-primary-foreground text-sm disabled:opacity-40"
          disabled={active >= steps.length}
          onClick={() => setActive((s) => Math.min(steps.length, s + 1))}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
