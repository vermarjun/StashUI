// ai-inline-edit — run "Fix grammar" on the selected sentence, watch the diff stream in, accept it
export default async (film) => {
  await film.click({ role: "button", name: "Fix grammar" }, { hold: 400 });
  await film.hold(2200);
  film.mark("hero");
  await film.click({ role: "button", name: /^Accept/ }, { hold: 1300 });
};
