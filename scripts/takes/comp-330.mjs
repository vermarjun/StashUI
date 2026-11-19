// open change-plan and pick the Enterprise plan
export default async (film) => {
  await film.hover({ role: "button", name: /Change plan/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Change plan/ }, { hold: 1200 });
  await film.hover({ text: "Standard" }, { hold: 500 });
  await film.click({ text: "Enterprise" }, { hold: 900 });
  await film.mark("hero");
  await film.press("Escape", { hold: 300 });
};
