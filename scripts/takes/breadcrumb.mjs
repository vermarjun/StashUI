// trace the breadcrumb trail, hovering each link
export default async (film) => {
  await film.hover({ text: "Home" }, { hold: 1300 });
  await film.hover({ text: "Components" }, { hold: 1300 });
  await film.mark("hero");
  await film.hover({ text: "Breadcrumb" }, { hold: 1300 });
};
