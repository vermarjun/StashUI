"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-465";

export default function Demo() {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 10;

  return (
    <div className="w-full max-w-2xl px-4">
      <Cmp
        currentPage={currentPage}
        totalPages={totalPages}
        paginationItemsToDisplay={5}
      />
    </div>
  );
}
