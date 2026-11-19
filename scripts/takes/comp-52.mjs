// Read-only input: try to type into it (nothing changes), then move on
export default async (film) => {
  film.mark("kenburns");
  await film.type("input", "maya@stashui.dev", { hold: 900 });
  await film.hover({ text: "Read-only input" }, { hold: 1200 });
};
