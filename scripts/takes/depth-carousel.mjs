// Depth carousel: advance twice, cards recede into the 3D rail.
export default async (film) => {
  await film.click({ role: "button", name: "Next slide" }, { hold: 1200 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next slide" }, { hold: 1200 });
  await film.click({ role: "button", name: "Previous slide" }, { hold: 1000 });
};
