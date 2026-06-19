export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the folder widget (the clickable root div)
  const folder = page.locator('.cursor-pointer').first();

  // Centre of the viewport where the folder sits
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // -- Pass 1: hover so papers peek up, then click to open --
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(600); // papers lift on hover
  } catch (_) {}

  try {
    await folder.click();
    await wait(700); // papers fan out
  } catch (_) {}

  // Nudge mouse over one of the fanned papers so the parallax offset shows
  try {
    await page.mouse.move(cx - 60, cy - 80, { steps: 10 });
    await wait(400);
    await page.mouse.move(cx + 40, cy - 90, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // -- Click again to close --
  try {
    await folder.click();
    await wait(600); // folder snaps shut
  } catch (_) {}

  // -- Pass 2: hover → open → close (loop repeat) --
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
    await folder.click();
    await wait(700);
  } catch (_) {}

  try {
    await page.mouse.move(cx - 50, cy - 70, { steps: 8 });
    await wait(300);
    await page.mouse.move(cx + 30, cy - 80, { steps: 8 });
    await wait(300);
  } catch (_) {}

  try {
    await folder.click();
    await wait(600);
  } catch (_) {}

  // Return mouse to centre so the clip ends near the start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(200);
  } catch (_) {}
}
