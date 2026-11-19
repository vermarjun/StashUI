// bordered warning with action link: hover the Link to slide its arrow
export default async (film) => {
  await film.hover({ role: "link", name: /link/i }, { hold: 1800 });
  await film.mark("hero");
  await film.hover({ text: "Some information is missing!", exact: true }, { hold: 1200 });
};
