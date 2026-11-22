// Sliced light bars; the depth-of-field focus follows the cursor.
export default async (film) => {
  await film.drift({ secs: 3 });
  film.mark("hero");
  await film.drift({ secs: 2 });
};
