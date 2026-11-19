// sort the keyword table by volume, then hover the reordered rows
export default async (film) => {
  await film.click({ text: "Volume" }, { hold: 1500 });
  film.mark("hero");
  await film.hold(500);
  const rows = film.page.locator("[data-rec-root] tbody tr");
  await film.hover(rows.nth(0), { hold: 800 });
  await film.hover(rows.nth(1), { hold: 900 });
};
