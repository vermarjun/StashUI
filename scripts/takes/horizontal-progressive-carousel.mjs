// jump to the third slide, then back to the first so the loop closes cleanly
export default async (film) => {
  const bars = film.page.locator("[data-rec-root] button");
  await film.click(bars.nth(2), { hold: 1100 });
  film.mark("hero");
  await film.click(bars.nth(0), { hold: 700 });
};
