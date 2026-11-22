// Inline edit: hover the Event row, open its editor, retype the title and save
export default async (film) => {
  const row = film.page.locator("[data-rec-root] .group\\/content").first();
  await film.hover(row, { hold: 600 });
  await film.click(row.locator("div.size-7"), { hold: 700 });
  await film.click(row.locator("input"), { hold: 200 });
  await film.press("ControlOrMeta+a");
  await film.type(null, "Tokens & Theming Night");
  film.mark("hero");
  await film.hold(500);
  await film.press("Enter");
  await film.hold(900);
};
