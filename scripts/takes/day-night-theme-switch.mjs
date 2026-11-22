// day-night-theme-switch — flip to night (moon, stars rise) and back to day (sun, clouds return)
export default async (film) => {
  await film.click("[data-rec-root] .dnts__container", { hold: 1400 });
  film.mark("hero");
  await film.click("[data-rec-root] .dnts__container", { hold: 1300 });
};
