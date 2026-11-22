// Tremor Tooltip [v1.0.0]

"use client"

import React from "react"
import * as TooltipPrimitives from "@radix-ui/react-tooltip"

import { cn as cx } from "@/lib/utils"

interface TooltipProps
  extends Omit<TooltipPrimitives.TooltipContentProps, "content" | "onClick">,
  Pick<
    TooltipPrimitives.TooltipProps,
    "open" | "defaultOpen" | "onOpenChange" | "delayDuration"
  > {
  content: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  side?: "bottom" | "left" | "top" | "right"
  showArrow?: boolean
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipProps
>(
  (
    {
      children,
      className,
      content,
      delayDuration,
      defaultOpen,
      open,
      onClick,
      onOpenChange,
      showArrow = true,
      side,
      sideOffset = 10,
      asChild,
      ...props
    }: TooltipProps,
    forwardedRef,
  ) => {
    return (
      <TooltipPrimitives.Provider delayDuration={150}>
        <TooltipPrimitives.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
          tremor-id="tremor-raw"
        >
          <TooltipPrimitives.Trigger onClick={onClick} asChild={asChild}>
            {children}
          </TooltipPrimitives.Trigger>
          <TooltipPrimitives.Portal>
            <TooltipPrimitives.Content
              ref={forwardedRef}
              side={side}
              sideOffset={sideOffset}
              align="center"
              className={cx(
                // base
                "max-w-60 select-none rounded-md px-2.5 py-1.5 text-sm leading-5 shadow-md",
                // text color
                "text-gray-50 dark:text-gray-900",
                // background color
                "bg-gray-900 dark:bg-gray-50",
                // transition
                "will-change-[transform,opacity]",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                className,
              )}
              {...props}
            >
              {content}
              {showArrow ? (
                <TooltipPrimitives.Arrow
                  className="border-none fill-gray-900 dark:fill-gray-50"
                  width={12}
                  height={7}
                  aria-hidden="true"
                />
              ) : null}
            </TooltipPrimitives.Content>
          </TooltipPrimitives.Portal>
        </TooltipPrimitives.Root>
      </TooltipPrimitives.Provider>
    )
  },
)

Tooltip.displayName = "Tooltip"

export { Tooltip, type TooltipProps }
