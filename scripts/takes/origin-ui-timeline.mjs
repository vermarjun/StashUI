// origin-ui-timeline — clicking a step advances the tracker, then steps back
export default async (film) => {
  await film.click({ text: "Delivered", exact: true }, { hold: 1600 });
  await film.mark("hero");
  await film.click({ text: "Payment confirmed", exact: true }, { hold: 1200 });
};
