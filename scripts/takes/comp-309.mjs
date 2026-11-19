// hover and press the try-now action, then rest on the dismiss control
export default async (film) => {
  await film.click({ role: "button", name: /Try now/ }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ role: "button", name: /Close banner/ }, { hold: 1100 });
};
