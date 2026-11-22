"use client"

import { useCallback, useEffect, useState } from "react"

import {
  DropzoneUploadFileList,
  fileKey,
  HaloDropzone,
  type QueuedFile,
} from "./halo-dropzone"

function sampleFile(name: string, type: string, kb: number) {
  return new File([new Uint8Array(kb * 1024)], name, { type })
}

export default function HaloDropzoneDemo() {
  const [queue, setQueue] = useState<QueuedFile[]>([])

  // Seed a couple of realistic uploads so the list is visible on load.
  useEffect(() => {
    setQueue([
      {
        id: "seed-1",
        file: sampleFile("q3-board-deck.pdf", "application/pdf", 2380),
        progress: 100,
        done: true,
      },
      {
        id: "seed-2",
        file: sampleFile("launch-hero@2x.png", "image/png", 1460),
        progress: 18,
        done: false,
      },
    ])
  }, [])

  const handleFiles = useCallback((files: File[]) => {
    const stamp = Date.now()
    setQueue((prev) => [
      ...prev,
      ...files.map((file, i) => ({
        id: `${fileKey(file)}-${stamp}-${i}`,
        file,
        progress: 0,
        done: false,
      })),
    ])
  }, [])

  const remove = useCallback((id: string) => {
    setQueue((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const hasActiveUploads = queue.some((r) => !r.done)

  useEffect(() => {
    if (!hasActiveUploads) return
    const id = window.setInterval(() => {
      setQueue((prev) =>
        prev.map((row) => {
          if (row.done) return row
          const next = Math.min(100, row.progress + 1.5 + Math.random() * 3)
          return next >= 100
            ? { ...row, progress: 100, done: true }
            : { ...row, progress: next }
        })
      )
    }, 120)
    return () => window.clearInterval(id)
  }, [hasActiveUploads])

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-xl space-y-5">
        <HaloDropzone
          accept="image/*,application/pdf,text/plain,application/json,text/markdown,.doc,.docx,.xlsx,.ppt,.pptx,.csv"
          formatHint="Images, PDF, Office docs, JSON or Markdown"
          multiple
          onFiles={handleFiles}
          showSuccessThumbnails={false}
          successResetMs={4000}
          translucent
        />
        <DropzoneUploadFileList className="w-full" items={queue} onRemove={remove} />
      </div>
    </div>
  )
}
