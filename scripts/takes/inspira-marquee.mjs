// hover a review card to pause both marquee rows, then let them run again
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Alice" }, { hold: 1600 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.1 }, { secs: 0.7 });
  await film.hold(1800);
};
