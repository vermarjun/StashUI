// Web Threads: cursor lights up the pinch points, a click sends light along the threads
export default async (film) => {
  await film.drift({ secs: 2.6, rx: 280, ry: 120 });
  await film.click({ x: film.W * 0.5, y: film.H * 0.55 }, { hold: 1200 });
  film.mark("hero");
  await film.drift({ secs: 1.8, rx: 200, ry: 90 });
};
