// chat-style header: type a search, then open the notification popover
export default async (film) => {
  await film.type("input[type=search]", "release notes", { hold: 600 });
  await film.mark("hero");
  await film.click(film.page.getByRole("button", { name: /open notifications/i }).nth(1), { hold: 1700 });
};
