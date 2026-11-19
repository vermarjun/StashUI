// Press a few formatting toggles so both pressed and unpressed states show.
export default async (film) => {
  await film.click({ role: "button", name: /^bold$/i }, { hold: 700 });
  await film.click({ role: "button", name: /^italic$/i }, { hold: 800 });
  await film.click({ role: "button", name: /^underline$/i }, { hold: 800 });
  film.mark("hero");
  await film.hold(400);
  await film.click({ role: "button", name: /align center/i }, { hold: 800 });
};
