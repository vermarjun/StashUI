// Figma comment: click a pin so it unfolds into the thread, then open another (first closes)
export default async (film) => {
  const pins = film.page.locator("[data-rec-root] .cursor-pointer.rounded-bl-none");
  await film.click(pins.nth(0), { hold: 1400 });
  film.mark("hero");
  await film.click(pins.nth(1), { hold: 1400 });
};
