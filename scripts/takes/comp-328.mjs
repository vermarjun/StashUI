// open the card dialog and type a card number
export default async (film) => {
  await film.hover({ role: "button", name: /Card details/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Card details/ }, { hold: 1200 });
  await film.type("[id^='name-']", "Maya Chen", { delay: 26, hold: 200 });
  await film.type("[id^='number-']", "4242424242424242", { delay: 42, hold: 600 });
  await film.mark("hero");
  await film.type("[id^='expiry-']", "1228", { delay: 80, hold: 500 });
  await film.press("Escape", { hold: 300 });
};
