/**
 * Capture choreography for: noise-effect (section-noise)
 * Behaviour: a full-width hero section with a noise GIF overlay and a range
 * slider that controls overlay opacity. The grid + gradient background is
 * always visible; the noise overlay animates at whatever frame-rate the GIF
 * runs. No WebGL — just CSS/DOM. Short settle + dwell is enough.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the section paint (grid bg, noise GIF first frame) and the slider mount
  try {
    await wait(600);
  } catch (_) {}

  // Move mouse away from the slider so it doesn't occlude the content
  try {
    await page.mouse.move(W * 0.5, H * 0.6, { steps: 8 });
  } catch (_) {}

  // Dwell: GIF noise cycles autonomously — give it time to show texture
  try {
    await wait(2000);
  } catch (_) {}

  // Second dwell pass for a clean mid-animation frame
  try {
    await wait(1500);
  } catch (_) {}
}
