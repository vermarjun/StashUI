// text-cursor-proximity — move over the poster so letters near the cursor blur out
export default async (film) => {
  const card = await film.page.locator("[data-rec-root] [data-poster]").first().boundingBox();
  const cx = card.x + card.width / 2, cy = card.y + card.height / 2;
  await film.glide({ x: card.x + 60, y: card.y + 60 }, { secs: 0.7 });
  await film.drift({ secs: 4.5, cx, cy, rx: card.width * 0.35, ry: card.height * 0.38 });
  film.mark("hero");
};
