// timer: the demo renders <Timer /> with no controls; loading defaults to
// false so the clock sits still. Click the Start button (added in the fixed
// demo) to start the stopwatch, watch it count up for ~3 s, then Pause.
export default async function capture(page, { wait }) {
  // Let the component mount
  await wait(500);

  // Click Start to engage loading=true → clock icon spins, digits tick
  try {
    await page.getByRole('button', { name: /start/i }).click();
  } catch (_) {}
  await wait(3000);

  // Click Pause/Stop to freeze the display
  try {
    await page.getByRole('button', { name: /pause|stop/i }).click();
  } catch (_) {}
  await wait(600);

  // Reset back to 00.00 so the loop starts clean
  try {
    await page.getByRole('button', { name: /reset/i }).click();
  } catch (_) {}
  await wait(400);
}
