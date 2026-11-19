// open the nav popover, step forward twice, then back once
export default async (film) => {
  await film.click({ role: "button", name: "Tooltip-like with nav" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next tip" }, { hold: 1100 });
  await film.click({ role: "button", name: "Next tip" }, { hold: 1100 });
  await film.click({ role: "button", name: "Previous tip" }, { hold: 1100 });
};
