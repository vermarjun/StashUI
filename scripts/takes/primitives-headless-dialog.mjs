// open the headless dialog (spring flip-in), hold on the fully open panel, then close via Cancel
export default async (film) => {
  await film.click({ role: "button", name: /Open Dialog/ }, { hold: 900 });
  film.mark("hero");
  await film.glide({ role: "button", name: /^Archive$/ }, { secs: 0.8 });
  await film.hold(900);
  await film.click({ role: "button", name: /^Cancel$/ }, { hold: 1100 });
};
