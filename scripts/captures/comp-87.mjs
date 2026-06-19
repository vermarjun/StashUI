// comp-87: Secondary "Email" button with mail icon on left and animated arrow on right.
// Arrow translates 0.5 units right on hover via group-hover:translate-x-0.5 transition.
// Choreography: rest → hover (arrow slides right) → move away → rest → hover again → click → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /email/i });
    await btn.waitFor({ state: 'visible' });

    // Start away from button
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // First hover — arrow nudges right
    await btn.hover({ force: true });
    await page.waitForTimeout(900);

    // Move away — arrow resets
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 14 });
    await page.waitForTimeout(500);

    // Second hover
    await btn.hover({ force: true });
    await page.waitForTimeout(700);

    // Click
    await btn.click({ force: true });
    await page.waitForTimeout(500);

    // End at rest near centre
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-87 capture error:', err);
  }
}
