// data table: filter rows by typing, hide a column from View, then open a row's action menu
export default async (film) => {
  await film.type("[data-rec-root] input[aria-label='Filter by name or email']", "alex", { delay: 110 });
  await film.hold(900);
  await film.click({ role: "button", name: "View" }, { hold: 900 });
  await film.click({ role: "menuitemcheckbox", name: /performance/i }, { hold: 900 });
  await film.press("Escape");
  await film.click(film.page.locator("[data-rec-root] [aria-label='Edit item']").first(), { hold: 1400 });
  film.mark("hero");
  await film.press("Escape");
};
