// the shimmer travels the perimeter slowly: dwell long enough for a full pass
export default async (film) => {
  await film.hover("[data-rec-root] button", { hold: 2600 });
  film.mark("hero");
  await film.click(null, { hold: 1500 });
  await film.hover("[data-rec-root] button", { hold: 1600 });
};
