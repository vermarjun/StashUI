// comp-381: open the filter popover and tick one filter.
// Pin the portalled popover on-screen past the rig's page zoom.
export default async (film) => {
  await film.click('button[aria-label="Filters"]', { hold: 900 });
  await film.page.evaluate(() => {
    const c = document.querySelector('[data-slot="popover-content"]');
    const w = c?.closest("[data-radix-popper-content-wrapper]");
    if (w) { w.style.position = "fixed"; w.style.left = "300px"; w.style.top = "120px"; w.style.transform = "none"; w.style.zIndex = "60"; }
  });
  await film.hold(700);
  film.mark("hero");
  await film.click({ text: "Real Time" }, { hold: 900 });
  await film.press("Escape", { hold: 600 });
};
