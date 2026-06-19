/**
 * Choreography: ChromaGrid-TS-TW
 * Behavior: 6 gradient profile cards laid out in a wrapping grid; a radial
 *   chroma spotlight (grayscale mask) follows the cursor, revealing color under
 *   the spotlight and desaturating surrounding cards.
 * Strategy: move mouse from top-left to bottom-right diagonally across the
 *   grid, dwell on individual cards so the spotlight effect is clearly visible,
 *   then return to the starting region.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Grid is roughly 2 rows × 3 cols of 300px cards with gap-3,
  // centered in the preview. Approximate card centers (relative to W,H):
  // Row 1: y ≈ cy - 160; Row 2: y ≈ cy + 60
  // Cols: x ≈ cx - 310, cx, cx + 310 (approx for 3 cards × 300px + gap)
  const row1Y = Math.round(cy - 130);
  const row2Y = Math.round(cy + 100);
  const col1X = Math.round(cx - 310);
  const col2X = cx;
  const col3X = Math.round(cx + 310);

  try {
    // 1. Settle and capture default state (fade overlay at full opacity)
    await page.waitForTimeout(500);
    await screenshot('chromagrid-default');

    // 2. Enter grid – top-left card
    await page.mouse.move(col1X, row1Y, { steps: 15 });
    await page.waitForTimeout(500);
    await screenshot('chromagrid-card1');

    // 3. Sweep to top-center card
    await page.mouse.move(col2X, row1Y, { steps: 18 });
    await page.waitForTimeout(450);
    await screenshot('chromagrid-card2');

    // 4. Sweep to top-right card
    await page.mouse.move(col3X, row1Y, { steps: 18 });
    await page.waitForTimeout(450);

    // 5. Drop to bottom-right card
    await page.mouse.move(col3X, row2Y, { steps: 12 });
    await page.waitForTimeout(450);
    await screenshot('chromagrid-card6');

    // 6. Sweep diagonally back toward top-left (spotlight sweeps across grid)
    await page.mouse.move(col1X, row2Y, { steps: 20 });
    await page.waitForTimeout(350);
    await screenshot('chromagrid-sweep-done');

    // 7. Return to approximate start
    await page.mouse.move(col1X, row1Y, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.warn('[ChromaGrid choreograph]', err?.message ?? err);
  }
}
