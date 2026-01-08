"use client"

import { LinkPreview } from "@/registry/inspira-react/link-preview"

export default function LinkPreviewDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12 min-h-48">
      <p className="text-neutral-500 text-sm">Hover over the links below</p>
      <div className="flex gap-8 text-lg font-semibold">
        <LinkPreview
          url="https://vercel.com"
          isStatic={false}
          width={200}
          height={125}
        >
          <span className="underline cursor-pointer hover:text-blue-600 transition-colors">
            Vercel
          </span>
        </LinkPreview>

        <LinkPreview
          url="https://github.com"
          imageSrc="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
          isStatic={true}
          width={200}
          height={125}
        >
          <span className="underline cursor-pointer hover:text-blue-600 transition-colors">
            GitHub (static)
          </span>
        </LinkPreview>
      </div>
    </div>
  )
}
