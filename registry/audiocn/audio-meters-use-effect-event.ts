import { useCallback, useInsertionEffect, useRef } from "react";

// Stand-in for React's `useEffectEvent`: Next 15's bundled React does not
// export it yet. Returns a stable function that always calls the latest `fn`.
export function useEffectEvent<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}
