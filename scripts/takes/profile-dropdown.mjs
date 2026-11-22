// Open the account card so it morphs into the menu, then open the account switcher.
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] button[aria-haspopup=menu]").first(), { hold: 1000 });
  await film.hover({ role: "menuitem", name: /Settings/ }, { hold: 600 });
  await film.click({ role: "button", name: "Switch account" }, { hold: 600 });
  film.mark("hero");
  await film.hold(900);
};
