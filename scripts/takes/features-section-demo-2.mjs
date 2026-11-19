// features section: hovers feature cells so their gradient and accent bar play
export default async (film) => {
  await film.hover({ text: "Built for developers" }, { hold: 1200 });
  await film.hover({ text: "Pricing like no other" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "Ease of use" }, { hold: 1100 });
};
