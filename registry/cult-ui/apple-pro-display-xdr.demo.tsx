"use client"

import { AppleProDisplayXDR } from "./apple-pro-display-xdr"

export default function AppleProDisplayXDRDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <AppleProDisplayXDR initialMode="wallpaper" />
      </div>
    </div>
  )
}
