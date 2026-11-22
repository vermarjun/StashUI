// Shader reveal: advance the scene, switch variant, advance again so two shader wipes play
export default async (film) => {
  await film.click({ role: "button", name: /next scene/i }, { hold: 700 });
  film.mark("hero");
  await film.hold(600);
  await film.click({ role: "button", name: /^stripes$/i }, { hold: 300 });
  await film.click({ role: "button", name: /next scene/i }, { hold: 1300 });
};
