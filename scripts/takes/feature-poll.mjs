// Hover the choices, then vote for Performance so the result bars animate in.
export default async (film) => {
  await film.hover({ role: "option", name: /Developer Experience/i }, { hold: 700 });
  await film.hover({ role: "option", name: /Ecosystem/i }, { hold: 600 });
  await film.click({ role: "option", name: /Performance/i }, { hold: 1500 });
  film.mark("hero");
  await film.hold(1400);
};
