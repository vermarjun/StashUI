// Dialog stack: open the wizard and step forward; earlier steps stack behind
export default async (film) => {
  await film.click({ role: "button", name: "Create workspace" }, { hold: 1200 });
  await film.click({ role: "button", name: "Continue" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Send invites" }, { hold: 1400 });
};
