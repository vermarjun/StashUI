// Cascader: open the attribute picker, drill into Person > Company, pick Domain
export default async (film) => {
  await film.click({ text: "Select an attribute" }, { hold: 800 });
  await film.click({ text: "Person" }, { hold: 700 });
  await film.click({ text: "Company" }, { hold: 800 });
  film.mark("hero");
  await film.click({ text: "Domain" }, { hold: 1000 });
};
