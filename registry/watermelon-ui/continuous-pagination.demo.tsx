"use client";

import { ContinuousPagination } from "@/registry/watermelon-ui/continuous-pagination";

export default function ContinuousPaginationDemo() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <ContinuousPagination totalPages={5} defaultPage={2} />
    </div>
  );
}
