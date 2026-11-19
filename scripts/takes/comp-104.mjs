// comp-104 — volume stepper; nudge the level up twice and back down once.
export default async (film) => {
  await film.click({ role: "button", name: /increase volume/i }, { hold: 900 });
  await film.click({ role: "button", name: /increase volume/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /decrease volume/i }, { hold: 1100 });
};
