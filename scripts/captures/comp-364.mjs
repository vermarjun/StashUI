/**
 * Capture choreography for comp-364
 * HoverCard with name link trigger — the text "Keith Kennedy" is the HoverCardTrigger
 * (inside an <a> tag). Hovering the name reveals a rich profile card showing bio,
 * mutual friends stack, and handle. The popup is hidden until hover.
 * Sequence: hover name link → dwell ~1.8s while profile card is visible → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // The trigger is the "Keith Kennedy" link text
    const trigger = page.getByText('Keith Kennedy', { exact: true }).first();
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Hover over the name link to open the hover card
    await trigger.hover();

    // Dwell while the profile hover card is displayed
    await wait(1800);

    // Move mouse away to dismiss
    await page.mouse.move(cx + 140, cy + 120, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      const link = page.locator('a', { hasText: 'Keith Kennedy' }).first();
      await link.hover();
      await wait(1800);
      await page.mouse.move(cx + 140, cy + 120, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
