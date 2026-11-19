// comp-383: open the avatar notification popover, then mark all read.
// Pin the portalled popover on-screen past the rig's page zoom.
export default async (film) => {
  await film.click({ role: "button", name: /open notifications/i }, { hold: 900 });
  await film.page.evaluate(() => {
    const c = document.querySelector('[data-slot="popover-content"]');
    const w = c?.closest("[data-radix-popper-content-wrapper]");
    if (w) { w.style.position = "fixed"; w.style.left = "300px"; w.style.top = "20px"; w.style.transform = "none"; w.style.zIndex = "60"; }
  });
  await film.hold(700);
  film.mark("hero");
  await film.click({ role: "button", name: /mark all as read/i }, { hold: 1300 });
  await film.press("Escape", { hold: 600 });
};
