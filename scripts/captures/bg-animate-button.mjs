// bg-animate-button: conic-gradient spins continuously inside the button.
// Dwell long to show the rotating gradient, then hover and click.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let spinning gradient animate visibly
  await wait(1200);

  // Hover the button
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 16 });
  } catch (_) {}

  // Hover dwell — show shadow lift on hover
  await wait(1600);

  // Click to show active/press state
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}

  // Brief dwell on hover after click
  await wait(900);

  // Move away
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}

  // Resting dwell — gradient still spinning
  await wait(800);
}
