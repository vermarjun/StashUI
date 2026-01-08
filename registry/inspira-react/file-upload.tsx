"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── FileUploadGrid ───────────────────────────────────────────────────────────
interface FileUploadGridProps {
  className?: string;
}

export function FileUploadGrid({ className }: FileUploadGridProps) {
  const ROWS = 11;
  const COLUMNS = 41;

  return (
    <div
      className={cn(
        "flex shrink-0 scale-105 flex-wrap items-center justify-center gap-px bg-gray-100 dark:bg-neutral-900",
        className
      )}
    >
      {Array.from({ length: ROWS }, (_, row) =>
        Array.from({ length: COLUMNS }, (_, col) => {
          const idx = row * COLUMNS + col;
          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                "flex h-10 w-10 shrink-0 rounded-[2px]",
                idx % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              )}
            />
          );
        })
      )}
    </div>
  );
}

// ─── UploadIcon ───────────────────────────────────────────────────────────────
function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

// ─── FileUpload ───────────────────────────────────────────────────────────────
interface FileUploadProps {
  className?: string;
  onChange?: (files: File[]) => void;
  children?: ReactNode;
}

export function FileUpload({ className, onChange, children }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isActive, setIsActive] = useState(false);

  function handleFileChange(newFiles: File[]) {
    const updated = [...files, ...newFiles];
    setFiles(updated);
    onChange?.(updated);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFileChange(Array.from(e.target.files));
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsActive(true);
  }

  function handleDragLeave() {
    setIsActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsActive(false);
    const dropped = e.dataTransfer?.files
      ? Array.from(e.dataTransfer.files)
      : [];
    if (dropped.length) handleFileChange(dropped);
  }

  return (
    <div
      className={cn("w-full", className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onInputChange}
        />

        {/* Grid pattern background */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          {children}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative mx-auto mt-10 w-full max-w-xl space-y-4">
            {files.map((file, idx) => (
              <motion.div
                key={`file-${idx}`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="relative z-40 mx-auto flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 shadow-sm md:h-24 dark:bg-neutral-900"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>
                <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-md bg-gray-100 px-1.5 py-1 text-sm dark:bg-neutral-800"
                  >
                    {file.type || "unknown type"}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}

            {files.length === 0 && (
              <>
                <motion.div
                  className="relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl dark:bg-neutral-900"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={
                    isActive ? { x: 20, y: -20, opacity: 0.9 } : { x: 0, y: 0, opacity: 1 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <UploadIcon className="text-neutral-600 dark:text-neutral-400" />
                </motion.div>

                <div
                  className={cn(
                    "absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
