// profile card: glide onto the holographic card and wander over it so it tilts and the foil shine sweeps
export default async (film) => {
  const card = film.page.getByText("Daniel Okafor").first();
  const b = await card.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + 200;
  await film.glide({ x: cx - 120, y: cy - 120 }, { secs: 0.8 });
  film.mark("hero");
  await film.drift({ secs: 4, cx, cy, rx: 150, ry: 170 });
};
