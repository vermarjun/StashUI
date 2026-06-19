"use client"

import { ShareButton } from "@/registry/animate-ui/components-community-share-button"

export default function Demo() {
  return (
    <ShareButton
      size="default"
      icon="prefix"
      onIconClick={(platform) => {
        console.log("Share to", platform)
      }}
    >
      Share
    </ShareButton>
  )
}
