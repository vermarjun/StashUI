export default async function capture(page, { W, H, cfg, wait }) {
  // Let the orange-background section and images settle
  await wait(700);

  // Component is a hover-driven floating image gallery: mousing over each row
  // shows a spring-animated preview image that follows the cursor.
  // Sweep across the list rows to trigger the floating image for each entry.

  const rowCount = 8;
  const listTop = H * 0.25;   // approximate top of the row list (below the EXPERIENCE heading)
  const listBottom = H * 0.92;
  const rowHeight = (listBottom - listTop) / rowCount;

  // Move into the container from outside so the first hover fires
  try {
    await page.mouse.move(W * 0.5, listTop - 20, { steps: 6 });
  } catch (_) {}
  await wait(200);

  // Sweep down across rows, pausing briefly on each to let the spring settle
  for (let i = 0; i < rowCount; i++) {
    const y = listTop + rowHeight * i + rowHeight * 0.5;
    const x = W * 0.3 + (i % 2) * W * 0.25; // slight lateral variation
    try {
      await page.mouse.move(x, y, { steps: 10 });
    } catch (_) {}
    await wait(300);
  }

  // Dwell on last row
  await wait(400);

  // Move back to first row to show spring bounce on return
  try {
    await page.mouse.move(W * 0.4, listTop + rowHeight * 0.5, { steps: 18 });
  } catch (_) {}
  await wait(500);

  // Move mouse off the component so the floating image fades out cleanly
  try {
    await page.mouse.move(W * 0.5, H * 0.05, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
