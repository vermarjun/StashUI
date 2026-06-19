/**
 * Choreography: TargetCursor-TS-TW
 * Behavior: a spinning target reticle follows the cursor and snaps its corners
 *   around .cursor-target elements on hover.
 * Strategy: move from center outward to each of three target buttons in sequence,
 *   dwell on each so the reticle snaps, then return near start.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  // Demo renders three buttons in a horizontal row centered in the viewport.
  // Approximate positions (the buttons are in a gap-8 flex row at vertical center).
  const cy = Math.round(H / 2);
  const buttonY = cy + 40; // buttons sit slightly below center due to flex layout
  const button1X = Math.round(W / 2) - 180;
  const button2X = Math.round(W / 2);
  const button3X = Math.round(W / 2) + 180;

  try {
    // 1. Settle – let cursor initialize at viewport center
    await page.waitForTimeout(400);

    // 2. Start at center
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2));
    await page.waitForTimeout(300);

    // 3. Move to button 1 – reticle snaps its corners around it
    await page.mouse.move(button1X, buttonY, { steps: 18 });
    await page.waitForTimeout(700);
    await screenshot('snap-button-1');

    // 4. Slide to button 2
    await page.mouse.move(button2X, buttonY, { steps: 18 });
    await page.waitForTimeout(700);
    await screenshot('snap-button-2');

    // 5. Slide to button 3
    await page.mouse.move(button3X, buttonY, { steps: 18 });
    await page.waitForTimeout(700);
    await screenshot('snap-button-3');

    // 6. Return toward center (reticle resumes spinning)
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 15 });
    await page.waitForTimeout(400);
  } catch (err) {
    console.warn('[TargetCursor choreograph]', err?.message ?? err);
  }
}
