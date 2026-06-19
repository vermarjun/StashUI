/**
 * Capture choreography for: inspira-link-preview
 * Component: registry/inspira-react/link-preview.tsx
 * Behaviour: Hovering a link triggers a pop-animated preview card that appears
 * above the link (position:fixed, centred on cursor). The card uses a CSS
 * scale3d "pop" keyframe. The demo shows two links: "Vercel" (live microlink
 * screenshot) and "GitHub (static)" (local static image).
 * Choreography: hover "Vercel" link → dwell (pop animation + preview image) →
 * move off → hover "GitHub (static)" link → dwell → move away → rest.
 * Note: microlink fetch may take ~1 s; dwell is 2 s to accommodate.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle layout + allow microlink prefetch if any
  try {
    await wait(700);
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  // Hover "Vercel" link — triggers live screenshot fetch + pop animation
  try {
    const vercelLink = page.getByText('Vercel').first();
    const box1 = await vercelLink.boundingBox({ timeout: 4000 });
    if (!box1) throw new Error('"Vercel" link not found');
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    await page.mouse.move(cx1, cy1, { steps: 16 });
    await wait(2200); // pop animation (1 s) + image fetch buffer
  } catch (err) {
    console.error('[inspira-link-preview] Vercel hover error:', err.message);
  }

  // Move off — preview hides
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 12 });
    await wait(500);
  } catch { /* ignore */ }

  // Hover "GitHub (static)" link — preview appears immediately (static image)
  try {
    const githubLink = page.getByText('GitHub (static)').first();
    const box2 = await githubLink.boundingBox({ timeout: 3000 });
    if (!box2) throw new Error('"GitHub (static)" link not found');
    const cx2 = box2.x + box2.width / 2;
    const cy2 = box2.y + box2.height / 2;
    await page.mouse.move(cx2, cy2, { steps: 14 });
    await wait(2000); // pop animation fully completes
  } catch (err) {
    console.error('[inspira-link-preview] GitHub hover error:', err.message);
  }

  // Move away and rest
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 14 });
    await wait(400);
  } catch { /* ignore */ }
}
