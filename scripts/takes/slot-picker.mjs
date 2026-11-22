// Click a free gap on the day rail, drag the meeting so it hops over a busy block, confirm.
export default async (film) => {
  const rail = film.page.locator("[data-rec-root] div.relative.flex-1.touch-none").first();
  const r = await rail.boundingBox();
  await film.click({ x: r.x + r.width / 2, y: r.y + r.height * 0.2 }, { hold: 700 });
  const meeting = film.page.locator('[data-rec-root] button[aria-label*="Arrow keys move it"]');
  const m = await meeting.boundingBox();
  await film.glide({ x: m.x + m.width / 2, y: m.y + m.height / 2 }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: m.x + m.width / 2, y: r.y + r.height * 0.62 }, { secs: 1.0 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(700);
  await film.click({ role: "button", name: /Confirm/ }, { hold: 1100 });
};
