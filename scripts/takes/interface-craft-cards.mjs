// Interface craft cards: open one card so the rest drop away, then click out to fan them back
export default async (film) => {
  await film.click({ text: "Collaborate with AI" }, { hold: 1600 });
  film.mark("hero");
  await film.click({ x: film.W * 0.5, y: 40 }, { hold: 1200 });
};
