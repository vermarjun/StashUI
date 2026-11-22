"use client"

import {
  CenterUnderline,
  ComesInGoesOutUnderline,
  GoesOutComesInUnderline,
  UnderlineToBackground,
} from "./underline-animation"

export default function UnderlineAnimationDemo() {
  return (
    <div className="flex h-[520px] w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-row items-start space-x-10 text-2xl uppercase text-[#4f5dff]">
        <div className="text-muted-foreground">Contact</div>
        <ul className="flex flex-col space-y-1">
          <li>
            <a href="#" data-underline="center">
              <CenterUnderline>LinkedIn</CenterUnderline>
            </a>
          </li>
          <li>
            <a href="#" data-underline="comes-in-right">
              <ComesInGoesOutUnderline direction="right">Instagram</ComesInGoesOutUnderline>
            </a>
          </li>
          <li>
            <a href="#" data-underline="comes-in-left">
              <ComesInGoesOutUnderline direction="left">Dribbble</ComesInGoesOutUnderline>
            </a>
          </li>
          <li>
            <a href="#" data-underline="background">
              <UnderlineToBackground targetTextColor="#0a0a0a" className="px-0.5">
                Read.cv
              </UnderlineToBackground>
            </a>
          </li>
          <li className="pt-10">
            <a href="#" data-underline="goes-out-left">
              <GoesOutComesInUnderline direction="left">hello@stashui.dev</GoesOutComesInUnderline>
            </a>
          </li>
          <li>
            <a href="#" data-underline="goes-out-right">
              <GoesOutComesInUnderline direction="right">press@stashui.dev</GoesOutComesInUnderline>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
