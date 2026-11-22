// CometDial: drag the first dial around its arc so the comet tail streaks after the value
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] [role=slider]").first().boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const r = Math.min(box.width, box.height) * 0.42;
  const at = (deg) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy + r * Math.sin((deg * Math.PI) / 180) });
  await film.glide(at(200), { secs: 0.8 });
  await film.page.mouse.down();
  for (let d = 200; d <= 380; d += 12) await film.glide(at(d), { secs: 0.08 });
  film.mark("hero");
  for (let d = 380; d >= 250; d -= 13) await film.glide(at(d), { secs: 0.08 });
  await film.page.mouse.up();
  await film.hold(1000);
};
