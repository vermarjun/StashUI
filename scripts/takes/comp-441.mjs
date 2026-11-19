// hover the vertical icon tabs to reveal their tooltips, then open Packages
export default async (film) => {
  await film.hover("[data-rec-root] [role=tab] >> nth=1", { hold: 1400 });
  film.mark("hero");
  await film.click("[data-rec-root] [role=tab] >> nth=2", { hold: 1500 });
};
