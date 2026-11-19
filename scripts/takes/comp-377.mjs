// comp-377: avatar account menu in an app header; open it, hover Billing, close
export default async (film) => {
  await film.click({ role: "button", name: /account menu/i }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ role: "menuitem", name: /billing/i }, { hold: 900 });
  await film.hover({ role: "menuitem", name: /settings/i }, { hold: 700 });
  await film.press("Escape");
  await film.hold(600);
};
