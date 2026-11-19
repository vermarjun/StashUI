// multi-selector — search and add Svelte then Vue alongside the React badge
export default async (film) => {
  await film.click({ role: "button" }, { hold: 1100 });
  await film.type('input[placeholder="Search..."]', "Svelte", { hold: 500 });
  await film.press("Enter", { hold: 700 });
  await film.page.keyboard.press("Meta+A");
  await film.page.keyboard.press("Backspace");
  await film.hold(300);
  await film.type(null, "Vue", { hold: 500 });
  await film.press("Enter", { hold: 1000 });
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
};
