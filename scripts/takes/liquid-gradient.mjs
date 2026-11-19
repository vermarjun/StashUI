// hover the liquid pill and hold so the gradient morphs, slide off, then back on
export default async (film) => {
  await film.hover({ text: "Get early access" }, { hold: 2200 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.15 }, { secs: 0.7 });
  await film.hold(700);
  await film.hover({ text: "Get early access" }, { hold: 1800 });
};
