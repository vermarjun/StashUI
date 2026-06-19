// Default capture choreography, used when a component has no bespoke
// scripts/captures/<name>.mjs. Page-like components (scroll:true) get a slow
// scroll-through; self-contained widgets get a gentle hover dwell.
//
// A per-component script is just `export default async (page, ctx) => {...}`
// where ctx = { W, H, cfg, wait }.  Keep total motion ~3–5s of real time;
// the runner speeds it up and loops it.

export default async function capture(page, { W, H, cfg, wait }) {
  if (cfg.scroll) {
    await wait(500);
    const steps = 7;
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, Math.round(H * 0.7));
      await wait(450);
    }
    await wait(400);
    // ease back to the top so the loop seam is clean
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await wait(700);
  } else {
    await wait(500);
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await wait(2600);
  }
}
