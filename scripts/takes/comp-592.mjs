// dashboard header: switch test mode off, then open the notification popover
export default async (film) => {
  await film.click("[role=switch]", { hold: 900 });
  await film.mark("hero");
  await film.click({ role: "button", name: /open notifications/i }, { hold: 1700 });
};
