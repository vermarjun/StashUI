"use client";

import { useCreatePresentationStore } from "@diceui/pptx";
import * as React from "react";

import { FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Presentation,
  PresentationContent,
  PresentationError,
  PresentationLoading,
  PresentationProvider,
  PresentationSelection,
  PresentationSlide,
  PresentationThumbnailList,
  PresentationViewport,
} from "./presentation";

// Sample deck served by the upstream docs (CORS-enabled).
const DEMO_DECK_PATH = "https://diceui.com/assets/demo.pptx";

export default function PresentationDemo() {
  const id = React.useId();
  const store = useCreatePresentationStore();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetch(DEMO_DECK_PATH)
      .then((res) => {
        // fetch resolves on 404, so an unchecked body would reach the parser as
        // an error page rather than a deck.
        if (!res.ok) throw new Error(`${DEMO_DECK_PATH}: ${res.status}.`);
        return res.arrayBuffer();
      })
      .then((buffer) => store.load(buffer))
      .catch(() => {
        // Fail silently to avoid blocking the main thread.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- store is a stable ref, intentionally omitted from deps
  }, []);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await store.load(file, { readOnly: false });
    } catch {
      // Fail silently because `load()` already wrote the failure to `store.error`.
    }
  }

  return (
    <div className="flex h-[560px] w-full flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-1.5">
        <span className="truncate text-xs font-medium text-muted-foreground">
          listening-rooms.pptx
        </span>
        {/* Native file input stays hidden; a themed button opens it. */}
        <input
          ref={inputRef}
          id={`${id}-file`}
          type="file"
          accept=".pptx"
          className="sr-only"
          tabIndex={-1}
          onChange={onFileChange}
        />
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 text-xs"
          onClick={() => inputRef.current?.click()}
        >
          <FileUp className="size-3.5" />
          Open .pptx
        </Button>
      </div>
      <PresentationProvider store={store}>
        <Presentation className="min-h-0 flex-1">
          <PresentationThumbnailList />
          <PresentationContent>
            <PresentationLoading />
            <PresentationError />
            <PresentationViewport>
              <PresentationSlide>
                <PresentationSelection undoRedoShortcuts />
              </PresentationSlide>
            </PresentationViewport>
          </PresentationContent>
        </Presentation>
      </PresentationProvider>
    </div>
  );
}
