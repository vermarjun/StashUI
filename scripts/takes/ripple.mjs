// ripple — pulsing rings; a slow camera push-in plus a cursor pass across both panels.
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ x: film.W * 0.32, y: film.H * 0.5 }, { hold: 1200 });
  await film.glide({ x: film.W * 0.68, y: film.H * 0.5 }, { secs: 1.1 });
  film.mark("hero");
  await film.hover({ x: film.W * 0.68, y: film.H * 0.5 }, { hold: 1200 });
};
