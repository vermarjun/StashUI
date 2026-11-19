// Sweep the hero heading, then hover its call to action.
export default async (film) => {
  await film.hold(1200);
  await film.glide({ x: film.W * 0.32, y: film.H * 0.4 }, { secs: 0.8 });
  await film.mark("hero");
  await film.hold(600);
  await film.glide({ x: film.W * 0.7, y: film.H * 0.5 }, { secs: 0.9 });
  await film.hover({ role: "link", name: /check it out/i }, { hold: 1200 });
};
