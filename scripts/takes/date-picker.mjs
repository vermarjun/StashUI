// smart date input: types a natural-language date and commits it
export default async (film) => {
  await film.type(film.page.locator("[data-rec-root] input[type=text]").first(), "next friday", { hold: 400 });
  await film.press("Enter", { hold: 1600 });
  film.mark("hero");
};
