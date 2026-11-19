// Glide across the invoice rows so the row hover highlight reads.
export default async (film) => {
  const rows = film.page.locator("[data-rec-root] tbody tr");
  await film.hover(rows.nth(1), { hold: 700 });
  await film.hover(rows.nth(3), { hold: 700 });
  await film.hover(rows.nth(4), { hold: 800 });
  film.mark("hero");
  await film.hold(400);
};
