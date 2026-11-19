// box-reveal — replay the entrance so each line's box visibly slides off and the text rises in
export default async (film) => {
  await film.click({ role: "button", name: /replay/i }, { hold: 400 });
  film.mark("hero");
  await film.hold(1800);
  await film.click({ role: "button", name: /replay/i }, { hold: 2200 });
};
