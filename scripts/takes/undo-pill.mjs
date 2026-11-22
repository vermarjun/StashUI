// Undo pill: delete a message, watch the countdown ring drain, then undo it back into the list
export default async (film) => {
  await film.click({ role: "button", name: /Delete Q3 roadmap/ }, { hold: 1800 });
  film.mark("hero");
  await film.click({ role: "button", name: /undo/i }, { hold: 1200 });
};
