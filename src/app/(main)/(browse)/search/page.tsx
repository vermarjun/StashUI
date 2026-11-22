import type { Metadata } from "next";

import { SearchResults } from "@/components/site/search-results";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  return { title: query ? `${query} · Search` : "Search" };
}

/** /search?q=…: every match for a plain-English description, as the normal grid. */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  return <SearchResults initialQuery={(Array.isArray(q) ? q[0] : q) ?? ""} />;
}
