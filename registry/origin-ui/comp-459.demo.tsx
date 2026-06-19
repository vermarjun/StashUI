"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-459";

export default function Demo() {
  const [page, setPage] = useState(3);
  const total = 10;
  return (
    <div className="w-full max-w-lg">
      <Cmp currentPage={page} totalPages={total} paginationItemsToDisplay={5} />
    </div>
  );
}
