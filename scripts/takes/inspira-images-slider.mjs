// focus the slider and arrow through two vertical image transitions
export default async (film) => {
  await film.page.evaluate(() => document.querySelector("[data-rec-root] [tabindex='0']")?.focus());
  await film.hold(300);
  await film.press("ArrowRight", { hold: 1200 });
  film.mark("hero");
  await film.press("ArrowRight", { hold: 1200 });
};
