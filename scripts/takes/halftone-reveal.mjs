// Halftone print whose dots swell into the real photo under the cursor.
export default async (film) => {
  await film.drift({ secs: 3, cx: film.W * 0.5, cy: film.H * 0.45 });
  film.mark("hero");
  await film.drift({ secs: 2.2, cx: film.W * 0.5, cy: film.H * 0.45 });
};
