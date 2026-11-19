// Phone input: search the country list for the UK, pick it, then type a number
export default async (film) => {
  const z = await film.page.evaluate(() => window.__recZoom || 1);
  await film.click("[data-rec-root] button", { hold: 900 });
  // CSS page zoom double-scales Radix poppers; pin it back under the trigger
  await film.page.evaluate((zoom) => {
    const wrap = document.querySelector("[data-radix-popper-content-wrapper]");
    const btn = document.querySelector("[data-rec-root] button");
    if (!wrap || !btn || zoom === 1) return;
    const r = btn.getBoundingClientRect();
    wrap.style.zoom = String(1 / zoom);
    wrap.style.transform = `translate(${r.left}px, ${r.bottom + 6}px)`;
  }, z);
  await film.hold(400);
  await film.type('input[placeholder="Search country..."]', "United Kingdom", { delay: 45, hold: 500 });
  await film.click({ role: "option", name: /United Kingdom/ }, { hold: 900 });
  await film.type('input[type="tel"]', "7400123456", { hold: 900 });
  film.mark("hero");
};
