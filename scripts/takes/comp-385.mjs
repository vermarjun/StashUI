// open the step popover and walk it to the third tip
export default async (film) => {
  await film.click({ role: "button", name: "Tooltip-like with steps" }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next" }, { hold: 1300 });
  await film.click({ role: "button", name: "Next" }, { hold: 1300 });
};
