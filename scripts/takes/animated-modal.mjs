// hover the trigger (label slides out, plane slides in), open the spring 3D modal, then dismiss it
export default async (film) => {
  const trigger = film.page.locator("[data-rec-root] button").first();
  await film.hover(trigger, { hold: 1100 });
  await film.click(trigger, { hold: 1700 });
  film.mark("hero");
  await film.click({ x: 70, y: 70 }, { hold: 700 });
};
