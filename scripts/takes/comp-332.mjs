// open onboarding and step through two screens
export default async (film) => {
  await film.hover({ role: "button", name: /Onboarding/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Onboarding/ }, { hold: 1300 });
  await film.click({ role: "button", name: /Next/ }, { hold: 900 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Next/ }, { hold: 900 });
  await film.press("Escape", { hold: 300 });
};
