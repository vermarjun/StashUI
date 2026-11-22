// synced-transcript — play, watch the highlight follow the words, then click a later word to seek
export default async (film) => {
  await film.click({ role: "button", name: /^Play$/ }, { hold: 2200 });
  film.mark("hero");
  const word = film.page.locator("[data-index]").nth(40);
  await film.click(word, { hold: 1800 });
};
