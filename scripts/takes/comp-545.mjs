// Image dropzone: upload a cover, show the contained preview, then remove it
// and drift over the caption so the loop returns to the plain empty drop area.
async function addFiles(page, n) {
  await page.evaluate(async (n) => {
    const palettes = [["#6366f1", "#0ea5e9"], ["#f59e0b", "#ef4444"], ["#10b981", "#14b8a6"]];
    const dt = new DataTransfer();
    for (let i = 0; i < n; i++) {
      const c = document.createElement("canvas");
      c.width = 1200;
      c.height = 800;
      const g = c.getContext("2d");
      const grad = g.createLinearGradient(0, 0, 1200, 800);
      grad.addColorStop(0, palettes[i % 3][0]);
      grad.addColorStop(1, palettes[i % 3][1]);
      g.fillStyle = grad;
      g.fillRect(0, 0, 1200, 800);
      g.fillStyle = "rgba(255,255,255,0.45)";
      g.fillRect(110, 540, 520, 26);
      g.fillRect(110, 590, 340, 18);
      g.beginPath();
      g.arc(920, 220, 130, 0, Math.PI * 2);
      g.fill();
      const blob = await new Promise((r) => c.toBlob(r, "image/png"));
      dt.items.add(new File([blob], `cover-${i + 1}.png`, { type: "image/png" }));
    }
    const input = document.querySelector("[data-rec-root] input[type=file]");
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, n);
}

export default async (film) => {
  await addFiles(film.page, 1);
  await film.hold(700);
  film.mark("hero");
  const b = await film.root().boundingBox();
  await film.click({ role: "button", name: /remove/i }, { hold: 500 });
  await film.drift({
    secs: 1.8,
    cx: b.x + b.width / 2,
    cy: b.y + b.height - 18,
    rx: Math.min(150, b.width * 0.28),
    ry: 24,
  });
  await film.hold(700);
};
