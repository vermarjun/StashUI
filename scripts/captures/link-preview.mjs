/**
 * Capture choreography for: link-preview
 * Component: registry/aceternity-ui/link-preview.tsx
 * Behaviour: Inline links that, on hover, spring-animate a screenshot/image
 * preview card above the hovered word via Radix HoverCard (openDelay 50 ms).
 * Uses isStatic images so the preview appears immediately without a network
 * fetch for the microlink API.
 * Choreography: hover "Next.js" link → dwell with preview card visible → move
 * off → hover "Vercel" link → dwell → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle layout
  try {
    await wait(500);
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }

  // Hover "Next.js" link — Radix HoverCard opens after 50 ms
  try {
    const nextLink = page.getByText('Next.js').first();
    const box1 = await nextLink.boundingBox({ timeout: 4000 });
    if (!box1) throw new Error('"Next.js" link not found');
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    await page.mouse.move(cx1, cy1, { steps: 16 });
    await wait(1800); // HoverCard spring animation + preview image render
  } catch (err) {
    console.error('[link-preview] Next.js hover error:', err.message);
  }

  // Move off — card should dismiss (closeDelay 100 ms)
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 12 });
    await wait(400);
  } catch { /* ignore */ }

  // Hover "Vercel" link
  try {
    const vercelLink = page.getByText('Vercel').first();
    const box2 = await vercelLink.boundingBox({ timeout: 3000 });
    if (!box2) throw new Error('"Vercel" link not found');
    const cx2 = box2.x + box2.width / 2;
    const cy2 = box2.y + box2.height / 2;
    await page.mouse.move(cx2, cy2, { steps: 14 });
    await wait(1800);
  } catch (err) {
    console.error('[link-preview] Vercel hover error:', err.message);
  }

  // Move away and rest
  try {
    await page.mouse.move(W * 0.5, H * 0.85, { steps: 12 });
    await wait(400);
  } catch { /* ignore */ }
}
