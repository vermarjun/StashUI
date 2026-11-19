"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import * as React from "react";

import { type Resolved, ThemeToggler, type ThemeSelection } from "@/registry/animate-ui/primitives-effects-theme-toggler";

const OPTIONS = [
  { value: "light" as const, label: "Light", Icon: SunIcon },
  { value: "dark" as const, label: "Dark", Icon: MoonIcon },
  { value: "system" as const, label: "System", Icon: MonitorIcon },
];

export default function Demo() {
  const [theme, setThemeState] = React.useState<ThemeSelection>("dark");
  const [resolved, setResolved] = React.useState<Resolved>("dark");

  React.useEffect(() => {
    setResolved(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const setTheme = (t: ThemeSelection) => {
    const r: Resolved =
      t === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : t;
    document.documentElement.classList.toggle("dark", r === "dark");
    setThemeState(t);
    setResolved(r);
  };

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <ThemeToggler direction="ltr" resolvedTheme={resolved} setTheme={setTheme} theme={theme}>
        {({ effective, toggleTheme }) => (
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="font-semibold text-base">Appearance</h3>
            <p className="mt-1 text-muted-foreground text-sm">
              Switching theme wipes the page with a view transition.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg bg-muted p-1">
              {OPTIONS.map(({ value, label, Icon }) => (
                <button
                  className="flex items-center justify-center gap-2 rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm"
                  data-active={effective === value}
                  key={value}
                  onClick={() => toggleTheme(value)}
                  type="button"
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </ThemeToggler>
    </div>
  );
}
