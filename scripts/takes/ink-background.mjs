// Ink background: stir through the headline so the letters bleed, drop ink, let it gather back
export default async (film) => {
  const r = await film.page.locator("[data-rec-root] canvas").first().boundingBox();
  const y = r.y + r.height * 0.4;
  await film.glide({ x: r.x + r.width * 0.2, y }, { secs: 0.6 });
  await film.glide({ x: r.x + r.width * 0.8, y: y + 20 }, { secs: 1.1 });
  film.mark("hero");
  await film.click({ x: r.x + r.width * 0.62, y: y - 60 }, { hold: 600 });
  await film.glide({ x: r.x + r.width * 0.3, y: y + 10 }, { secs: 1 });
  await film.hold(1600);
};
