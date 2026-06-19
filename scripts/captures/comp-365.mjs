/**
 * Capture choreography for comp-365
 * HoverCard with thumbnail image trigger — a small 64×64 image thumbnail (inside an <a>)
 * acts as the trigger. Hovering it reveals a hover card with article title, description,
 * read time, and "Updated 2 days ago". Popup hidden until hover.
 * Sequence: hover thumbnail trigger → dwell ~1.8s while article hover card is visible → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // The trigger is a thumbnail image wrapped in an <a> — locate it by alt text
    const trigger = page.locator('a').filter({ has: page.locator('img[alt="Content"]') }).first();
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Hover over the thumbnail to reveal the article hover card
    await trigger.hover();

    // Dwell while the card (title + description + meta) is visible
    await wait(1800);

    // Move mouse away to dismiss
    await page.mouse.move(cx + 140, cy + 120, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      const img = page.locator('img[alt="Content"]').first();
      await img.hover();
      await wait(1800);
      await page.mouse.move(cx + 140, cy + 120, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
