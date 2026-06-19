/**
 * FlipCard: hover flips front (avatar/name) → back (bio/stats/socials); mouse
 * leave flips back. Dwell on each readable face; keep flips brief. Start and end
 * on the FRONT face so the loop seam is clean. A longer first dwell lets the
 * network avatar load before the first frame.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;
  const off = H * 0.92; // below the centered card → no hover (front stays)

  // 1. Front face — let the avatar load, hold so the profile reads.
  try {
    await page.mouse.move(cx, off, { steps: 6 });
    await wait(1700);
  } catch (_) {}

  // 2. Hover onto the card → flip to the back, dwell on bio/stats/socials.
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(1800);
  } catch (_) {}

  // 3. Move away → flip to the front, hold for a clean loop seam.
  try {
    await page.mouse.move(cx, off, { steps: 18 });
    await wait(1500);
  } catch (_) {}
}
