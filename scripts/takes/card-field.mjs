// card-field — type a card number; it collapses to the last four and the row moves on to expiry and CVC
export default async (film) => {
  await film.type('input[autocomplete="cc-number"]', "4242424242424242", { delay: 45 });
  await film.hold(700);
  await film.type('input[autocomplete="cc-exp"]', "0428");
  await film.type('input[autocomplete="cc-csc"]', "123");
  film.mark("hero");
  await film.hold(1100);
};
