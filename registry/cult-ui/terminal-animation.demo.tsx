"use client"

import {
  TerminalAnimationRoot,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationBlinkingCursor,
  defaultTerminalTabs,
} from "@/registry/cult-ui/terminal-animation"

export default function Demo() {
  return (
    <div className="w-full max-w-2xl p-4">
      <TerminalAnimationRoot tabs={defaultTerminalTabs} alwaysDark>
        <TerminalAnimationWindow className="bg-zinc-950 text-zinc-100 font-mono text-sm">
          <TerminalAnimationTabList className="flex gap-1 px-4 pt-3 pb-0 border-b border-zinc-800">
            {defaultTerminalTabs.map((tab, i) => (
              <TerminalAnimationTabTrigger
                key={tab.label}
                index={i}
                className="px-3 py-1.5 text-xs rounded-t-md data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {tab.label}
              </TerminalAnimationTabTrigger>
            ))}
          </TerminalAnimationTabList>
          <TerminalAnimationContent>
            <div className="flex items-center text-zinc-400 mb-2">
              <span className="text-emerald-400 mr-2">$</span>
              <TerminalAnimationCommandBar />
              <TerminalAnimationBlinkingCursor />
            </div>
            <TerminalAnimationOutput
              renderLine={(line, _index, visible) => {
                if (!visible) return null
                return (
                  <div className={line.color ?? "text-zinc-300"}>
                    {line.text || " "}
                  </div>
                )
              }}
            />
          </TerminalAnimationContent>
        </TerminalAnimationWindow>
      </TerminalAnimationRoot>
    </div>
  )
}
