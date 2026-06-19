/**
 * Capture choreography for logos-marquee
 *
 * logos-marquee renders a single Marquee row of icon images (Apple, Google,
 * Facebook, OpenAI, X) with a CSS animation at constant speed, flanked by
 * gradient fade overlays. Auto-motion is driven entirely by CSS — no JS state
 * to trigger. Strategy: settle ~800ms for images to load, then dwell ~3.5s to
 * capture a full scroll cycle showing logos entering and exiting under the
 * fade masks.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow images from simpleicons/wikipedia to load
  try { await wait(800); } catch (_) {}

  // Dwell while the CSS marquee scrolls logos left
  try { await wait(3500); } catch (_) {}

  // Brief pause before the recording ends — keeps the final frame clean
  try { await wait(200); } catch (_) {}
}
