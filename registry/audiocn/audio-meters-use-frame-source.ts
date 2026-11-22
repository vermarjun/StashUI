"use client";

import { useEffect } from "react";
import { useEffectEvent } from "./audio-meters-use-effect-event";

import type { FrameSource } from "./audio-meters-types";

export interface UseFrameSourceOptions {
  /** Pause the subscription without unmounting. Default true. */
  enabled?: boolean;
}

/**
 * Subscribes `onFrame` to a frame source. The callback can change on every
 * render without resubscribing.
 */
export const useFrameSource = <T>(
  source: FrameSource<T> | null | undefined,
  onFrame: (frame: T) => void,
  { enabled = true }: UseFrameSourceOptions = {}
): void => {
  const handleFrame = useEffectEvent(onFrame);

  useEffect(() => {
    if (!(source && enabled)) {
      return;
    }
    return source.subscribe((frame) => {
      handleFrame(frame);
    });
  }, [source, enabled]);
};
