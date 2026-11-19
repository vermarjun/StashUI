// upvote twice then downvote: the number rolls and the card changes colour
export default async (film) => {
  const up = film.page.locator("[data-rec-root] button").first();
  const down = film.page.locator("[data-rec-root] button").nth(1);
  await film.click(up, { hold: 1100 });
  film.mark("hero");
  await film.click(up, { hold: 900 });
  await film.click(down, { hold: 1400 });
};
