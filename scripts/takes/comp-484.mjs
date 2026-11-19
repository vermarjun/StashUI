// page forward twice so the row set and page counter change
export default async (film) => {
  await film.click({ role: "button", name: /go to next page/i }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /go to next page/i }, { hold: 1600 });
};
