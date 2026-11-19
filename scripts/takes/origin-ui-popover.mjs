// origin-ui-popover: open the settings popover and hover its save action.
// Pin the portalled popover on-screen past the rig's page zoom.
export default async (film) => {
  await film.click({ role: "button", name: /quick settings/i }, { hold: 900 });
  await film.page.evaluate(() => {
    const c = document.querySelector('[data-slot="popover-content"]');
    const w = c?.closest("[data-radix-popper-content-wrapper]");
    if (w) { w.style.position = "fixed"; w.style.left = "300px"; w.style.top = "100px"; w.style.transform = "none"; w.style.zIndex = "60"; }
  });
  await film.hold(800);
  film.mark("hero");
  await film.hover({ text: "Save changes" }, { hold: 900 });
  await film.press("Escape", { hold: 600 });
};
