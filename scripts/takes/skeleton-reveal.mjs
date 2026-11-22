// Skeleton reveal: after the first reveal, hit Reload so the rows snap back to pulsing bars and blur in again
export default async (film) => {
  await film.hold(600);
  await film.click({ role: "button", name: "Reload" }, { hold: 2200 });
  film.mark("hero");
};
