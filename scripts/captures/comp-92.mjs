// comp-92: Outline "Messages" button with an inline badge showing count "18".
// No special animation — shows hover state. Choreography: rest → hover → click → rest → hover → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /messages/i });
    await btn.waitFor({ state: 'visible' });

    // Start away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover to reveal outline hover state
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

    // End resting
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-92 capture error:', err);
  }
}
