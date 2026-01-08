"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "motion/react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

// ---------- Context ----------

interface AnimatedModalContextValue {
  open: boolean
  openModal: () => void
  closeModal: () => void
  toggle: () => void
}

const AnimatedModalContext = createContext<AnimatedModalContextValue | null>(null)

export function useAnimatedModal() {
  const ctx = useContext(AnimatedModalContext)
  if (!ctx) throw new Error("useAnimatedModal must be used within <AnimatedModal>")
  return ctx
}

// ---------- Root ----------

interface AnimatedModalProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  closeOnEsc?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AnimatedModal({
  children,
  open: controlledOpen,
  defaultOpen = false,
  closeOnEsc = true,
  onOpenChange,
}: AnimatedModalProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? Boolean(controlledOpen) : internalOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value)
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange]
  )

  const openModal = useCallback(() => setOpen(true), [setOpen])
  const closeModal = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!open), [setOpen, open])

  useEffect(() => {
    if (!closeOnEsc) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault()
        closeModal()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [closeOnEsc, open, closeModal])

  return (
    <AnimatedModalContext.Provider value={{ open, openModal, closeModal, toggle }}>
      {children}
    </AnimatedModalContext.Provider>
  )
}

// ---------- Trigger ----------

interface AnimatedModalTriggerProps {
  children: ReactNode
  className?: string
  disabled?: boolean
  asChild?: boolean
}

export function AnimatedModalTrigger({
  children,
  className,
  disabled = false,
}: AnimatedModalTriggerProps) {
  const { openModal } = useAnimatedModal()

  return (
    <button
      type="button"
      disabled={disabled}
      aria-haspopup="dialog"
      onClick={(e) => {
        e.preventDefault()
        if (!disabled) openModal()
      }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-center",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {children}
    </button>
  )
}

// ---------- Body (portal + overlay + panel) ----------

interface AnimatedModalBodyProps {
  children: ReactNode
  className?: string
  overlayClass?: string
  contentClass?: string
  showClose?: boolean
  closeOnOutside?: boolean
  lockScroll?: boolean
  zIndex?: number
}

export function AnimatedModalBody({
  children,
  className,
  overlayClass,
  contentClass,
  showClose = true,
  closeOnOutside = true,
  lockScroll = true,
  zIndex = 10000,
}: AnimatedModalBodyProps) {
  const { open, closeModal } = useAnimatedModal()
  const panelRef = useRef<HTMLDivElement>(null)

  // Scroll lock
  useEffect(() => {
    if (!lockScroll) return
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open, lockScroll])

  // Close on outside click
  useEffect(() => {
    if (!closeOnOutside || !open) return
    const handler = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [closeOnOutside, open, closeModal])

  if (typeof window === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          style={{ zIndex }}
          className="fixed inset-0 flex h-full w-full items-center justify-center"
          animate={{ backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("fixed inset-0 h-full w-full bg-black/50", overlayClass)}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.5, rotateX: 80, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{
              opacity: { duration: 0.2, ease: "easeOut" },
              scale: { type: "spring", stiffness: 260, damping: 15 },
              rotateX: { type: "spring", stiffness: 260, damping: 15 },
              y: { type: "spring", stiffness: 260, damping: 15 },
            }}
            className={cn(
              "relative z-50 flex max-h-[85vh] w-[min(720px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950",
              className
            )}
          >
            {showClose && (
              <button
                type="button"
                className="group absolute top-4 right-4"
                aria-label="Close"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3 dark:text-white"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
            <div className={cn("flex flex-1 flex-col", contentClass)}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ---------- Content ----------

interface AnimatedModalContentProps {
  children: ReactNode
  className?: string
}

export function AnimatedModalContent({ children, className }: AnimatedModalContentProps) {
  return (
    <div className={cn("flex flex-1 flex-col p-8 md:p-10", className)}>{children}</div>
  )
}

// ---------- Footer ----------

interface AnimatedModalFooterProps {
  children: ReactNode
  className?: string
}

export function AnimatedModalFooter({ children, className }: AnimatedModalFooterProps) {
  return (
    <div className={cn("flex justify-end bg-gray-100 p-4 dark:bg-neutral-900", className)}>
      {children}
    </div>
  )
}
