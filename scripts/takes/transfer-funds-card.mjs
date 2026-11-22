// Transfer funds card: hover the account selects (chevrons wiggle), then press confirm
export default async (film) => {
  await film.hover({ text: "Everyday Checking", exact: false }, { hold: 900 });
  await film.hover({ text: "Emergency Savings", exact: false }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "button", name: /Confirm Transfer/ }, { hold: 1000 });
};
