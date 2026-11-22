// category-bar — the marker glides between ranges; hover it to show its tooltip
export default async (film) => {
  await film.hold(1600);
  const marker = film.page.locator('[data-rec-root] [aria-label="Category bar"]').last().locator(".ring-2");
  await film.hover(marker, { hold: 1600 });
  film.mark("hero");
  await film.hold(1200);
};
