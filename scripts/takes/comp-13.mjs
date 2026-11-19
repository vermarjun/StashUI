// Currency field with € prefix and EUR suffix: type an amount.
export default async (film) => {
  await film.type("input", "1,250.00", { delay: 70, hold: 900 });
  film.mark("hero");
  await film.hold(700);
};
