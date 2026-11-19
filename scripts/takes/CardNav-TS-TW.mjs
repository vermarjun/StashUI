// open the card nav menu, hover a link in the cards, then close it
export default async (film) => {
  await film.click({ role: "button", name: /Open menu/ }, { hold: 1600 });
  await film.hover({ text: "Case Studies" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /Close menu/ }, { hold: 1300 });
};
