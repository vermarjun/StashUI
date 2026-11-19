// Sweep the hover handle across the before/after image and back.
export default async (film) => {
  const b = await film.root().boundingBox();
  const y = b.y + b.height * 0.5;
  await film.glide({ x: b.x + b.width * 0.2, y }, { secs: 0.6 });
  await film.glide({ x: b.x + b.width * 0.8, y }, { secs: 1.4 });
  film.mark("hero");
  await film.hold(700);
  await film.glide({ x: b.x + b.width * 0.35, y }, { secs: 1.2 });
  await film.hold(500);
};
