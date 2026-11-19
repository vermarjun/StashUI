// feature-voting — upvoting a feature and watching the count tick up
export default async (film) => {
  const vote = film.page.locator("[data-rec-root] button[aria-label='Vote for feature']").first();
  await film.click(vote, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "API Integrations" }, { hold: 1100 });
  await film.click(film.page.locator("[data-rec-root] button[aria-label='Remove vote for feature']").first(), { hold: 1300 });
};
