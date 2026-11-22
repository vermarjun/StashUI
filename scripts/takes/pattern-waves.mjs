// Halftone silk surface; the cursor presses into the folds.
export default async (film) => {
  await film.drift({ secs: 3 });
  film.mark("hero");
  await film.drift({ secs: 2 });
};
