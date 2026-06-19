export default async function capture(page, { W, H, cfg, wait }) {
  // Let the component mount and fonts settle
  await wait(700);

  // Locate the scroll area viewport by its data-slot attribute
  // The Radix ScrollArea.Viewport is the actual scrollable element
  let cx = W / 2;
  let cy = H / 2;

  try {
    const viewport = page.locator('[data-slot="scroll-area-viewport"]').first();
    const box = await viewport.boundingBox();
    if (box) {
      cx = box.x + box.width / 2;
      cy = box.y + box.height / 2;
    }
  } catch (_) {}

  // Move mouse to center of scroll area — this triggers scrollbar visibility
  // on hover (Radix shows it on pointer entry)
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
  } catch (_) {}
  await wait(400);

  // Scroll DOWN in steps — scrollbar thumb should appear and move downward
  const delta = 120;
  const steps = 5;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, delta);
    } catch (_) {}
    await wait(320);
  }

  // Dwell at bottom so scrollbar thumb resting position is visible
  await wait(600);

  // Scroll back UP to top — thumb animates back up, loop seam is clean
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, -delta);
    } catch (_) {}
    await wait(280);
  }

  // Settle at top
  await wait(500);
}
