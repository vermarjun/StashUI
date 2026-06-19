"use client"

import { useState } from "react"
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSeparator,
} from "@/registry/cult-ui/popover-form"

function FeedbackForm() {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full p-3 pt-8 gap-2"
    >
      <div className="relative flex-1">
        <PopoverFormSeparator />
        <textarea
          className="w-full h-full resize-none bg-transparent px-2 pt-3 text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <PopoverFormButton loading={loading} text="Send" />
      </div>
    </form>
  )
}

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setShowSuccess(false)
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[480px]">
      <PopoverForm
        open={open}
        setOpen={(v) => {
          setOpen(v)
          if (!v) setShowSuccess(false)
        }}
        showSuccess={showSuccess}
        title="Feedback"
        openChild={<FeedbackForm />}
      />
    </div>
  )
}
