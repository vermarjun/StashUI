// Follow button: follow a creator (pill morphs, check draws), then hover a followed pill to preview Unfollow
export default async (film) => {
  const rows = film.page.locator("[data-rec-root] li");
  await film.click(rows.nth(0).getByRole("button"), { hold: 1200 });
  film.mark("hero");
  await film.hover(rows.nth(1).getByRole("button"), { hold: 1300 });
  await film.click(rows.nth(2).getByRole("button"), { hold: 1100 });
};
