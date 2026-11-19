// start the timer, let it run, then pause so the count reads clearly
export default async (film) => {
  await film.click({ role: "button", name: /start/i }, { hold: 2200 });
  film.mark("hero");
  await film.hold(900);
  await film.click({ role: "button", name: /pause/i }, { hold: 900 });
};
