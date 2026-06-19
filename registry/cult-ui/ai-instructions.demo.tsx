"use client"

import {
  Instructions,
  InstructionsTrigger,
  InstructionsContent,
  InstructionsSearch,
  InstructionsList,
  InstructionsEmpty,
  InstructionsGroup,
  InstructionsItem,
  InstructionsFooter,
  InstructionsCreateTrigger,
  InstructionsCreateDialog,
  type Instruction,
} from "@/registry/cult-ui/ai-instructions"

const PRESET_INSTRUCTIONS: Instruction[] = [
  {
    id: "concise",
    title: "Be Concise",
    description: "Keep responses short and to the point",
    content: "Always provide the shortest possible answer that fully addresses the question. Avoid filler phrases.",
  },
  {
    id: "code-comments",
    title: "Add Code Comments",
    description: "Annotate all code examples with inline comments",
    content: "Every function and non-obvious line should have a brief comment explaining its purpose.",
  },
  {
    id: "examples",
    title: "Include Examples",
    description: "Show a working example for every concept",
    content: "After explaining a concept, always follow up with a concrete, runnable code or real-world example.",
  },
  {
    id: "formal",
    title: "Formal Tone",
    description: "Use professional, formal language",
    content: "Avoid contractions and casual language. Write in a neutral, professional register.",
  },
]

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[480px] gap-6 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          Customize how the AI responds
        </p>
        <Instructions instructions={PRESET_INSTRUCTIONS} defaultValue={["concise"]}>
          <InstructionsTrigger label="Instructions" />
          <InstructionsContent>
            <InstructionsSearch />
            <InstructionsList>
              <InstructionsEmpty />
              <InstructionsGroup heading="Presets">
                {PRESET_INSTRUCTIONS.map((instruction) => (
                  <InstructionsItem
                    key={instruction.id}
                    instruction={instruction}
                  />
                ))}
              </InstructionsGroup>
            </InstructionsList>
            <InstructionsFooter>
              <InstructionsCreateTrigger />
            </InstructionsFooter>
          </InstructionsContent>
          <InstructionsCreateDialog />
        </Instructions>
      </div>
    </div>
  )
}
