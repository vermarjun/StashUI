// open the edit-profile dialog, change the name and save
export default async (film) => {
  await film.hover({ role: "button", name: /Edit profile/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Edit profile/ }, { hold: 1200 });
  await film.type("input[placeholder='Matt']", "Maya", { delay: 40, hold: 300 });
  await film.type("input[placeholder='Welsh']", "Chen", { delay: 40, hold: 400 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Save changes/ }, { hold: 900 });
};
