// components-community-share-button: on hover the label slides out and three
// social icons (GitHub, X, Facebook) slide up with spring bounce.
// Hover in → dwell on icons → hover off → dwell on label → repeat once.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — show the default "Share" label state
  await wait(700);

  // Move onto the button — icons animate in
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 16 });
  } catch (_) {}

  // Dwell on hover — all three social icons visible with spring bounce
  await wait(2000);

  // Move away — label slides back in
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 14 });
  } catch (_) {}

  // Dwell on resting label state — clean loop seam
  await wait(900);
}
