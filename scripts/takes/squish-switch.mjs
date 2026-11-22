// Squish Switch: flick two switches so the thumb stretches and squashes
export default async (film) => {
  await film.click({ role: "switch", name: "Weekly digest" }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "switch", name: "Focus mode" }, { hold: 900 });
  await film.click({ role: "switch", name: "Weekly digest" }, { hold: 700 });
};
