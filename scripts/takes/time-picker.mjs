// smart time input: types a natural-language time and commits it
export default async (film) => {
  await film.type(film.page.locator("[data-rec-root] input[type=text]").first(), "3:30pm", { hold: 400 });
  await film.press("Enter", { hold: 1600 });
  film.mark("hero");
};
