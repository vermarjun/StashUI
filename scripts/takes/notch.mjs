// Notch: open the Theme group in the floating bar, pick an option, then open Language and pick one
export default async (film) => {
  await film.click({ role: "button", name: /Theme/ }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "option", name: /System/ }, { hold: 900 });
  await film.click({ role: "button", name: /Language/ }, { hold: 1000 });
  await film.click({ role: "option", name: /Français/ }, { hold: 900 });
};
