// Rotating gradient border: let the conic ring circle the pill, then hover and press it
export default async (film) => {
  await film.hold(800);
  film.mark("hero");
  await film.hover({ role: "button", name: "Book a demo" }, { hold: 1500 });
  await film.click(null, { hold: 1000 });
};
