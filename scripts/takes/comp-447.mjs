// open the breadcrumb overflow menu and pick an item
export default async (film) => {
  await film.hover({ role: "button", name: /Toggle menu/ }, { hold: 1200 });
  await film.click({ role: "button", name: /Toggle menu/ }, { hold: 1400 });
  await film.hover({ role: "menuitem", name: /Documentation/ }, { hold: 700 });
  await film.mark("hero");
  await film.click({ role: "menuitem", name: /Themes/ }, { hold: 1100 });
};
