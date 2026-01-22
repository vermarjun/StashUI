"use client";

import * as React from "react";
import { useInView } from "motion/react";

export type UseInViewOptions = Parameters<typeof useInView>[1];

interface Options {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions extends { margin?: infer M } ? M : string;
}

/**
 * Animate UI's in-view hook. Returns a ref to attach and whether it's in view.
 * When `inView` is false (the default), `isInView` is always true so animations
 * play immediately; when true it follows an IntersectionObserver via motion.
 */
export function useIsInView<T extends HTMLElement = HTMLElement>(
  ref?: React.RefObject<T | null> | null,
  options: Options = {},
) {
  const localRef = React.useRef<T>(null);
  const usedRef = (ref ?? localRef) as React.RefObject<T | null>;
  const result = useInView(usedRef, {
    once: options.inViewOnce ?? true,
    margin: options.inViewMargin as never,
  });
  const isInView = !options.inView || result;
  return { ref: usedRef, isInView };
}
