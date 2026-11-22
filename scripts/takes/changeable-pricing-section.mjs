// Pricing picker: flip to yearly (prices roll), then pick Enterprise so its features expand
export default async (film) => {
  await film.click({ text: "Yearly" }, { hold: 1000 });
  await film.click({ text: "Enterprise" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ text: "Monthly" }, { hold: 900 });
};
