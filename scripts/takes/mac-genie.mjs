// Magnify along the dock and open an app from it with the genie animation.
export default async (film) => {
  const dock = film.page.locator("[data-rec-root] button");
  await dock.first().waitFor({ state: "visible", timeout: 8000 });
  await film.page.waitForFunction(() => {
    const bs = [...document.querySelectorAll("[data-rec-root] button")];
    return bs.length > 4 && bs.some((b) => !b.disabled);
  }, { timeout: 8000 }).catch(() => {});
  const n = await dock.count();
  await film.hover(dock.nth(n - 5), { hold: 800 });
  await film.click(dock.nth(n - 4), { hold: 2000 });
  film.mark("hero");
  await film.hold(1600);
};
