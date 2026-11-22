// Uptime card: sweep the 90-day bars so they swell, then pin the Webhooks outage (day 70) to open its incident log
export default async (film) => {
  const bars = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await bars.boundingBox();
  const y = b.y + b.height * 0.62;
  let x = b.x + b.width * 0.772;
  await film.glide({ x: b.x + b.width * 0.15, y }, { secs: 0.7 });
  await film.glide({ x, y }, { secs: 1.6 });
  // The swell shifts bars under the pointer: nudge until the outage day is lit.
  for (let i = 0; i < 8; i++) {
    const day = Number(await bars.getAttribute("aria-valuenow"));
    if (day === 70) break;
    x += (day < 70 ? 1 : -1) * b.width * 0.03;
    await film.glide({ x, y }, { secs: 0.15 });
  }
  await film.click(null, { hold: 300 });
  film.mark("hero");
  await film.hold(1600);
};
