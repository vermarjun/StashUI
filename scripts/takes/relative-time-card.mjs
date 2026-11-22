// Relative time card: hover a timestamp to reveal the same moment across time zones
export default async (film) => {
  await film.hover("[data-rec-root] li button >> nth=1", { hold: 2000 });
  film.mark("hero");
  await film.hover("[data-rec-root] li button >> nth=2", { hold: 1600 });
};
