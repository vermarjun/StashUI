// Flick the hour drum so it coasts with momentum, then nudge the minutes.
export default async (film) => {
  const flick = async (label, dy, secs) => {
    const col = film.page.locator(`[data-rec-root] [role=spinbutton][aria-label="${label}"]`);
    const b = await col.boundingBox();
    const x = b.x + b.width / 2;
    const y = b.y + b.height / 2;
    await film.glide({ x, y: y + dy / 2 }, { secs: 0.6 });
    await film.page.mouse.down();
    await film.glide({ x, y: y - dy / 2 }, { secs });
    await film.page.mouse.up();
  };
  await flick("Hours", 110, 0.18);
  film.mark("hero");
  await film.hold(1300);
  await flick("Minutes", -60, 0.5);
  await film.hold(1100);
};
