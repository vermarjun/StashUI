// Stack panel: drill into Notifications then Quiet hours (row label flies into the title), then go back
export default async (film) => {
  await film.click({ role: "button", name: /^Notifications/ }, { hold: 1000 });
  await film.click({ role: "button", name: /^Quiet hours/ }, { hold: 1000 });
  film.mark("hero");
  await film.click({ role: "button", name: "Notifications" }, { hold: 1000 });
};
