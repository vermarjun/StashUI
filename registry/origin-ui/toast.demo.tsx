"use client";

import { useState } from "react";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/registry/origin-ui/toast";

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] p-8">
      <ToastProvider>
        <div className="flex gap-3">
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            onClick={() => setOpen(true)}
          >
            Show Toast
          </button>
          <button
            className="rounded-md bg-destructive px-4 py-2 text-sm text-white hover:bg-destructive/90"
            onClick={() => setDestructiveOpen(true)}
          >
            Show Error Toast
          </button>
        </div>

        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>File saved successfully</ToastTitle>
            <ToastDescription>
              Your changes have been saved to the cloud.
            </ToastDescription>
          </div>
          <ToastAction altText="Undo save">Undo</ToastAction>
          <ToastClose />
        </Toast>

        <Toast open={destructiveOpen} onOpenChange={setDestructiveOpen} variant="destructive">
          <div className="grid gap-1">
            <ToastTitle>Upload failed</ToastTitle>
            <ToastDescription>
              There was an error uploading your file. Please try again.
            </ToastDescription>
          </div>
          <ToastAction altText="Retry upload">Retry</ToastAction>
          <ToastClose />
        </Toast>

        <ToastViewport />
      </ToastProvider>
    </div>
  );
}
