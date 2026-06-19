// ui-layouts-spotlight: a Spotlight + SpotlightItem card grid. The spotlight
// uses a fixed radial gradient that tracks the global mouse position
// (ProximitySpotlight) and an overlay gradient local to each hovered card
// (CursorFlowGradient). Move mouse slowly across the card grid.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let the component mount and event listeners attach.
  try { await wait(500); } catch (_) {}

  // Start from the left edge of the cards.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.45), { steps: 10 });
  } catch (_) {}
  try { await wait(300); } catch (_) {}

  // Sweep slowly right across the card row so the fixed radial gradient
  // tracks and the per-card overlay fires on each card.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.45), { steps: 60 });
  } catch (_) {}
  try { await wait(600); } catch (_) {}

  // Drift slightly downward and back left to cover the lower row.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.58), { steps: 50 });
  } catch (_) {}
  try { await wait(600); } catch (_) {}

  // Park near center for a clean end frame.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
  } catch (_) {}
  try { await wait(400); } catch (_) {}
}
