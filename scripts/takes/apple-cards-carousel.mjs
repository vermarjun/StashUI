// apple-cards-carousel — scroll the track forward twice, open a card, then return
export default async (film) => {
  const arrows = film.page.locator("[data-rec-root] div.mr-10.flex.justify-end button");
  await film.click(arrows.nth(1), { hold: 900 });
  await film.click(arrows.nth(1), { hold: 1000 });
  film.mark("hero");
  await film.click(film.page.getByText("Deep Blue Horizon", { exact: true }).first(), { hold: 1500 });
  await film.press("Escape", { hold: 900 });
  await film.click(arrows.nth(0), { hold: 800 });
  await film.click(arrows.nth(0), { hold: 900 });
};
