// Face ID: tap the glyph, the scan sweeps, the check draws and the codes unblur
export default async (film) => {
  await film.click({ role: "button", name: /scan to view recovery codes/i }, { hold: 2300 });
  film.mark("hero");
  await film.hold(1200);
};
