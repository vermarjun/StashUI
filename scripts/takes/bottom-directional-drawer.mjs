// open the bottom drawer and show the profile upload
export default async (film) => {
  await film.hover("[data-rec-root] button", { hold: 1500 });
  await film.click("[data-rec-root] button", { hold: 1600 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
