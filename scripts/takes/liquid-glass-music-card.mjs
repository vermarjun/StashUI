// Grab the spinning disc and wind it around to scrub, then skip to the next track.
export default async (film) => {
  const disc = film.page.locator("[data-rec-root] [data-now-playing-disc]");
  const b = await disc.boundingBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  const r = b.width * 0.36;
  await film.glide({ x: cx + r, y: cy }, { secs: 0.7 });
  await film.page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    await film.glide({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }, { secs: 0.14 });
  }
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(900);
  await film.click({ role: "button", name: "Next track" }, { hold: 1200 });
};
