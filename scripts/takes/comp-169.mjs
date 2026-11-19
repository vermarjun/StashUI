// pick Dark, then System: the selected preview gets the ring and the check moves with it
export default async (film) => {
  await film.click({ text: "Dark" }, { hold: 1100 });
  film.mark("hero");
  await film.click({ text: "System" }, { hold: 1100 });
  await film.click({ text: "Light" }, { hold: 800 });
};
