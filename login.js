const puppeteer = require('puppeteer');

// TODO: Maybe setting up some proper cookie should be enough?
// - cf. https://chromedevtools.github.io/devtools-protocol/tot/Network#method-setCookie

const USER_DATA_DIR = process.env.USER_DATA_DIR || './userDataDir';
const LOGIN_URL = 'https://accounts.google.com';

const main = async () => {
  console.log(':: Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    userDataDir: USER_DATA_DIR,
  });
  const page = (await browser.pages())[0];

  console.log(`:: Navigating to ${LOGIN_URL}...`);
  await page.goto(LOGIN_URL);
  console.log(':: Login to Google and close the browser.');
  page.on('close', () => console.log(':: Page closed.'));
}

main();
