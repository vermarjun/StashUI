"use client";

import { useState } from "react";

import { SpeechInput } from "./speech-input";

export default function SpeechInputDemo() {
  const [text, setText] = useState(
    "Draft a reply to Jordan confirming Thursday at 3pm, and ask if the venue has parking."
  );

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-3 shadow-sm">
        <textarea
          className="min-h-24 w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything, or tap the mic and talk…"
          value={text}
        />
        <div className="flex items-center justify-between gap-2 px-1 pt-2">
          <span className="text-muted-foreground text-xs">
            Tap the mic to dictate. Tap again to stop.
          </span>
          <SpeechInput
            aria-label="Dictate"
            onAudioRecorded={async () =>
              "Also remind me to send the slides tomorrow morning."
            }
            onTranscriptionChange={(chunk) =>
              setText((prev) => `${prev}${prev ? " " : ""}${chunk.trim()}`)
            }
            size="icon"
          />
        </div>
      </div>
    </div>
  );
}
