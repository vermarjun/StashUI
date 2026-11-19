// accordion FAQ tabs switch the active question and its image
export default async (film) => {
  await film.click({ text: "Important of UI component.", exact: true }, { hold: 1400 });
  await film.click({ text: "Is UI and UX Same?", exact: true }, { hold: 1400 });
  film.mark("hero");
  await film.click({ text: "How do UI components improve UX?", exact: true }, { hold: 1200 });
};
