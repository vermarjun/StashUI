"use client"

import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelTextarea,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
} from "@/registry/cult-ui/floating-panel"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-48 p-8">
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Add Note">
          Add Note
        </FloatingPanelTrigger>
        <FloatingPanelContent className="w-80 h-48">
          <FloatingPanelForm onSubmit={(note) => console.log("Note:", note)}>
            <FloatingPanelLabel htmlFor="note">Write your note</FloatingPanelLabel>
            <FloatingPanelTextarea id="note" />
            <FloatingPanelFooter>
              <FloatingPanelCloseButton />
              <FloatingPanelSubmitButton />
            </FloatingPanelFooter>
          </FloatingPanelForm>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    </div>
  )
}
