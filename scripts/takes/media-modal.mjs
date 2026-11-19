// zoom the photo into the media modal, then close it
export default async (film) => {
  await film.hover("[data-rec-root] img", { hold: 1500 });
  await film.click("[data-rec-root] img", { hold: 1700 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
