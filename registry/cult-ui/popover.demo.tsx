"use client"

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/registry/cult-ui/popover"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[480px]">
      <PopoverRoot>
        <PopoverTrigger>Leave a note</PopoverTrigger>
        <PopoverContent>
          <PopoverForm onSubmit={(note) => console.log("Note:", note)}>
            <PopoverLabel>Your note</PopoverLabel>
            <PopoverTextarea />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton />
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </PopoverRoot>
    </div>
  )
}
