// comp-387: open the share popover and copy the link (check icon confirms).
// Pin the portalled popover on-screen past the rig's page zoom.
export default async (film) => {
  await film.click({ role: "button", name: /^share$/i }, { hold: 900 });
  await film.page.evaluate(() => {
    const c = document.querySelector('[data-slot="popover-content"]');
    const w = c?.closest("[data-radix-popper-content-wrapper]");
    if (w) { w.style.position = "fixed"; w.style.left = "300px"; w.style.top = "100px"; w.style.transform = "none"; w.style.zIndex = "60"; }
  });
  await film.hold(700);
  await film.click('button[aria-label="Copy to clipboard"]', { hold: 500 });
  film.mark("hero");
  await film.hold(1100);
  await film.press("Escape", { hold: 600 });
};
