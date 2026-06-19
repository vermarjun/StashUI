// comp-95: Ghost avatar button — circular Avatar component + ChevronDown icon.
// hover:bg-transparent so the hover effect is very subtle (just the chevron dims change).
// Choreography: rest → hover → click → move away → hover → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    // Ghost avatar button — locate by button role; it contains an img with alt "Profile image"
    const btn = page.getByRole('button').first();
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

    // End at rest
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-95 capture error:', err);
  }
}
