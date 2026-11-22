"use client";

import * as React from "react";

/** One result from /api/search: the component plus what the results page filters on. */
export interface SearchHit {
  name: string;
  /** What it is (button, card, background…). */
  kind: string;
  /** light | moderate | heavy at runtime; null until the component has been described. */
  weight: string | null;
  /** How many npm packages it needs. */
  deps: number;
  /** props | children | data-array | hardcoded | none. */
  content: string | null;
  /** The search phrase that best explains the match, e.g. "button glow that follows mouse". */
  match: string | null;
}

export interface SearchAnswer {
  items: SearchHit[];
  names: string[];
  total: number;
  /** False when the embedding model is unavailable and only words were matched. */
  meaning: boolean;
  /** True when nothing matched well and `items` are just the nearest components. */
  weak: boolean;
}

/**
 * Plain-English search. Sends the query to /api/search a moment after typing
 * stops and returns components, best match first.
 *
 * `names` (and `answer`) are null until the server has answered for the
 * current query, and stay null if the request fails, so callers can show an
 * instant local match in the meantime.
 */
export function useSearch(query: string, delay = 160) {
  const q = query.trim();
  const [state, setState] = React.useState<{ q: string; answer: SearchAnswer } | null>(null);

  React.useEffect(() => {
    if (q.length < 2) return;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<SearchAnswer>;
        if (Array.isArray(data.names) && Array.isArray(data.items)) {
          setState({ q, answer: data as SearchAnswer });
        }
      } catch {
        // offline or aborted: the caller keeps its local match
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, delay]);

  const answer = state && state.q === q ? state.answer : null;
  return { answer, names: answer?.names ?? null, pending: q.length >= 2 && !answer };
}

/** Instant fallback while the server answers: every word of the query appears somewhere in the text. */
export function matchesWords(query: string, ...fields: (string | null | undefined)[]) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const text = fields.filter(Boolean).join(" ").toLowerCase();
  return words.every((w) => text.includes(w));
}
