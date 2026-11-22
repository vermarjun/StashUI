// Ripple Distortion: drag a wake across the photo, then drop a click ripple
export default async (film) => {
  await film.drift({ secs: 3.0, rx: 300, ry: 140 });
  film.mark("hero");
  await film.click({ x: film.W * 0.5, y: film.H * 0.45 }, { hold: 1400 });
};
