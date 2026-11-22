import { FileType, getFileType, type FileTypeName } from "./file-type"

const formats = [
  "pdf",
  "docx",
  "xlsx",
  "pptx",
  "jpg",
  "mp4",
  "mp3",
  "zip",
  "fig",
  "html",
] as const satisfies readonly FileTypeName[]

const recent = [
  { name: "Q3 board deck.pptx", size: "18.4 MB", edited: "Edited 2h ago by Maya Chen" },
  { name: "Series A term sheet.pdf", size: "412 KB", edited: "Edited yesterday by Daniel Ortiz" },
  { name: "Revenue model 2026.xlsx", size: "2.1 MB", edited: "Edited Mon by Priya Raman" },
  { name: "Launch teaser.mp4", size: "64.7 MB", edited: "Uploaded Sep 12 by Leo Park" },
]

export default function FileTypeDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="flex w-full max-w-xl flex-col gap-6 rounded-xl border border-border bg-card p-6 text-card-foreground">
        <div className="grid grid-cols-5 gap-x-6 gap-y-5 justify-items-center">
          {formats.map((type, i) => (
            <FileType
              key={type}
              type={type}
              size="xl"
              variant={i % 2 === 0 ? "outline" : "solid"}
            />
          ))}
        </div>
        <div className="h-px bg-border" />
        <ul className="flex flex-col gap-3">
          {recent.map((file) => (
            <li key={file.name} className="flex items-center gap-3">
              <FileType type={getFileType(file.name)} size="sm" variant="light" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {file.edited}
                </p>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {file.size}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
