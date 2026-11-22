// WebGL lens that bends and refracts the text around the pointer.
export default async (film) => {
  await film.drift({ secs: 3, cy: film.H * 0.5, rx: film.W * 0.32, ry: film.H * 0.12 });
  film.mark("hero");
  await film.click(null, { hold: 1000 });
  await film.drift({ secs: 1.6, cy: film.H * 0.5, rx: film.W * 0.32, ry: film.H * 0.12 });
};
