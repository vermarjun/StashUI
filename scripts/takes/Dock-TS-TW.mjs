// Dock: sweep slowly along the dock so the icons magnify under the cursor like macOS, then back
export default async (film) => {
  const bar = await film.page.locator("[data-rec-root] [role=toolbar]").first().boundingBox();
  const y = bar.y + bar.height * 0.55;
  await film.glide({ x: bar.x + 30, y }, { secs: 0.8 });
  await film.glide({ x: bar.x + bar.width - 30, y }, { secs: 2.4 });
  film.mark("hero");
  await film.glide({ x: bar.x + bar.width * 0.4, y }, { secs: 1.4 });
  await film.hold(600);
};
