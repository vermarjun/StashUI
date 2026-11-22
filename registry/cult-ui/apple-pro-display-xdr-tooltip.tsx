"use client"

import type * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Ported from Cult UI's Base UI tooltip to Radix (radix-ui), keeping the same
 * API surface the display uses: `delayDuration`, `asChild`, and Base UI's
 * `render` element prop on the trigger.
 */

function TooltipProvider({
  delay,
  delayDuration,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider> & {
  delay?: number
}) {
  const resolvedDelay = delay ?? delayDuration ?? 0
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={resolvedDelay}
      {...props}
    />
  )
}

function Tooltip({
  delayDuration,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & {
  delayDuration?: number
}) {
  return (
    <TooltipProvider delayDuration={delayDuration ?? 0}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  asChild = false,
  render,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & {
  render?: React.ReactElement
}) {
  if (render) {
    return (
      <TooltipPrimitive.Trigger asChild data-slot="tooltip-trigger" {...props}>
        {render}
      </TooltipPrimitive.Trigger>
    )
  }
  return (
    <TooltipPrimitive.Trigger
      asChild={asChild}
      data-slot="tooltip-trigger"
      {...props}
    >
      {children}
    </TooltipPrimitive.Trigger>
  )
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-2xl bg-foreground px-3 py-1.5 text-xs text-background data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
