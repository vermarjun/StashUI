// shift card: hover so the portrait shifts up into the header and the profile panel slides up, then leave so it shifts back
export default async (film) => {
  await film.hover({ text: "Sofia Marquez" }, { hold: 1800 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.18, y: film.H * 0.5 }, { secs: 0.7 });
  await film.hold(1100);
};
