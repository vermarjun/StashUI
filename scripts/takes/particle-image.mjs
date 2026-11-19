// Particle image: particles fly in to form the logo, then the cursor sweeps through and scatters them
export default async (film) => {
  const c = await film.page.locator("[data-rec-root] canvas").first().boundingBox();
  const cy = c.y + c.height / 2;
  await film.hold(900);
  await film.glide({ x: c.x + c.width * 0.15, y: cy }, { secs: 0.7 });
  await film.glide({ x: c.x + c.width * 0.85, y: cy + 10 }, { secs: 1.6 });
  film.mark("hero");
  await film.glide({ x: c.x + c.width * 0.45, y: cy - 30 }, { secs: 1.2 });
  await film.glide({ x: c.x + c.width * 0.5, y: c.y + c.height + 80 }, { secs: 0.6 });
  await film.hold(1200);
};
