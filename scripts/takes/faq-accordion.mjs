// open the second question, then the third, showing the answer panel swap
export default async (film) => {
  await film.click({ text: "Common UI component design challenges?" }, { hold: 1500 });
  film.mark("hero");
  await film.click({ text: "Ensuring UI component responsiveness?" }, { hold: 1400 });
};
