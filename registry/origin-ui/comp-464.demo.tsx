"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-464";

export default function Demo() {
  const [page, setPage] = useState(2);
  const total = 8;
  return (
    <div className="w-full max-w-sm">
      <Cmp currentPage={page} totalPages={total} />
    </div>
  );
}
