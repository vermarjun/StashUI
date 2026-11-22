// shadcn chart primitive: sweep across the stacked revenue bars, then the latency lines, so the themed tooltip follows
export default async (film) => {
  const charts = film.page.locator("[data-rec-root] [data-slot=chart]");
  for (const [i, xs] of [[0, [0.2, 0.5, 0.8]], [1, [0.3, 0.7]]]) {
    const box = await charts.nth(i).boundingBox();
    if (!box) continue;
    for (const f of xs) {
      await film.glide({ x: box.x + box.width * f, y: box.y + box.height * 0.45 }, { secs: 0.55 });
      if (i === 0 && f === 0.8) film.mark("hero");
      await film.hold(450);
    }
  }
};
