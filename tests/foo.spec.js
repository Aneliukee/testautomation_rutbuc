const { test, expect } = require('@playwright/test');

test('Checks that duckduckGo page can be opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');

  expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and results are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'Test');
    await page.click('#search_button_homepage');
    const rezultatasTextContent = await page.textContent('#r1-0');
    expect(rezultatasTextContent).toContain('Test');
  });

test('Inspector demo', async({page}) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
    await Promise.all([
        page.waitForNavigation(),
        page.click('input:has-text("S")')
    ]);
    const rezultatasTextContent = await page.textContent('#r1-0');
    expect(rezultatasTextContent).toContain('Test');
  });

  test('Checks that cheat sheet tab is opened', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
    await page.click('#search_button_homepage');
    const cSheetTitle = await page.textContent('.c-base__title');
    const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    expect(isCheatSheetsVisible).toBe(true);
    expect(cSheetTitle).toContain('Microsoft Word 2010');
  });

  test('panda', async ({page}) => {
    await page.goto('https://duckduckgo.com/');
    await page.waitForSelector("#search_form_input_homepage");
    await page.fill('#search_form_input_homepage', "intitle:panda");
    await page.click("#search_button_homepage", { force: true });
    await page.waitForNavigation();
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    results.forEach(result => {
      expect(result).toContain("Panda");
    });
  });

  const passwordsLengths = ['8', '16', '64'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });