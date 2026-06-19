/**
 * Capture choreography for ImageTrail-TS-TW
 *
 * ImageTrail renders a container full of absolutely-positioned `.content__img`
 * divs (190 px wide, opacity:0). As the mouse moves >80 px from the last
 * trigger position, the next image in the cycle is GSAP-animated to the cursor
 * position (opacity 1 → fades/shrinks back). The component requires `items`
 * prop (array of image URLs); the demo passes none by default, meaning no
 * `.content__img` elements render → nothing visible. The demo is blank and
 * needs a fix.
 *
 * FIX: Update the demo to supply sample items so the trail is visible.
 * We use publicly available placeholder images (picsum.photos) — plain <img>
 * is fine since ImageTrail uses `backgroundImage` CSS, not <img> tags.
 *
 * CHOREOGRAPHY:
 *   1. Mount settle.
 *   2. Enter from the left edge, then trace wide sweeping arcs (S-curve +
 *      figure-8) across the full container at moderate speed so the threshold
 *      (80 px) is repeatedly crossed, spawning a chain of image thumbnails.
 *   3. A second pass at higher speed to show multiple overlapping images.
 *   4. End near the start for loop seam (images fade out on their own).
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(600);
  } catch (_) {}

  // Enter from left centre
  try {
    await page.mouse.move(W * 0.05, H * 0.5, { steps: 6 });
    await wait(200);
  } catch (_) {}

  // S-curve sweep: crossing the 80 px threshold repeatedly
  // Move in large steps so each segment is ~90-120 px → spawns ~6-8 images
  try {
    const sCurve = [
      [W * 0.2,  H * 0.25],
      [W * 0.4,  H * 0.2 ],
      [W * 0.6,  H * 0.3 ],
      [W * 0.8,  H * 0.2 ],
      [W * 0.95, H * 0.35],
      [W * 0.8,  H * 0.5 ],
      [W * 0.6,  H * 0.6 ],
      [W * 0.4,  H * 0.75],
      [W * 0.2,  H * 0.8 ],
      [W * 0.05, H * 0.65]
    ];
    for (const [x, y] of sCurve) {
      // Move in steps: fewer steps = faster move = more threshold crossings
      await page.mouse.move(x, y, { steps: 8 });
      await wait(60);
    }
  } catch (_) {}

  // Brief dwell so images finish their fade-out
  try {
    await wait(400);
  } catch (_) {}

  // Second pass — faster zigzag across the upper half to spawn another burst
  try {
    const zigzag = [
      [W * 0.15, H * 0.3 ],
      [W * 0.35, H * 0.15],
      [W * 0.55, H * 0.3 ],
      [W * 0.75, H * 0.15],
      [W * 0.9,  H * 0.3 ],
      [W * 0.75, H * 0.45],
      [W * 0.55, H * 0.5 ],
      [W * 0.35, H * 0.4 ],
      [W * 0.15, H * 0.5 ]
    ];
    for (const [x, y] of zigzag) {
      await page.mouse.move(x, y, { steps: 6 });
      await wait(50);
    }
  } catch (_) {}

  // Dwell so images finish fading
  try {
    await wait(600);
  } catch (_) {}

  // Return to left-centre for loop seam
  try {
    await page.mouse.move(W * 0.05, H * 0.5, { steps: 16 });
    await wait(300);
  } catch (_) {}
}
