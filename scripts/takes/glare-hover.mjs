// glare-hover — a sheen sweeps over the card as the cursor moves across it
export default async (film) => {
  const card = await film.root().boundingBox().catch(() => null);
  await film.drift({ secs: 4.2, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.2, ry: film.H * 0.16 });
  await film.mark("hero");
};
