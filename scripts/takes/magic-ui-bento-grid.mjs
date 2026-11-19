// magic-ui-bento-grid: hover tiles so the copy lifts, the background art reacts and the CTA link slides up
export default async (film) => {
  await film.hover(film.page.getByText("Save your files", { exact: true }).first(), { hold: 1300 });
  film.mark("hero");
  await film.hover(film.page.getByText("Notifications", { exact: true }).first(), { hold: 1300 });
  await film.hover(film.page.getByText("Full text search", { exact: true }).first(), { hold: 1200 });
};
