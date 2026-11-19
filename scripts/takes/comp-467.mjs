// hover down the rows so the row highlight and alignment read clearly
export default async (film) => {
  const rows = film.page.locator("[data-rec-root] tbody tr");
  const n = await rows.count();
  for (let i = 0; i < Math.min(n, 3); i++) await film.hover(rows.nth(i), { hold: 700 });
  film.mark("hero");
  await film.hover(rows.nth(0), { hold: 1000 });
};
