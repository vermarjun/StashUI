// questionnaire — pick an answer, advance, multi-select on the next question as it slides in
export default async (film) => {
  await film.click({ text: "Approval checkpoints" }, { hold: 600 });
  await film.click({ role: "button", name: /^next$/i }, { hold: 1000 });
  await film.click({ text: "Decisions" }, { hold: 350 });
  await film.click({ text: "Risks" }, { hold: 500 });
  film.mark("hero");
  await film.click({ role: "button", name: /^next$/i }, { hold: 1000 });
};
