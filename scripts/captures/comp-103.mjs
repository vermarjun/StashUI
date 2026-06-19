/**
 * Capture choreography for comp-103
 * Upvote/Downvote pill/rounded button group (solid primary) showing count "235".
 * Sequence: hover upvote → click upvote → hover downvote → click downvote → rest (~3s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const upBtn = page.getByRole('button', { name: /upvote/i });
    const downBtn = page.getByRole('button', { name: /downvote/i });

    await upBtn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover upvote
    await upBtn.hover();
    await page.waitForTimeout(500);

    // Click upvote
    await upBtn.click();
    await page.waitForTimeout(500);

    // Hover downvote
    await downBtn.hover();
    await page.waitForTimeout(500);

    // Click downvote
    await downBtn.click();
    await page.waitForTimeout(500);

    // Rest
    await page.mouse.move(cx + 120, cy - 60);
    await page.waitForTimeout(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(500);
      await page.mouse.move(cx + 120, cy - 60);
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
