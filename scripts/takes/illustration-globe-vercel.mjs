// Deploy globe: switch to deploying, watch paths draw to the globe, then back to deployed
export default async (film) => {
  await film.click({ role: "button", name: /^deploying$/i }, { hold: 2200 });
  film.mark("hero");
  await film.click({ role: "button", name: /^deployed$/i }, { hold: 2000 });
};
