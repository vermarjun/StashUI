// Letters pull up on mount: let it play, then hit Replay to watch them rise again.
export default async (film) => {
  await film.hold(1200);
  await film.click({ role: "button", name: /replay/i }, { hold: 250 });
  await film.hold(500);
  film.mark("hero");
  await film.hold(1600);
  await film.click({ role: "button", name: /replay/i }, { hold: 1800 });
};
