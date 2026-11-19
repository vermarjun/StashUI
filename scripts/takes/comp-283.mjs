// comp-283 — warning notification: hover the action link, then dismiss it (it returns after a beat)
export default async (film) => {
  await film.hover({ text: "Fix it" }, { hold: 1000 });
  film.mark("hero");
  await film.click({ role: "button", name: /close banner/i }, { hold: 2600 });
};
