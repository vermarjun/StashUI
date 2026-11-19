// search + notification header: type a query, open the notification popover
export default async (film) => {
  await film.type("input[type=search]", "design system", { hold: 600 });
  await film.mark("hero");
  await film.click({ role: "button", name: /open notifications/i }, { hold: 1700 });
};
