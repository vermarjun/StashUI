"use client";

import * as React from "react";

/**
 * Plain-English search. Sends the query to /api/search a moment after typing
 * stops and returns component names, best match first.
 *
 * `names` is null until the server has answered for the current query (and
 * stays null if the request fails), so callers can show an instant local match
 * in the meantime.
 */
export function useSearch(query: string, delay = 160) {
  const q = query.trim();
  const [state, setState] = React.useState<{ q: string; names: string[] } | null>(null);

  React.useEffect(() => {
    if (q.length < 2) return;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { names?: string[] };
        if (Array.isArray(data.names)) setState({ q, names: data.names });
      } catch {
        // offline or aborted: the caller keeps its local match
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, delay]);

  return { names: state && state.q === q ? state.names : null, pending: q.length >= 2 && state?.q !== q };
}

/** Instant fallback while the server answers: every word of the query appears somewhere in the text. */
export function matchesWords(query: string, ...fields: (string | null | undefined)[]) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const text = fields.filter(Boolean).join(" ").toLowerCase();
  return words.every((w) => text.includes(w));
}
