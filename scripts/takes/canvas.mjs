// Workflow canvas: drag a node so the edges re-route live
export default async (film) => {
  const node = film.page.locator(".react-flow__node", { hasText: "Classify intent" });
  const box = await node.boundingBox();
  const sx = box.x + box.width / 2, sy = box.y + 22;
  await film.glide({ x: sx, y: sy }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: sx + 30, y: sy - 90 }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: sx, y: sy }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(600);
  await film.hover({ text: "Draft reply" }, { hold: 900 });
};
