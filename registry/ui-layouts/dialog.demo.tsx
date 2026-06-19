"use client";

import { FramerModal, ModalContent } from "@/registry/ui-layouts/dialog";
import { useState } from "react";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full items-center justify-center">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-lg border bg-background hover:bg-muted transition-colors font-medium text-sm"
      >
        Open Dialog
      </button>

      <FramerModal open={open} setOpen={setOpen}>
        <ModalContent>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Confirm Action
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Are you sure you want to proceed? This action cannot be undone and
            will permanently delete your data.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Confirm
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2 rounded-md border text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </ModalContent>
      </FramerModal>
    </div>
  );
}
