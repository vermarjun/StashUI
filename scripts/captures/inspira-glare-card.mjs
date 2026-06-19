/**
 * Capture choreography for inspira-glare-card.
 *
 * The GlareCard responds to pointer events: onPointerMove rotates the card in
 * 3D and reveals a holographic rainbow + glare overlay. onPointerLeave resets.
 * The demo renders a single 320×(320*21/17) aspect-ratio card on a dark bg.
 * Strategy: enter the card → sweep diagonals and edges so the glare/rainbow
 * sweeps visibly across the surface → finish centre and leave so card resets.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(700);

  // The card outer element has [perspective:600px] and aspect-[17/21]
  let box;
  try {
    const card = page.locator("[style*='perspective:600px']").first();
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = null;
  }

  if (!box) {
    // Fallback estimate: card is ~320px wide, centred
    const cw = 320;
    const ch = Math.round(cw * 21 / 17);
    box = { x: W / 2 - cw / 2, y: H / 2 - ch / 2, width: cw, height: ch };
  }

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const left = box.x + 6;
  const right = box.x + box.width - 6;
  const top = box.y + 6;
  const bottom = box.y + box.height - 6;

  // --- Enter: pointer enter triggers the 300 ms duration timer ---
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.dispatchEvent("[style*='perspective:600px']", "pointerenter").catch(() => {});
    await wait(400);
  } catch {
    // continue
  }

  // --- Sweep top-left corner to bottom-right ---
  try {
    await page.mouse.move(left, top, { steps: 16 });
    await wait(200);
    await page.mouse.move(right, bottom, { steps: 32 });
    await wait(250);
  } catch {
    // continue
  }

  // --- Sweep top-right to bottom-left ---
  try {
    await page.mouse.move(right, top, { steps: 20 });
    await wait(200);
    await page.mouse.move(left, bottom, { steps: 30 });
    await wait(250);
  } catch {
    // continue
  }

  // --- Horizontal sweep mid-card to show glare travelling left→right ---
  try {
    await page.mouse.move(left, cy, { steps: 16 });
    await wait(150);
    await page.mouse.move(right, cy, { steps: 32 });
    await wait(250);
  } catch {
    // continue
  }

  // --- Slow sweep right→left for the return pass ---
  try {
    await page.mouse.move(cx, cy - box.height * 0.25, { steps: 18 });
    await wait(200);
    await page.mouse.move(cx, cy + box.height * 0.25, { steps: 22 });
    await wait(200);
  } catch {
    // continue
  }

  // --- Leave — card resets tilt and glare fades ---
  try {
    await page.mouse.move(W * 0.02, H * 0.02, { steps: 18 });
    await page.dispatchEvent("[style*='perspective:600px']", "pointerleave").catch(() => {});
  } catch {
    // continue
  }

  await wait(600);
}
