// Action bar: tick two tasks and the bulk-action bar slides up with the count
export default async (film) => {
  const boxes = film.page.locator("[data-rec-root] [role=checkbox]");
  await film.click(boxes.nth(0), { hold: 700 });
  await film.click(boxes.nth(2), { hold: 1100 });
  film.mark("hero");
  await film.hover("[data-slot=action-bar-item] >> nth=0", { hold: 1300 });
};
