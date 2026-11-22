// detent-dial — turn the knob through its notches, then flick it and let it coast
export default async (film) => {
  const page = film.page;
  const knob = page.locator('[role="slider"]').first();
  const b = await knob.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2, r = b.width * 0.36;
  const pt = (deg) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) });
  await film.glide(pt(-20), { secs: 0.7 });
  await page.mouse.down();
  for (let d = -20; d <= 90; d += 3) {
    const p = pt(d);
    await page.mouse.move(p.x, p.y);
    await film.hold(28);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(900);
  await film.glide(pt(80), { secs: 0.4 });
  await page.mouse.down();
  for (let d = 80; d >= -40; d -= 12) {
    const p = pt(d);
    await page.mouse.move(p.x, p.y);
    await film.hold(12);
  }
  await page.mouse.up();
  await film.hold(1200);
};
