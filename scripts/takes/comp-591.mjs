// AI chat header: open the model picker and switch to Orion-Code 4
export default async (film) => {
  await film.click("[role=combobox]", { hold: 900 });
  await film.hover({ role: "option", name: /nova-chat/i }, { hold: 700 });
  await film.mark("hero");
  await film.click({ role: "option", name: /orion-code 4/i }, { hold: 1500 });
};
