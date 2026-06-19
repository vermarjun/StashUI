// comp-93: Outline "Print" button with printer icon and ⌘P keyboard shortcut badge.
// Highlights the kbd badge on hover. Choreography: rest → hover → click → move away → hover → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /print/i });
    await btn.waitFor({ state: 'visible' });

    // Dwell away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover — outline button background shifts
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
    console.error('comp-93 capture error:', err);
  }
}
