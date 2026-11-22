// custom-kanban — drag a card from TODO into In progress; the drop indicator shows where it lands
export default async (film) => {
  const page = film.page;
  const card = await page.locator("[data-rec-root]").getByText("Postmortem for outage").boundingBox();
  const target = await page.locator("[data-rec-root]").getByText("In progress", { exact: true }).boundingBox();
  await film.glide({ x: card.x + card.width / 2, y: card.y + card.height / 2 }, { secs: 0.7 });
  await page.mouse.down();
  await film.glide({ x: target.x + 60, y: target.y + 150 }, { secs: 1.1 });
  film.mark("hero");
  await film.hold(300);
  await page.mouse.up();
  await film.hold(1400);
};
