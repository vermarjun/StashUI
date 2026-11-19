// Rings follow the pointer and a click bursts them outward.
export default async (film) => {
  await film.drift({ secs: 2.4 });
  await film.click({ x: film.W * 0.5, y: film.H * 0.5 }, { hold: 1500 });
  film.mark("hero");
};
