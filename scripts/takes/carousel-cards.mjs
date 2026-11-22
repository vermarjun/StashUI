// Carousel cards: step the rail twice so the cover-flow tilt and parallax play, then save a trip
export default async (film) => {
  await film.click({ role: "button", name: "Next" }, { hold: 1000 });
  await film.click({ role: "button", name: "Next" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: "Previous" }, { hold: 1000 });
};
