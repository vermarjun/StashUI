// score the NPS scale: pick 6, change mind to 9, settle on 10
export default async (film) => {
  const score = (n) => film.page.locator("[data-rec-root] label").nth(n);
  await film.click(score(6), { hold: 1000 });
  await film.click(score(9), { hold: 1100 });
  film.mark("hero");
  await film.click(score(10), { hold: 1200 });
};
