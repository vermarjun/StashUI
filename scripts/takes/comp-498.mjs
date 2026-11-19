// yearly dropdown + nav: opens the year select with the keyboard, picks 2025
export default async (film) => {
  const trig = film.page.locator("[data-rec-root] [role=combobox]").first();
  await trig.focus();
  await film.press("ArrowDown", { hold: 1300 });
  film.mark("hero");
  await film.press("ArrowUp", { hold: 400 });
  await film.press("Enter", { hold: 1300 });
};
