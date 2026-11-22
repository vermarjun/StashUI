// timezone-planner — drop the meeting at an off-hour on the dial, then let it glide to the best shared hour
export default async (film) => {
  const dial = film.page.locator("[data-rec-root] svg.touch-none").first();
  const b = await dial.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2, r = b.width * 0.29;
  await film.glide({ x: cx + r * 0.7, y: cy - r * 0.7 }, { secs: 0.7 });
  await film.click({ x: cx - r * 0.75, y: cy + r * 0.66 }, { hold: 1100 });
  await film.click({ role: "button", name: /find best time/i }, { hold: 1600 });
  film.mark("hero");
};
