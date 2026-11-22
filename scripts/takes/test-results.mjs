// Test results: open a passing suite, then close it, failing suite stays expanded
export default async (film) => {
  await film.click({ text: "auth/session.test.ts" }, { hold: 1500 });
  film.mark("hero");
  await film.click({ text: "auth/session.test.ts" }, { hold: 900 });
};
