"use client"

import {
  CenterUnderline,
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
  UnderlineToBackground,
} from "./underline-animation"

// Links are role="link" spans, not <a href>: hovering a real href puts the
// browser's status-bar URL into the recording.
export default function UnderlineAnimationDemo() {
  return (
    <div className="flex h-[520px] w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-row items-start space-x-10 text-4xl uppercase text-[#4f5dff]">
        <div className="text-muted-foreground">Contact</div>
        <ul className="flex flex-col space-y-1">
          <li>
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="center">
              <CenterUnderline>Work</CenterUnderline>
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="comes-in-right">
              <ComesInGoesOutUnderline direction="right">Studio</ComesInGoesOutUnderline>
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="comes-in-left">
              <ComesInGoesOutUnderline direction="left">Journal</ComesInGoesOutUnderline>
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="background">
              <UnderlineToBackground targetTextColor="#0a0a0a" className="px-0.5">
                About
              </UnderlineToBackground>
            </span>
          </li>
          <li className="pt-10">
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="goes-out-left">
              <GoesOutComesInUnderline direction="left">hello@stashui.dev</GoesOutComesInUnderline>
            </span>
          </li>
          <li>
            <span role="link" tabIndex={0} className="cursor-pointer" data-underline="goes-out-right">
              <GoesOutComesInUnderline direction="right">press@stashui.dev</GoesOutComesInUnderline>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
