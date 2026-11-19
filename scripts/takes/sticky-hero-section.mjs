// sticky-hero-section — scroll so the light hero shrinks and tilts away while the dark gallery section rises over it
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(380, { secs: 1.8, hold: 300 });
  film.mark("hero");
  await film.scroll(380, { secs: 1.8, hold: 600 });
  await film.scroll(-500, { secs: 1.6, hold: 300 });
};
