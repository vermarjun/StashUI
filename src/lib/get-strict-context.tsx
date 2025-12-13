"use client";

import * as React from "react";

/**
 * Animate UI's strict-context helper. Returns a typed [Provider, useContext]
 * tuple where the hook throws if used outside the provider.
 */
export function getStrictContext<T>(name?: string) {
  const Context = React.createContext<T | null>(null);

  function Provider({
    value,
    children,
  }: {
    value: T;
    children?: React.ReactNode;
  }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useStrictContext(): T {
    const ctx = React.useContext(Context);
    if (ctx === null) {
      throw new Error(
        `useStrictContext must be used within ${name ?? "its Provider"}`,
      );
    }
    return ctx;
  }

  return [Provider, useStrictContext] as const;
}
