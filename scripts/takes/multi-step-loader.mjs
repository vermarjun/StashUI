// Press Start and catch the loader overlay stepping through its first stages.
export default async (film) => {
  await film.click({ role: "button", name: /start loading/i }, { hold: 1500, secs: 0.15 });
  film.mark("hero");
  await film.hold(900);
};
