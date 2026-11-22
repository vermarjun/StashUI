// apple-activity-card — rings count up, then hovering each stat spotlights its ring
export default async (film) => {
  await film.hold(900);
  film.mark("hero");
  const rows = film.page.locator("[data-rec-root] li");
  await film.hover(rows.filter({ hasText: "MOVE" }).first(), { hold: 1000 });
  await film.hover(rows.filter({ hasText: "EXERCISE" }).first(), { hold: 1000 });
  await film.hover(rows.filter({ hasText: "STAND" }).first(), { hold: 1000 });
};
