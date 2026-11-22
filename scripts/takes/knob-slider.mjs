// Knob slider: grab the dial and spin it around so the sliding number blurs and rolls
export default async (film) => {
  const knob = film.page.locator("[data-rec-root] div.cursor-pointer.rounded-full").first();
  const b = await knob.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2, r = b.width * 0.42;
  const at = (deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  await film.glide(at(150), { secs: 0.7 });
  await film.page.mouse.down();
  for (const d of [175, 205, 235, 265, 290]) await film.glide(at(d), { secs: 0.28 });
  film.mark("hero");
  for (const d of [250, 200, 150, 110]) await film.glide(at(d), { secs: 0.3 });
  await film.page.mouse.up();
  await film.hold(700);
};
