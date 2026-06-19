/**
 * Capture choreography for inspira-text-generate-effect
 * (source: text-generate-effect.tsx).
 *
 * Behaviour: on mount a useEffect stagger-animates each word's opacity from 0→1
 * and filter from blur(10px)→blur(0). The demo has ~13 words at 200 ms stagger
 * = ~2.6 s to complete. The effect fires once; a small scroll away + back does
 * NOT retrigger it (no IntersectionObserver) — the component just re-mounts.
 * Strategy: wait for the full word cascade to finish (~3 s), then dwell briefly
 * to show the completed text clearly. No scroll needed.
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor above the text block.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 4 });
  } catch (_) {}

  // Allow component to mount and the stagger sequence to run to completion.
  // ~13 words × 200 ms stagger + 700 ms transition = ~3.3 s total.
  try {
    await wait(3500);
  } catch (_) {}

  // Short dwell to display fully-revealed text.
  try {
    await wait(800);
  } catch (_) {}

  // Return mouse to park for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
