// flip the toggle to Register (pill slides, the form swaps), then back to Login
export default async (film) => {
  await film.click({ text: /^register$/i }, { hold: 1800 });
  film.mark("hero");
  await film.hold(600);
  await film.click({ text: /^login$/i }, { hold: 1500 });
};
