// PixelCard: hover each variant so the pixel grid sweeps across all three cards.
export default async (film) => {
  await film.hover({ text: "Default" }, { hold: 1100 });
  await film.hover({ text: "Blue" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "Pink" }, { hold: 1100 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.12 }, { secs: 0.6 });
  await film.hold(500);
};
