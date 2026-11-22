// Pricing tiers: flip yearly -> monthly so the digits roll, then show the receipt layout
export default async (film) => {
  await film.click({ role: "switch", name: /Bill monthly/ }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "switch", name: /Bill monthly/ }, { hold: 900 });
  await film.click("[data-variant=receipt]", { hold: 1400 });
};
