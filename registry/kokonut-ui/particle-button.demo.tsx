"use client";

import { ArrowRight } from "lucide-react";
import ParticleButton from "./particle-button";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ParticleButtonDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-wrap items-center justify-center gap-4 p-6">
      <ParticleButton
        onClick={() => wait(1100)}
        pendingLabel="Saving"
        successLabel="Saved"
      >
        Save changes
      </ParticleButton>
      <ParticleButton
        icon={<ArrowRight className="size-4" />}
        onClick={() => wait(900)}
        pendingLabel="Publishing"
        successLabel="Published"
        variant="outline"
      >
        Publish post
      </ParticleButton>
      <ParticleButton
        errorLabel="Card declined"
        onClick={() =>
          wait(1000).then(() => Promise.reject(new Error("declined")))
        }
        pendingLabel="Charging"
        variant="secondary"
      >
        Pay $49.00
      </ParticleButton>
    </div>
  );
}
