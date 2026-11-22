"use client"

import * as React from "react"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  UnderlineIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"

export default function ButtonGroupDemo() {
  const [qty, setQty] = React.useState(2)
  const [align, setAlign] = React.useState("left")
  const [marks, setMarks] = React.useState<string[]>(["bold"])
  const toggle = (m: string) =>
    setMarks((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]))

  return (
    <div className="flex h-full min-h-[480px] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <ButtonGroup aria-label="Message actions">
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Back">
              <ArrowLeftIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">
              <ArchiveIcon /> Archive
            </Button>
            <Button variant="outline">Snooze</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">
              <StarIcon /> Star
            </Button>
            <Button variant="outline" size="icon" aria-label="More">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </ButtonGroup>

        <div className="flex gap-3">
          <ButtonGroup aria-label="Text style">
            {[
              ["bold", BoldIcon],
              ["italic", ItalicIcon],
              ["underline", UnderlineIcon],
            ].map(([m, Icon]) => {
              const I = Icon as typeof BoldIcon
              const on = marks.includes(m as string)
              return (
                <Button
                  key={m as string}
                  variant={on ? "secondary" : "outline"}
                  size="icon"
                  aria-label={m as string}
                  aria-pressed={on}
                  onClick={() => toggle(m as string)}
                >
                  <I />
                </Button>
              )
            })}
          </ButtonGroup>
          <ButtonGroup aria-label="Alignment">
            {[
              ["left", AlignLeftIcon],
              ["center", AlignCenterIcon],
              ["right", AlignRightIcon],
            ].map(([a, Icon]) => {
              const I = Icon as typeof AlignLeftIcon
              return (
                <Button
                  key={a as string}
                  variant={align === a ? "secondary" : "outline"}
                  size="icon"
                  aria-label={`Align ${a}`}
                  onClick={() => setAlign(a as string)}
                >
                  <I />
                </Button>
              )
            })}
          </ButtonGroup>
        </div>

        <ButtonGroup className="w-full max-w-sm">
          <ButtonGroupText>https://</ButtonGroupText>
          <Input placeholder="stashui.dev/components" />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>

        <div className="flex items-center gap-3">
          <ButtonGroup aria-label="Quantity">
            <Button
              variant="outline"
              size="icon"
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(0, q - 1))}
            >
              <MinusIcon />
            </Button>
            <ButtonGroupText className="min-w-12 justify-center tabular-nums">
              {qty}
            </ButtonGroupText>
            <Button
              variant="outline"
              size="icon"
              aria-label="Increase"
              onClick={() => setQty((q) => q + 1)}
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>Add to cart</Button>
            <ButtonGroupSeparator className="bg-primary-foreground/30" />
            <Button size="icon" aria-label="Share">
              <ShareIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}
