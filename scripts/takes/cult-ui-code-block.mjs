// cult-ui-code-block — tab slide from usage.tsx to hook.ts, then copy
export default async (film) => {
  await film.click({ role: "tab", name: "hook.ts" }, { hold: 1500 });
  film.mark("hero");
  await film.click(film.page.locator("[data-rec-root] button[aria-label='Copy code']").last(), { hold: 1200 });
};
