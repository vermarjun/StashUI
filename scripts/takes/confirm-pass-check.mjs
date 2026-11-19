// Type a strong password, match it in the confirm field, then hover the info
// icon to open the requirements card.
export default async (film) => {
  const pw = film.page.locator("[data-rec-root] input[type=password]");
  await film.type(pw.nth(0), "Str0ng!Pass", { delay: 60 });
  await film.type(pw.nth(1), "Str0ng!Pass", { delay: 60 });
  await film.hover(film.page.locator("[data-rec-root] form svg").first(), { hold: 1700 });
  film.mark("hero");
  await film.hold(900);
};
