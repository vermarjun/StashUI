// Search with loader: the search icon turns into a spinner while typing, then settles.
export default async (film) => {
  await film.type("input", "pricing", { delay: 90, hold: 0 });
  film.mark("hero");
  await film.type(null, " table", { delay: 110, hold: 1200 });
};
