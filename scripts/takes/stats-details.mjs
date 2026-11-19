// hover each stat card in turn: the gradient photo fades in and the icon turns orange
export default async (film) => {
  await film.hover({ text: "Revenue Growth" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Customer Retention" }, { hold: 1300 });
  await film.hover({ text: "Data Processed" }, { hold: 1300 });
};
