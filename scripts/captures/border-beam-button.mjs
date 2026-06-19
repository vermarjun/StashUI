// border-beam-button: beam orbits the button perimeter continuously.
// Hover to trigger any hover effects, click to show active state, settle back.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let the beam orbit establish
  await wait(1000);

  // Move to the button
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 16 });
  } catch (_) {}

  // Hover dwell — beam should be clearly visible orbiting the button
  await wait(1800);

  // Click the button to show active/press state
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(200);
  try {
    await page.mouse.up();
  } catch (_) {}

  // Post-click dwell on hover
  await wait(1200);

  // Move away to resting state
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 14 });
  } catch (_) {}

  // Resting dwell so loop seam is on idle beaming state
  await wait(700);
}
