"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/registry/animate-ui/primitives-headless-dialog";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
      >
        Open Dialog
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            from="top"
            className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl"
          >
            <DialogHeader className="mb-2">
              <DialogTitle className="text-lg font-semibold text-foreground">
                Confirm action
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              This dialog uses Headless UI under the hood with a spring-driven
              3D flip entrance animation via Framer Motion. Press Escape or
              click Cancel to close.
            </DialogDescription>
            <div className="mt-6 flex justify-end gap-3">
              <DialogClose
                onClick={() => setOpen(false)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                Cancel
              </DialogClose>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
              >
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
