// comp-218 — timezone select: open the long list, move down it, then commit
export default async (film) => {
  await film.click({ role: "combobox" }, { hold: 1400 });
  for (let i = 0; i < 14; i++) await film.page.keyboard.press("ArrowDown");
  await film.hold(900);
  film.mark("hero");
  await film.press("Enter", { hold: 1300 });
};
