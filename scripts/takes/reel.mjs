// Reel: tap the right half twice to advance stories; progress bars fill and jump
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] [data-reel-content]").boundingBox();
  const right = { x: box.x + box.width * 0.78, y: box.y + box.height * 0.45 };
  await film.hold(1400);
  await film.click(right, { hold: 1500 });
  film.mark("hero");
  await film.click(right, { hold: 1500 });
};
