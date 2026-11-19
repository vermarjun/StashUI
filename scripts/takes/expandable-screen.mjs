// click the card to expand it full screen, then collapse
export default async (film) => {
  await film.hover({ text: "Expand to Full Screen" }, { hold: 1500 });
  await film.click({ text: "Expand to Full Screen" }, { hold: 1700 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
