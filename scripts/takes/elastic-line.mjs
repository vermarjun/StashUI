// elastic-line — catch the line with the cursor, stretch it, and let it snap back
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] svg").first().boundingBox();
  const midY = box.y + box.height / 2;
  await film.glide({ x: box.x + box.width * 0.3, y: midY - 40 }, { secs: 0.6 });
  await film.glide({ x: box.x + box.width * 0.45, y: midY + 45 }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: box.x + box.width * 0.55, y: midY + 160 }, { secs: 0.5 });
  await film.hold(1200);
  await film.glide({ x: box.x + box.width * 0.6, y: midY - 45 }, { secs: 0.9 });
  await film.glide({ x: box.x + box.width * 0.65, y: midY - 170 }, { secs: 0.5 });
  await film.hold(1100);
};
