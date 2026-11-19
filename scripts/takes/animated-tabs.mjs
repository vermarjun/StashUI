// move the wobbly pill through Features and Pricing, letting each panel swap
export default async (film) => {
  await film.click({ text: "Features" }, { hold: 1700 });
  film.mark("hero");
  await film.hold(500);
  await film.click({ text: "Pricing" }, { hold: 1800 });
};
