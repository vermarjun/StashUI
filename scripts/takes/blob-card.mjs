// Blob card: glide over the header so the fluid blobs chase the cursor
export default async (film) => {
  const card = film.page.locator("[data-rec-root] .rounded-\\[20px\\]").first();
  const b = await card.boundingBox();
  await film.glide({ x: b.x + b.width * 0.25, y: b.y + 90 }, { secs: 0.8 });
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.8, y: b.y + 140 }, { secs: 1.4 });
  await film.glide({ x: b.x + b.width * 0.4, y: b.y + 60 }, { secs: 1.2 });
  await film.hold(600);
};
