// comp-94: Rounded-full pill button with avatar image on left + "@georgelucas" username text.
// Social/profile pill shape. Choreography: rest → hover → click → move away → hover → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    // Locate by partial username text since role=button may not include image alt
    const btn = page.getByRole('button', { name: /@georgelucas/i });
    await btn.waitFor({ state: 'visible' });

    // Dwell away from button
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover — pill background shifts subtly
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

    // End resting at centre
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-94 capture error:', err);
  }
}
