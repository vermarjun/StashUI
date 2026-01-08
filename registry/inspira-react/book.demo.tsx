"use client";

import { Book, BookDescription, BookHeader, BookTitle } from "@/registry/inspira-react/book";

export default function BookDemo() {
  return (
    <div className="flex items-center justify-center gap-8 p-12">
      <Book color="indigo" size="md">
        <BookHeader>
          <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
            Fiction
          </span>
        </BookHeader>
        <BookTitle>The Lost City</BookTitle>
        <BookDescription>
          An epic adventure through forgotten worlds and ancient mysteries.
        </BookDescription>
      </Book>

      <Book color="rose" size="lg" isStatic>
        <BookHeader>
          <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
            Design
          </span>
        </BookHeader>
        <BookTitle>UI Patterns</BookTitle>
        <BookDescription>
          A comprehensive guide to modern interface design principles.
        </BookDescription>
      </Book>

      <Book color="emerald" size="sm">
        <BookTitle>Notes</BookTitle>
        <BookDescription>Short form.</BookDescription>
      </Book>
    </div>
  );
}
