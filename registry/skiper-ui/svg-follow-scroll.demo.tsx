"use client";

import { Skiper19 } from "./svg-follow-scroll";

export default function SvgFollowScrollDemo() {
  // The stroke hangs off the right of the headline; zooming the page out a
  // little keeps the whole loop and its downward sweep inside the frame.
  return (
    <div style={{ zoom: 0.72 }}>
      <Skiper19 />
    </div>
  );
}
