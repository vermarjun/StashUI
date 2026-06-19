// comp-91: Interactive "Click me" button — click triggers a 1-second loading spinner,
// then text returns. Stateful: text hidden while loading, spinner overlaid.
// Choreography: hover → click (text vanishes, spinner appears) → wait for reset → hover again → rest.
// Total ~3.5s.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /click me/i });
    await btn.waitFor({ state: 'visible' });

    // Start away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover button
    await btn.hover({ force: true });
    await page.waitForTimeout(600);

    // Click to trigger loading state (text hides, spinner shows)
    await btn.click({ force: true });
    await page.waitForTimeout(200);

    // Hold on spinner for ~1.2s (component resets after 1s)
    await page.waitForTimeout(1300);

    // Button has reset; hover again to show idle hover state
    await btn.hover({ force: true });
    await page.waitForTimeout(600);

    // End resting near centre
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-91 capture error:', err);
  }
}
