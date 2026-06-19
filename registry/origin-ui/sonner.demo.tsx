"use client";

import { toast } from "sonner";
import { Toaster } from "@/registry/origin-ui/sonner";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] p-8">
      <Toaster />
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast("File saved successfully", {
              description: "Your changes have been saved to the cloud.",
            })
          }
        >
          Show Toast
        </button>
        <button
          className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          onClick={() =>
            toast.success("Payment complete", {
              description: "Your subscription has been activated.",
            })
          }
        >
          Success
        </button>
        <button
          className="rounded-md bg-destructive px-4 py-2 text-sm text-white hover:bg-destructive/90"
          onClick={() =>
            toast.error("Upload failed", {
              description: "There was an error uploading your file.",
            })
          }
        >
          Error
        </button>
        <button
          className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          onClick={() =>
            toast.promise(
              new Promise<void>((resolve) => setTimeout(resolve, 2000)),
              {
                loading: "Saving…",
                success: "Saved!",
                error: "Failed to save.",
              },
            )
          }
        >
          Promise
        </button>
      </div>
    </div>
  );
}
