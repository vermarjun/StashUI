/**
 * Choreography: lamp-effect
 * Pure CSS animation (spotlight + glowing line + conic gradient).
 * Animation plays on mount; just wait for it to complete then dwell.
 * delay=0.3s + duration=0.8s → fully lit by ~1.5 s.
 */
export default async function choreograph({ page, W, H }) {
  // Wait for CSS animations to complete (delay 0.3 s + duration 0.8 s + buffer)
  await new Promise((r) => setTimeout(r, 1800));

  // Park mouse at centre — lamp glow follows no mouse but keeps page active
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {
    console.warn("mouse.move failed", e.message);
  }

  // Dwell — capture fully-lit lamp glow state
  await new Promise((r) => setTimeout(r, 3000));
}
