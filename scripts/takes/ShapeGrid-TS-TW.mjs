// ShapeGrid — the grid scrolls diagonally; cells fill violet under the pointer and leave a trail.
export default async (film) => {
  await film.drift({ secs: 3.2, rx: film.W * 0.3, ry: film.H * 0.25 });
  film.mark("hero");
  await film.drift({ secs: 1.8, rx: film.W * 0.3, ry: film.H * 0.25 });
};
