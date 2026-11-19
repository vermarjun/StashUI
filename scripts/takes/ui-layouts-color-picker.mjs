// Color picker popover: open it, drag the saturation field, then change the hue
export default async (film) => {
  const z = await film.page.evaluate(() => window.__recZoom || 1);
  await film.click({ role: "button", name: /pick a color/i }, { hold: 800 });
  // CSS page zoom double-scales Radix poppers; pin it back under the trigger
  await film.page.evaluate((zoom) => {
    const wrap = document.querySelector("[data-radix-popper-content-wrapper]");
    const btn = document.querySelector("[data-rec-root] button");
    if (!wrap || !btn || zoom === 1) return;
    const r = btn.getBoundingClientRect();
    wrap.style.zoom = String(1 / zoom);
    wrap.style.transform = `translate(${r.left - 40}px, ${r.bottom + 6}px)`;
  }, z);
  await film.hold(400);
  const sat = await film.page.locator(".react-colorful__saturation").boundingBox();
  await film.glide({ x: sat.x + sat.width * 0.15, y: sat.y + sat.height * 0.25 }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: sat.x + sat.width * 0.8, y: sat.y + sat.height * 0.3 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(500);
  const hue = await film.page.locator(".react-colorful__hue").boundingBox();
  await film.glide({ x: hue.x + hue.width * 0.85, y: hue.y + hue.height / 2 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.page.mouse.up();
  await film.hold(700);
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
};
