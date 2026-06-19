/**
 * Choreography: line-shadow-text (inspira-line-shadow-text)
 * Behavior: CSS keyframe animates the line-shadow position continuously.
 *           Two headings shown: "Shadow Text" (italic, black shadow) and
 *           "Blue Shadow" (#3b82f6). Auto-plays indefinitely; no interaction.
 * Strategy: park mouse neutrally, dwell ~3 s to show at least one full shadow
 *           sweep cycle on both headings.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse at center — no hover interaction
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
  } catch (_) {}

  // Settle after mount
  try {
    await wait(300);
  } catch (_) {}

  // Dwell ~3 s to show the animated line-shadow cycling on both headings
  try {
    await wait(3000);
  } catch (_) {}

  // Return near top-center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.15, { steps: 6 });
    await wait(200);
  } catch (_) {}
}
