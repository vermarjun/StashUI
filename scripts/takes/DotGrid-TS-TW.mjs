// Dots light up near the pointer, then clicks send shockwaves outward.
export default async (film) => {
  await film.drift({ secs: 2.2 });
  film.mark("hero");
  await film.click({ x: film.W * 0.42, y: film.H * 0.55 }, { hold: 1400 });
  await film.click({ x: film.W * 0.62, y: film.H * 0.42 }, { hold: 1000 });
};
