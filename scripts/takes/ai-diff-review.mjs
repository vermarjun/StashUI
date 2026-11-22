// Watch the agent stream its edits, keep one file, then accept the rest in one go.
export default async (film) => {
  await film.hold(2400);
  await film.click({ role: "button", name: "Accept lib/validate.ts" }, { hold: 900 });
  await film.click({ role: "button", name: "Accept all" }, { hold: 400 });
  film.mark("hero");
  await film.hold(1100);
};
