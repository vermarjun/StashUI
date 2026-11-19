// expand a gallery card into the linear modal
export default async (film) => {
  await film.hover({ role: "button", name: /Accordion/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Accordion/ }, { hold: 1700 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
