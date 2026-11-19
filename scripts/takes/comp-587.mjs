// app header: hover the icon nav links, then type in the search
export default async (film) => {
  await film.hover({ role: "link", name: /inbox/i }, { hold: 900 });
  await film.hover({ role: "link", name: /insights/i }, { hold: 900 });
  await film.mark("hero");
  await film.type("input[type=search]", "weekly metrics", { hold: 900 });
};
