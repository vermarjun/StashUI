"use client";

import { useImperativeHandle } from "react";
import type { ComponentProps, Ref } from "react";

import { useClipHold } from "./audio-meters-use-clip-hold";
import { useFrameSource } from "./audio-meters-use-frame-source";
import { SILENCE_DB } from "./audio-meters-decibels";
import type { FrameSource, MeterFrame } from "./audio-meters-types";
import { CLIP_HOLD_MS, CLIP_THRESHOLD_DB } from "./audio-meters-zones";
import { cn } from "@/lib/utils";

export interface ClipIndicatorActions {
  /** Feed a level reading. */
  report: (db: number) => void;
  /** Turn the light off and clear the count. */
  reset: () => void;
}

// Ported without @base-ui/react: upstream renders through useRender/mergeProps;
// here it is a plain <button> carrying the same data-slot / data-clipping hooks.
export interface ClipIndicatorProps extends ComponentProps<"button"> {
  /** Controlled clip state. When set, the component does no detection. */
  clipping?: boolean;
  /** A meter source; the indicator detects clipping itself. */
  source?: FrameSource<MeterFrame> | null;
  /** Levels at or above this count as a clip. Default −1 dBFS. */
  thresholdDb?: number;
  /** How long the light stays on. `Infinity` latches until reset. Default 1500 ms. */
  holdMs?: number;
  onClippingChange?: (clipping: boolean) => void;
  /** Show the number of clips next to the light. Default false. */
  showCount?: boolean;
  actionsRef?: Ref<ClipIndicatorActions>;
}

const loudestPeak = (frame: MeterFrame) => {
  let loudest = SILENCE_DB;
  for (const level of frame.channels) {
    loudest = Math.max(loudest, level.peakDb);
  }
  return loudest;
};

export const ClipIndicator = ({
  clipping: clippingProp,
  source,
  thresholdDb = CLIP_THRESHOLD_DB,
  holdMs = CLIP_HOLD_MS,
  onClippingChange,
  showCount = false,
  actionsRef,
  className,
  children,
  onClick,
  ...props
}: ClipIndicatorProps) => {
  const hold = useClipHold({ holdMs, onClippingChange, thresholdDb });
  const clipping = clippingProp ?? hold.clipping;

  useFrameSource(source, (frame) => {
    hold.report(loudestPeak(frame));
  });

  useImperativeHandle(
    actionsRef,
    () => ({ report: hold.report, reset: hold.reset }),
    [hold.report, hold.reset]
  );

  const content = (
    <>
      {children ?? (
        <span
          className="bg-muted-foreground/30 group-data-clipping/clip-indicator:bg-(--meter-clip) size-2 shrink-0 rounded-full transition-colors"
          data-slot="clip-indicator-light"
        />
      )}
      {showCount ? (
        <span className="tabular-nums" data-slot="clip-indicator-count">
          {hold.count}
        </span>
      ) : null}
      <span aria-live="polite" className="sr-only">
        {clipping ? "Clipping" : ""}
      </span>
    </>
  );

  return (
    <button
      aria-label={
        clipping ? "Clipping. Reset clip indicator" : "Clip indicator"
      }
      className={cn(
        "group/clip-indicator text-muted-foreground hover:bg-muted focus-visible:ring-ring/30 data-clipping:text-(--meter-clip-foreground) relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-1 text-xs font-medium transition-colors outline-none after:absolute after:-inset-1 focus-visible:ring-3 pointer-coarse:after:-inset-2.5",
        className
      )}
      data-clipping={clipping ? "" : undefined}
      data-slot="clip-indicator"
      type="button"
      {...props}
      onClick={(event) => {
        hold.reset();
        onClick?.(event);
      }}
    >
      {content}
    </button>
  );
};
