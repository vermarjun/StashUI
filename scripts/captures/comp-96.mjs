// comp-96: Outline icon button — shows "+" icon always; "Add new" text is visible on sm+ screens
// and sr-only on mobile (aspect-square shrinks to icon-only). Responsive button.
// Choreography: rest → hover → click → move away → hover → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    // The button has text "Add new" (hidden on mobile via sr-only) so name may not match on small viewports
    const btn = page.getByRole('button', { name: /add new/i }).first()
      ?? page.locator('button').first();
    await btn.waitFor({ state: 'visible' });

    // Dwell away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover
    await btn.hover({ force: true });
    await page.waitForTimeout(900);

    // Click
    await btn.click({ force: true });
    await page.waitForTimeout(500);

    // Move away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 14 });
    await page.waitForTimeout(500);

    // Second hover
    await btn.hover({ force: true });
    await page.waitForTimeout(600);

    // End at rest near centre
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-96 capture error:', err);
  }
}
