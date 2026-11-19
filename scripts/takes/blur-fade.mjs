// blur-fade — replay the gallery so the title, subtitle and each photo blur-fade in on a stagger
export default async (film) => {
  await film.click({ role: "button", name: /replay/i }, { hold: 700 });
  film.mark("hero");
  await film.hold(1500);
  await film.click({ role: "button", name: /replay/i }, { hold: 2000 });
};
