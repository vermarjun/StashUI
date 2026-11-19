// work-experience — moving down the timeline lifts each role card in turn
export default async (film) => {
  await film.hover({ text: "OpenAI", exact: true }, { hold: 1400 });
  await film.hover({ text: "Stripe", exact: true }, { hold: 1400 });
  await film.mark("hero");
  await film.hover({ text: "Airbnb", exact: true }, { hold: 1300 });
};
