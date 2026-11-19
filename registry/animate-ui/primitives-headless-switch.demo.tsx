"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { Switch, SwitchIcon, SwitchThumb } from "@/registry/animate-ui/primitives-headless-switch";

const ROWS = [
  { title: "Airplane mode", desc: "Turn off all wireless radios.", on: false },
  { title: "Wi-Fi", desc: "Join known networks automatically.", on: true },
  { title: "Bluetooth", desc: "Let nearby devices connect.", on: true },
];

const switchCls =
  "relative flex h-6 w-10 shrink-0 items-center justify-start rounded-full bg-input p-[3px] data-checked:justify-end data-checked:bg-primary";
const thumbCls = "relative z-10 size-[18px] rounded-full bg-background shadow-sm";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Connections</h3>
        <p className="mt-1 text-muted-foreground text-sm">The thumb stretches while you press it.</p>
        <div className="mt-5 divide-y divide-border">
          {ROWS.map((r) => (
            <div className="flex items-center justify-between gap-6 py-4" key={r.title}>
              <div>
                <p className="font-medium text-sm">{r.title}</p>
                <p className="text-muted-foreground text-xs">{r.desc}</p>
              </div>
              <Switch className={switchCls} defaultChecked={r.on}>
                <SwitchThumb className={thumbCls} pressedAnimation={{ width: 22 }} />
              </Switch>
            </div>
          ))}
          <div className="flex items-center justify-between gap-6 py-4">
            <div>
              <p className="font-medium text-sm">Theme</p>
              <p className="text-muted-foreground text-xs">With icons on each side.</p>
            </div>
            <Switch className={`${switchCls} w-12`} defaultChecked>
              <SwitchThumb className={thumbCls} pressedAnimation={{ width: 22 }} />
              <SwitchIcon className="absolute left-1.5 text-primary-foreground" position="left">
                <MoonIcon className="size-3" />
              </SwitchIcon>
              <SwitchIcon className="absolute right-1.5 text-muted-foreground" position="right">
                <SunIcon className="size-3" />
              </SwitchIcon>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

