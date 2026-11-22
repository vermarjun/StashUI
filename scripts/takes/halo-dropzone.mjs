// Halo dropzone: hover the zone so the rim lights up while an upload row fills
export default async (film) => {
  await film.hover({ text: "Drop files here or browse" }, { hold: 1800 });
  film.mark("hero");
  await film.glide({ x: film.W / 2, y: film.H - 90 }, { secs: 0.8 });
  await film.hold(1200);
};
