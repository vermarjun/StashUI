// multi-selector-default — search and add Vue and Ember to Nextjs + Svelte
export default async (film) => {
  await film.click({ role: "button" }, { hold: 1100 });
  await film.type('input[placeholder="Search..."]', "Vue", { hold: 500 });
  await film.press("Enter", { hold: 700 });
  await film.page.keyboard.press("Meta+A");
  await film.page.keyboard.press("Backspace");
  await film.hold(300);
  await film.type(null, "Ember", { hold: 500 });
  await film.press("Enter", { hold: 1000 });
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
};
