export default async function capture(page, { W, H, cfg, wait }) {
  // direction-aware-hover is mouse-driven; no scroll.
  // Hover in from each of the four edges so the overlay slides in
  // from the matching direction (top/right/bottom/left).
  await wait(500);

  // Card is centred in the preview; approximate its bounding box.
  // At desktop 1200×750, the card is md:h-96 md:w-96 → ~384×384px centred.
  const cx = W / 2;
  const cy = H / 2;
  const half = 180; // ~half the card size at md breakpoint

  // --- Enter from TOP ---
  try {
    // Start above the card, then move into it
    await page.mouse.move(cx, cy - half - 20, { steps: 10 });
    await page.mouse.move(cx, cy - half + 20, { steps: 8 });
  } catch (_) {}
  await wait(500);

  // Move away to reset
  try {
    await page.mouse.move(cx, cy - half - 40, { steps: 8 });
  } catch (_) {}
  await wait(300);

  // --- Enter from RIGHT ---
  try {
    await page.mouse.move(cx + half + 20, cy, { steps: 10 });
    await page.mouse.move(cx + half - 20, cy, { steps: 8 });
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.move(cx + half + 40, cy, { steps: 8 });
  } catch (_) {}
  await wait(300);

  // --- Enter from BOTTOM ---
  try {
    await page.mouse.move(cx, cy + half + 20, { steps: 10 });
    await page.mouse.move(cx, cy + half - 20, { steps: 8 });
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.move(cx, cy + half + 40, { steps: 8 });
  } catch (_) {}
  await wait(300);

  // --- Enter from LEFT ---
  try {
    await page.mouse.move(cx - half - 20, cy, { steps: 10 });
    await page.mouse.move(cx - half + 20, cy, { steps: 8 });
  } catch (_) {}
  await wait(500);

  // Park the mouse off the card to let the overlay exit cleanly
  try {
    await page.mouse.move(cx - half - 40, cy, { steps: 8 });
  } catch (_) {}
  await wait(400);
}
