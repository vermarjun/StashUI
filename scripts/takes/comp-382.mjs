// comp-382: open the bell popover, then mark all notifications read.
// Pin the portalled popover on-screen (the rig's page zoom otherwise scales
// its fixed coordinates and pushes it off the bottom of the frame).
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
