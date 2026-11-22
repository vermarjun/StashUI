// shadcn chart family: sweep the cursor across two of the variants so the themed tooltip tracks the data
export default async (film) => {
  const charts = film.page.locator("[data-rec-root] [data-slot=chart]");
  const sweep = async (i, steps) => {
    const box = await charts.nth(i).boundingBox();
    if (!box) return;
    for (let s = 0; s < steps.length; s++) {
      const { x, y } = { x: box.x + box.width * steps[s], y: box.y + box.height * 0.5 };
      await film.glide({ x, y }, { secs: s === 0 ? 0.7 : 0.45 });
      if (i === 1 && s === 1) film.mark("hero");
      await film.hold(380);
    }
  };
  await sweep(1, [0.2, 0.45, 0.7, 0.85]);
  await sweep(0, [0.35, 0.65]);
};
