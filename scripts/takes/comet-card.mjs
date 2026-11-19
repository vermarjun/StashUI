// comet card: glide onto the invite and wander over it so it tilts in 3D and the glare follows
export default async (film) => {
  const card = film.page.getByRole("button", { name: /view invite/i });
  const b = await card.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await film.glide({ x: cx - b.width * 0.3, y: cy - b.height * 0.3 }, { secs: 0.8 });
  film.mark("hero");
  await film.drift({ secs: 4, cx, cy, rx: b.width * 0.35, ry: b.height * 0.32 });
};
