// Pixel field ripples where the pointer moves and clicks.
export default async (film) => {
  await film.drift({ secs: 2.2 });
  await film.click({ x: film.W * 0.4, y: film.H * 0.45 }, { hold: 1000 });
  film.mark("hero");
  await film.click({ x: film.W * 0.6, y: film.H * 0.58 }, { hold: 1100 });
};
