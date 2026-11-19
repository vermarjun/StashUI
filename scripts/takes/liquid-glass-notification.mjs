// Liquid-glass notification: hover the stack, click the first card so it expands with its preview image, then collapse.
export default async (film) => {
  await film.hover({ text: "UI-Layouts" }, { hold: 800 });
  await film.click({ text: "UI-Layouts" }, { hold: 1800 });
  film.mark("hero");
  await film.click({ text: "UI-Layouts" }, { hold: 1200 });
};
