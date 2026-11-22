// auto-height — expand and collapse the text; the card glides to its new height
export default async (film) => {
  await film.click({ role: "button", name: /show more/i }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: /show less/i }, { hold: 1200 });
};
