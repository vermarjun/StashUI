/**
 * Capture choreography for: components-backgrounds-bubble
 * Behaviour: animated radial-gradient blobs (mix-blend-hard-light) with SVG
 * goo/turbulence filter. Five blobs animate autonomously via CSS keyframes.
 * Optional sixth mouse-following blob (interactive=false by default so it is
 * off). Dwell to show blob drift and colour blending.
 */
export default async function capture(page, { W, H, wait }) {
  // Let CSS keyframe animations start and the SVG filter render
  try {
    await wait(500);
  } catch (_) {}

  // Park mouse at centre — no interactive blob in default mode but keeps
  // the pointer away from any overflow artifacts
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
  } catch (_) {}

  // Dwell phase 1: five blobs have drifted noticeably from initial positions
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell phase 2: blobs are in a different collision/overlap configuration
  try {
    await wait(1500);
  } catch (_) {}
}
