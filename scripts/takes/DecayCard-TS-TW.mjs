// DecayCard: fast sweeps across the card build up the displacement distortion.
export default async (film) => {
  const cy = film.H * 0.42;
  await film.glide({ x: film.W * 0.06, y: cy }, { secs: 0.5 });
  await film.glide({ x: film.W * 0.94, y: cy }, { secs: 0.16 });
  await film.hold(700);
  await film.glide({ x: film.W * 0.94, y: cy + 20 }, { secs: 0.2 });
  await film.glide({ x: film.W * 0.06, y: cy - 10 }, { secs: 0.16 });
  film.mark("hero");
  await film.hold(700);
  await film.glide({ x: film.W * 0.85, y: film.H * 0.16 }, { secs: 0.3 });
  await film.glide({ x: film.W * 0.15, y: film.H * 0.78 }, { secs: 0.18 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.45 }, { secs: 0.5 });
};
