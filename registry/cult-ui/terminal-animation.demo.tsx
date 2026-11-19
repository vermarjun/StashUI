"use client"

import {
  TerminalAnimationBackgroundGradient,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationWindow,
  defaultTerminalTabs,
} from "@/registry/cult-ui/terminal-animation"

export default function Demo() {
  return (
    <TerminalAnimationRoot
      tabs={defaultTerminalTabs}
      alwaysDark
      className="relative flex h-[620px] w-full justify-center overflow-hidden"
    >
      <TerminalAnimationBackgroundGradient />
      <TerminalAnimationContainer className="relative flex max-w-3xl justify-center px-6 pt-14 md:pt-16">
        <TerminalAnimationWindow
          minHeight="34rem"
          className="w-full rounded-xl border border-white/10 bg-zinc-950/95 font-mono text-[15px] text-zinc-100 shadow-2xl shadow-black/60 ring-1 ring-black/40 backdrop-blur"
        >
          <div className="flex items-center gap-4 border-white/10 border-b px-4 pt-3">
            <div className="flex gap-1.5 pb-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <TerminalAnimationTabList className="flex gap-1">
              {defaultTerminalTabs.map((tab, i) => (
                <TerminalAnimationTabTrigger
                  key={tab.label}
                  index={i}
                  className="rounded-t-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
                >
                  {tab.label}
                </TerminalAnimationTabTrigger>
              ))}
            </TerminalAnimationTabList>
          </div>
          <TerminalAnimationContent>
            <div className="mb-3 flex items-center text-zinc-100">
              <span className="mr-2 text-emerald-400">$</span>
              <TerminalAnimationCommandBar />
              <TerminalAnimationBlinkingCursor />
            </div>
            <TerminalAnimationOutput
              renderLine={(line, _index, visible) => {
                if (!visible) return null
                return (
                  <div className={`whitespace-pre leading-relaxed ${line.color ?? "text-zinc-200"}`}>
                    {line.text || " "}
                  </div>
                )
              }}
            />
          </TerminalAnimationContent>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  )
}
