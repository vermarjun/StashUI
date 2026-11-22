"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Transcription, TranscriptionSegment } from "./transcription";

const words =
  "So the thing we learned shipping the new onboarding is that people do not read. They scan. We cut the first screen from four paragraphs to one sentence and a button, and activation went up eighteen percent in a week. The second lesson was timing. Asking for notifications on day one felt pushy, so we moved it to the moment someone saves their first project.".split(
    " "
  );

// Roughly 2.6 words a second, with small pauses after punctuation.
const segments = (() => {
  let t = 0;
  return words.map((word) => {
    const start = t;
    const length = 0.24 + word.length * 0.035 + (/[.,]$/.test(word) ? 0.3 : 0);
    t += length;
    return { endSecond: t, startSecond: start, text: `${word} ` };
  });
})();

const total = segments[segments.length - 1].endSecond;

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function TranscriptionDemo() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTime((t) => (t + 0.05 > total + 1 ? 0 : t + 0.05));
    }, 50);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-xl border border-border bg-background p-5">
        <div className="mb-4 flex items-center gap-3">
          <button
            aria-label={playing ? "Pause" : "Play"}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            onClick={() => setPlaying((p) => !p)}
            type="button"
          >
            {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
          </button>
          <div className="flex-1">
            <p className="font-medium text-sm">Product Notes, Ep. 42</p>
            <p className="text-muted-foreground text-xs">Priya Raman on onboarding that converts</p>
          </div>
          <span className="font-mono text-muted-foreground text-xs tabular-nums">
            {fmt(Math.min(time, total))} / {fmt(total)}
          </span>
        </div>
        <div className="mb-4 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary"
            style={{ width: `${Math.min(100, (time / total) * 100)}%` }}
          />
        </div>
        <Transcription
          className="gap-0 text-base"
          currentTime={time}
          onSeek={setTime}
          segments={segments}
        >
          {(segment, index) => (
            <TranscriptionSegment index={index} key={index} segment={segment} />
          )}
        </Transcription>
      </div>
    </div>
  );
}
