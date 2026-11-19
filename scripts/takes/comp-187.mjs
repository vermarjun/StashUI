// flip the payment switch on so the card border and thumb light up
export default async (film) => {
  await film.click("[data-rec-root] [role=switch]", { hold: 1600 });
  film.mark("hero");
  await film.hold(900);
};
