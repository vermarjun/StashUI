// AI message queue: queue a follow-up while the agent works, then send a queued one now
export default async (film) => {
  await film.type('textarea[aria-label="Message the agent"]', "Then open a PR");
  await film.press("Enter");
  await film.hold(900);
  film.mark("hero");
  await film.click(film.page.locator('[aria-label="Send now"]').nth(1), { hold: 1600 });
};
