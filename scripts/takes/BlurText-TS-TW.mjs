// Entrance animation: let it play on mount, then hit Replay and watch it stagger in again.
export default async (film) => {
  await film.hold(1200);
  await film.click({ role: "button", name: /replay/i }, { hold: 250 });
  await film.hold(500);
  film.mark("hero");
  await film.hold(1600);
  await film.click({ role: "button", name: /replay/i }, { hold: 1800 });
};
