// AI citations: hover along the source chips so the preview glides and the backed sentence lights up
export default async (film) => {
  const chips = film.page.locator("[data-citation-chip]");
  await film.hover(chips.nth(0), { hold: 1300 });
  film.mark("hero");
  await film.hover(chips.nth(1), { hold: 1300 });
  await film.hover(chips.nth(2), { hold: 1100 });
};
