// check the box to expand it, then fill the revealed details field
export default async (film) => {
  await film.click("[data-rec-root] [role=checkbox]", { hold: 900 });
  await film.type("input[placeholder='Enter details']", "Renews on 28 December");
  film.mark("hero");
  await film.hold(700);
};
