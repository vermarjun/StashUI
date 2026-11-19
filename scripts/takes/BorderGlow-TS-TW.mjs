// border glow: trace the cursor slowly just inside the card's edge so the glowing cone follows it around the border
export default async (film) => {
  const card = film.page.getByText("Pro plan").locator("xpath=..");
  const b = await card.boundingBox();
  const L = b.x + 14, R = b.x + b.width - 14, T = b.y + 14, B = b.y + b.height - 14;
  await film.glide({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.5 }, { secs: 0.6 });
  await film.glide({ x: L + 30, y: T }, { secs: 0.7 });
  await film.glide({ x: R, y: T + 10 }, { secs: 1.3 });
  film.mark("hero");
  await film.glide({ x: R, y: B - 20 }, { secs: 1.5 });
  await film.glide({ x: L + 20, y: B }, { secs: 1.3 });
  await film.glide({ x: L, y: T + b.height * 0.4 }, { secs: 1.0 });
};
