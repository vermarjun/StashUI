// Select an option and submit the vote so the results replace the choices.
export default async (film) => {
  await film.hover({ role: "option", name: /Better DX tooling/i }, { hold: 700 });
  await film.click({ role: "option", name: /Faster build times/i }, { hold: 800 });
  await film.click({ role: "button", name: /submit/i }, { hold: 1500 });
  film.mark("hero");
  await film.hold(1300);
};
