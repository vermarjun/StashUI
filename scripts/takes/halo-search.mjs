// Aurora halo spins faster on hover and blooms on focus: hover, then focus and type.
export default async (film) => {
  await film.hover("input", { hold: 1300 });
  await film.type("input", "aurora gradients", { hold: 600 });
  film.mark("hero");
  await film.hold(1200);
};
