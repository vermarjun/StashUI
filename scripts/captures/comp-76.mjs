/**
 * Capture choreography for comp-76
 * Read-only textarea — has a muted background and existing text; clicking does not
 * allow typing.
 * Sequence: hover → click (no cursor change) → attempt type (nothing appears) →
 * move away (~3.5s). Shows the read-only state visually.
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.1, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover to show the muted/locked appearance
    await textarea.hover({ force: true });
    await page.waitForTimeout(600);

    // Click — textarea gains focus ring but is read-only
    await textarea.click({ force: true });
    await page.waitForTimeout(500);

    // Attempt to type (nothing should appear)
    await page.keyboard.type('Trying to edit...');
    await page.waitForTimeout(500);

    // Move away
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
