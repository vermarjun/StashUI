// letters shuffle in on mount, then hovering replays the shuffle
export default async (film) => {
  await film.hover({ text: "SHUFFLE" }, { hold: 1700 });
  await film.glide({ x: film.W * 0.82, y: film.H * 0.2 }, { secs: 0.6 });
  await film.hover({ text: "SHUFFLE" }, { hold: 1500 });
  film.mark("hero");
};
