// tests/e2e.spec.js
const { test, expect } = require('@playwright/test');

test('should generate and download an .ics file', async ({ page }) => {
  // 1. Go to the webpage. We assume it's running on a local server at port 8080.
  await page.goto('http://localhost:8080');

  // 2. Fill out the required form fields.
  await page.fill('#name', 'John Doe');
  await page.fill('#company', 'Acme Inc');
  await page.fill('#contact', 'john.doe@email.com');

  // 3. Prepare to listen for the download event BEFORE clicking the button.
  const downloadPromise = page.waitForEvent('download');

  // 4. Click the "Generate Calendar Events" button.
  await page.click('button[type="submit"]');

  // 5. Wait for the download to start and get its details.
  const download = await downloadPromise;

  // 6. Assert that the downloaded file has the expected name.
  expect(download.suggestedFilename()).toBe('John Doe_Acme Inc_3b7b_reminders.ics');
});