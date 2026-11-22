// faq-search — filter by category, search, open an answer
export default async (film) => {
  await film.click({ role: "button", name: "Billing" }, { hold: 1000 });
  await film.type('[data-rec-root] input[placeholder="Search FAQs..."]', "plan");
  await film.click({ role: "button", name: /change my plan/i }, { hold: 1500 });
  film.mark("hero");
};
