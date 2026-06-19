/**
 * Capture choreography for comp-363
 * HoverCard with avatar trigger — a circular avatar image (wrapped in an <a> link)
 * is the trigger. Hovering it reveals a hover card with the @Origin_UI profile info.
 * Sequence: hover avatar trigger → dwell ~1.8s while hover-card is visible → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // The trigger is an avatar image wrapped in a button/link
    const trigger = page.getByRole('button', { name: /my profile/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Hover over the avatar trigger to show the hover card
    await trigger.hover();

    // Dwell while the hover card is visible
    await wait(1800);

    // Move mouse away to dismiss
    await page.mouse.move(cx + 140, cy + 100, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      // Fallback: hover the avatar img directly
      const img = page.locator('img[alt="Avatar"]').first();
      await img.hover();
      await wait(1800);
      await page.mouse.move(cx + 140, cy + 100, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
