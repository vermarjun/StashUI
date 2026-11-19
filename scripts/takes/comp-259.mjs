// comp-259 — credits stepper: nudge up three times, then down once
export default async (film) => {
  await film.click({ role: "button", name: /Increase value/ }, { hold: 900 });
  await film.click({ role: "button", name: /Increase value/ }, { hold: 900 });
  await film.click({ role: "button", name: /Increase value/ }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /Decrease value/ }, { hold: 1300 });
};
