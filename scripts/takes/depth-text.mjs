// Extruded type with pointer parallax: wander across it so the layers shift.
export default async (film) => {
  await film.drift({ secs: 3, rx: film.W * 0.3, ry: film.H * 0.25 });
  film.mark("hero");
  await film.drift({ secs: 2, rx: film.W * 0.3, ry: film.H * 0.25 });
};
