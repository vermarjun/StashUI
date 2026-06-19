"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-458";

export default function Demo() {
  const [page, setPage] = useState(3);
  const total = 10;
  return (
    <div className="w-full max-w-sm">
      <Cmp currentPage={page} totalPages={total} />
    </div>
  );
}
