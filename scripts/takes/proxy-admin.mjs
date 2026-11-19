// proxy-admin — opens the Quick test tab and runs a model call, showing the result
export default async (film) => {
  await film.click({ role: "tab", name: /quick test/i }, { hold: 1000 });
  await film.click({ role: "button", name: /run test/i }, { hold: 2200 });
  await film.mark("hero");
  await film.click({ role: "tab", name: /providers/i }, { hold: 900 });
};
