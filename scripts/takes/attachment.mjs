// Attachment: the upload finishes on its own, then the failed file gets removed
export default async (film) => {
  await film.hover({ text: "Q3-board-deck.pdf" }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: "Remove contract-final-v7.pdf" }, { hold: 1200 });
  await film.hover({ text: "Add file" }, { hold: 900 });
};
