"use client";

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui-layouts/linear-modal";
import { Plus } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex h-full items-center justify-center">
      <Dialog
        transition={{
          type: "spring",
          bounce: 0.05,
          duration: 0.5,
        }}
      >
        <DialogTrigger
          style={{ borderRadius: "12px" }}
          className="flex w-64 flex-col overflow-hidden border dark:bg-black bg-white cursor-pointer"
        >
          <DialogImage
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800"
            alt="Mountain landscape"
            className="h-44 w-full object-cover"
          />
          <div className="flex grow flex-row items-end justify-between p-3">
            <div>
              <DialogTitle className="text-base font-semibold text-primary">
                Mountain Vista
              </DialogTitle>
              <DialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                }}
              >
                <span className="text-xs text-muted-foreground">
                  Click to expand
                </span>
              </DialogDescription>
            </div>
            <button className="p-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </DialogTrigger>

        <DialogContainer className="grid place-items-center h-full">
          <DialogContent
            style={{ borderRadius: "24px" }}
            className="h-fit mx-auto border"
          >
            <div className="flex flex-col relative dark:bg-neutral-900 bg-neutral-100 w-[480px] max-w-[90vw] overflow-hidden">
              <DialogImage
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800"
                alt="Mountain landscape"
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <DialogTitle className="text-3xl font-bold dark:text-white text-zinc-900">
                  Mountain Vista
                </DialogTitle>
                <DialogDescription
                  disableLayoutAnimation
                  variants={{
                    initial: { opacity: 0, scale: 0.9, y: -20 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.9, y: -20 },
                  }}
                >
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    A breathtaking alpine panorama captured at golden hour. The
                    layered ridgelines fade into misty blue distance, offering a
                    sense of boundless scale and serenity.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium">
                      Download
                    </button>
                    <button className="px-4 py-2 border rounded-lg text-sm font-medium">
                      Share
                    </button>
                  </div>
                </DialogDescription>
              </div>
              <DialogClose className="text-zinc-800 dark:text-zinc-100 bg-neutral-200 dark:bg-neutral-800 p-2 rounded-lg" />
            </div>
          </DialogContent>
        </DialogContainer>
      </Dialog>
    </div>
  );
}
