// open the top drawer and show the profile upload
export default async (film) => {
  await film.hover("[data-rec-root] button", { hold: 1500 });
  await film.click("[data-rec-root] button", { hold: 1600 });
  await film.hover("input[type=file]", { hold: 700 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
