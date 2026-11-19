// Walk the stepper forward to the last step, then back one.
export default async (film) => {
  await film.click({ role: "button", name: /^next$/i }, { hold: 1100 });
  await film.click({ role: "button", name: /^next$/i }, { hold: 1100 });
  film.mark("hero");
  await film.hold(500);
  await film.click({ role: "button", name: /^back$/i }, { hold: 1000 });
};
