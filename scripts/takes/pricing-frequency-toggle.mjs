// pricing-frequency-toggle — flip to yearly: the pill slides, prices roll down, discount badges pop in
export default async (film) => {
  await film.click({ role: "button", name: /yearly/i }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "Get started" }, { hold: 900 });
  await film.click({ role: "button", name: /monthly/i }, { hold: 1100 });
};
