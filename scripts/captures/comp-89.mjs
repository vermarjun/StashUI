// comp-89: Cancel (ghost) + Save (primary) button pair in an inline flex row.
// Choreography: hover Cancel → click Cancel → hover Save → click Save → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    const cancelBtn = page.getByRole('button', { name: /cancel/i });
    const saveBtn = page.getByRole('button', { name: /save/i });
    await cancelBtn.waitFor({ state: 'visible' });

    // Start away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover Cancel
    await cancelBtn.hover({ force: true });
    await page.waitForTimeout(700);

    // Click Cancel
    await cancelBtn.click({ force: true });
    await page.waitForTimeout(500);

    // Move to Save and hover
    await saveBtn.hover({ force: true });
    await page.waitForTimeout(700);

    // Click Save
    await saveBtn.click({ force: true });
    await page.waitForTimeout(500);

    // End resting away from buttons
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-89 capture error:', err);
  }
}
