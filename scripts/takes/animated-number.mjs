// spring-animate the number up to 42,000 then 1,000,000
export default async (film) => {
  await film.click({ role: "button", name: "42,000" }, { hold: 1200 });
  film.mark("hero");
  await film.click({ role: "button", name: "1,000,000" }, { hold: 1400 });
};
