// shuffle the quote three times: digits roll, the badge flips red/green and its arrow rotates
export default async (film) => {
  const shuffle = { role: "button", name: /shuffle/i };
  await film.click(shuffle, { hold: 1300 });
  film.mark("hero");
  await film.click(null, { hold: 1300 });
  await film.click(null, { hold: 1300 });
};
