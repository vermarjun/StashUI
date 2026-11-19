// Morphing feedback: open the pill, write a note, submit with Cmd+Enter
export default async (film) => {
  await film.click({ text: "Send Feedback" }, { hold: 1500 });
  await film.type("textarea", "The new onboarding flow is much clearer. Nice work!", { hold: 500 });
  film.mark("hero");
  await film.press("Meta+Enter", { hold: 1800 });
};
