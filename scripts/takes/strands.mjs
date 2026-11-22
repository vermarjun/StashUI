// Strands: the orb listens and swells; a click sends a pulse through the strands
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.45 }, { secs: 0.8 });
  await film.hold(1200);
  await film.click(null, { hold: 900 });
  film.mark("hero");
  await film.drift({ secs: 2.6, rx: 120, ry: 70 });
};
