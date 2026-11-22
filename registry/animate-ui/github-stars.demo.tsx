"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { StarIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import {
  GithubStars,
  GithubStarsIcon,
  GithubStarsLogo,
  GithubStarsNumber,
  GithubStarsParticles,
} from "./github-stars"

function Star(
  props: Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">
) {
  return (
    <HugeiconsIcon
      icon={StarIcon}
      strokeWidth={2}
      {...props}
      className={cn("[&_path]:[stroke:inherit]", props.className)}
    />
  )
}

export default function GithubStarsDemo() {
  const [run, setRun] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-6">
      <GithubStars
        key={run}
        value={12480}
        delay={400}
        className="flex items-center gap-3 text-xl"
      >
        <GithubStarsLogo className="size-8 text-muted-foreground" />
        <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-1.5">
          <GithubStarsNumber className="font-medium text-foreground tabular-nums" />
          <GithubStarsParticles className="text-yellow-500" size={5}>
            <GithubStarsIcon
              icon={Star}
              className="size-6 fill-neutral-700 stroke-neutral-700"
              color="var(--color-yellow-500)"
            />
          </GithubStarsParticles>
        </div>
      </GithubStars>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3" />
        Recount
      </button>
    </div>
  )
}
