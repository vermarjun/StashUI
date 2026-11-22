// Button group: toggle italic, change alignment, bump the quantity stepper
export default async (film) => {
  await film.click({ role: "button", name: "italic" }, { hold: 700 });
  await film.click({ role: "button", name: "Align center" }, { hold: 800 });
  film.mark("hero");
  await film.click({ role: "button", name: "Increase" }, { hold: 400 });
  await film.click(null, { hold: 900 });
};
