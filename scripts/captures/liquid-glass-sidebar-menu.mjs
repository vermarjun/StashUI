/**
 * Choreography for: liquid-glass-sidebar-menu
 * Component: registry/ui-layouts/sidebar-menu.tsx
 * Demo:      registry/ui-layouts/sidebar-menu.demo.tsx
 *
 * The component renders a LiquidGlassCard containing 5 navigation buttons:
 *   Dashboard (active), Search, Sales Analytics, Notification, Account Settings
 *
 * The card is draggable; buttons have hover:bg-white/20 transitions.
 *
 * Layout (~1100×688):
 *   The sidebar card is centred ~x=W*0.5-140 to W*0.5+140, y=H*0.5-~170 to H*0.5+~170
 *   Button approximate y positions (relative to card top ~y=H*0.18):
 *     Dashboard      ~y = H * 0.30
 *     Search         ~y = H * 0.39
 *     Sales Analytics ~y = H * 0.48
 *     Notification   ~y = H * 0.57
 *     Account Settings ~y = H * 0.66
 *
 * Interaction: hover each button in turn, then click "Sales Analytics" and
 * "Notification", finishing back near Dashboard.
 */

export default async function choreography(page, { W, H }) {
  const CX = Math.round(W * 0.5); // card horizontal centre

  // ── 1. Wait for the sidebar card to render ───────────────────────────────
  try {
    await page.waitForSelector("nav", { timeout: 8000 });
  } catch (e) {
    console.warn("liquid-glass-sidebar-menu: nav not found", e.message);
  }

  // ── 2. Dwell on initial state ────────────────────────────────────────────
  await page.waitForTimeout(700);

  // ── 3. Hover "Search" button ─────────────────────────────────────────────
  try {
    await page.getByRole("button", { name: /Search/i }).hover();
  } catch (e) {
    try {
      await page.mouse.move(CX, Math.round(H * 0.39));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: hover Search failed", e2.message);
    }
  }
  await page.waitForTimeout(500);

  // ── 4. Hover "Sales Analytics" button ───────────────────────────────────
  try {
    await page.getByRole("button", { name: /Sales Analytics/i }).hover();
  } catch (e) {
    try {
      await page.mouse.move(CX, Math.round(H * 0.48));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: hover Sales Analytics failed", e2.message);
    }
  }
  await page.waitForTimeout(400);

  // ── 5. Click "Sales Analytics" ──────────────────────────────────────────
  try {
    await page.getByRole("button", { name: /Sales Analytics/i }).click();
  } catch (e) {
    try {
      await page.mouse.click(CX, Math.round(H * 0.48));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: click Sales Analytics failed", e2.message);
    }
  }
  await page.waitForTimeout(500);

  // ── 6. Hover "Notification" button ──────────────────────────────────────
  try {
    await page.getByRole("button", { name: /Notification/i }).hover();
  } catch (e) {
    try {
      await page.mouse.move(CX, Math.round(H * 0.57));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: hover Notification failed", e2.message);
    }
  }
  await page.waitForTimeout(400);

  // ── 7. Click "Notification" ─────────────────────────────────────────────
  try {
    await page.getByRole("button", { name: /Notification/i }).click();
  } catch (e) {
    try {
      await page.mouse.click(CX, Math.round(H * 0.57));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: click Notification failed", e2.message);
    }
  }
  await page.waitForTimeout(500);

  // ── 8. Return hover to "Dashboard" (end near start) ─────────────────────
  try {
    await page.getByRole("button", { name: /Dashboard/i }).hover();
  } catch (e) {
    try {
      await page.mouse.move(CX, Math.round(H * 0.30));
    } catch (e2) {
      console.warn("liquid-glass-sidebar-menu: hover Dashboard failed", e2.message);
    }
  }
  await page.waitForTimeout(600);
}
