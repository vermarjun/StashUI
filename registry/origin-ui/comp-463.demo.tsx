"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-463";

export default function Demo() {
  const [page, setPage] = useState(1);
  const total = 4;
  return (
    <div className="w-full max-w-2xl">
      <Cmp currentPage={page} totalPages={total} />
    </div>
  );
}
