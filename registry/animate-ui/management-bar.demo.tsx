'use client';

import { ManagementBar } from './management-bar';

export default function ManagementBarDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">Senior Product Designer</p>
        <p className="text-xs text-muted-foreground">
          Candidate review &middot; Priya Raman &middot; Applied 3 days ago
        </p>
      </div>
      <ManagementBar />
    </div>
  );
}
