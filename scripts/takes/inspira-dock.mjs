// Glide across the dock icons so the magnification wave follows the cursor.
export default async (film) => {
  const icons = film.page.locator("[data-rec-root] [class*='aspect-square']");
  const n = await icons.count();
  for (let i = 0; i < n; i++) await film.hover(icons.nth(i), { hold: 420 });
  film.mark("hero");
  await film.hold(700);
};
