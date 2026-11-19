// Type a strong password, then hover the info icon to reveal the requirement
// checklist that makes this variant different.
export default async (film) => {
  await film.type(film.page.locator("[data-rec-root] input[type=password]").first(), "Str0ng!Pass", { delay: 60 });
  await film.hover(film.page.locator("[data-rec-root] svg").first(), { hold: 1800 });
  film.mark("hero");
  await film.hold(900);
};
