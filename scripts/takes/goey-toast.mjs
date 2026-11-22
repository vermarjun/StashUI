// Gooey toast: fire a success toast so the pill melts into a card, then a promise toast that morphs loading -> success
export default async (film) => {
  await film.click({ role: "button", name: /^success$/i }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /^promise$/i }, { hold: 2600 });
};
