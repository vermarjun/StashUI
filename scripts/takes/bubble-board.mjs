// bubble board: grab the plane and drag it so bubbles swell in the middle and shrink at the edges
export default async (film) => {
  const { page, W, H } = film;
  const cx = W / 2, cy = H / 2 - 20;
  await film.glide({ x: cx, y: cy }, { secs: 0.6 });
  await page.mouse.down();
  const path = [[cx - 120, cy - 90], [cx + 110, cy - 40], [cx + 60, cy + 110], [cx - 80, cy + 40]];
  for (const [i, [x, y]] of path.entries()) {
    await page.mouse.move(x, y, { steps: 40 });
    if (i === 1) film.mark("hero");
    await film.hold(150);
  }
  await page.mouse.up();
  await film.hold(900);
};
