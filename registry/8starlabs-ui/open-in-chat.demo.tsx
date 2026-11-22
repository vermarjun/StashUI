"use client"

import OpenInChat from "./open-in-chat"

const PROMPT =
  "Explain how to add optimistic updates to a React form that posts to /api/comments, with rollback on error."

export default function OpenInChatDemo() {
  return (
    <div className="flex min-h-[460px] w-full items-start justify-center bg-background p-10">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Guides / Data fetching
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">Optimistic updates</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Show the new comment instantly, then reconcile with the server
          response. If the request fails, roll the list back and surface the
          error inline.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <OpenInChat prompt={PROMPT} layout="horizontal" triggerLabel="Ask AI" />
          <OpenInChat prompt={PROMPT} triggerLabel="Open in chat" align="end" />
        </div>
      </div>
    </div>
  )
}
