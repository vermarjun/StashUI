// flip the switch on and off to show the card's checked border state
export default async (film) => {
  await film.click("[data-rec-root] [role=switch]", { hold: 1600 });
  film.mark("hero");
  await film.hold(800);
  await film.click("[data-rec-root] [role=switch]", { hold: 1100 });
};
