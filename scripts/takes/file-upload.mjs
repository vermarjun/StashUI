// Drop generated images into the hidden file input, then tour the result.
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
  const root = film.page.locator("[data-rec-root]").first();
  await film.hover(root, { hold: 900 });
  await addFiles(film.page, 1);
  await film.hold(1300);
  film.mark("hero");
  const b = await film.root().boundingBox();
  await film.drift({
    secs: 2.4,
    cx: b.x + b.width / 2,
    cy: b.y + b.height / 2,
    rx: Math.min(160, b.width * 0.3),
    ry: Math.min(110, b.height * 0.25),
  });
  await film.hold(500);
};
