// tailed-cursor — slow figure-8 over the canvas so the ribbon trail stays lit
export default async (film) => {
  await film.drift({ secs: 3.2, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.29, ry: film.H * 0.19 });
  film.mark("hero");
  await film.drift({ secs: 2.6, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.29, ry: film.H * 0.19 });
};
