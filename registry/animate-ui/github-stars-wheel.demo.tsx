'use client';

import { GitHubStarsWheel } from './github-stars-wheel';

export default function GitHubStarsWheelDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center gap-16 p-6">
      <div className="flex flex-col items-center gap-3">
        <GitHubStarsWheel value={4200} step={100} direction="btt" delay={300} />
        <span className="text-xs text-muted-foreground">stashui/stashui</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <GitHubStarsWheel value={12800} step={200} direction="ttb" delay={600} />
        <span className="text-xs text-muted-foreground">motiondivision/motion</span>
      </div>
    </div>
  );
}
