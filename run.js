const fs = require('fs');
const util = require('util');
const puppeteer = require('puppeteer');
const { click, clipboardWrite } = require('./lib.js');


// Parameters, Constants //

const EXAMPLE_URL = 'https://colab.research.google.com/notebooks/intro.ipynb';
const NEW_URL = 'https://colab.research.google.com/notebook#create=true&language=python3';
const EL = '\r\033[K' // cf. tput el


// Driving Notebook DOMs //

// "setupGPU" triggers restart so this is not necessary
const restart = async (page) => {
  await click(page, '#runtime-menu-button');
  await click(page, '#runtime-menu div[command="powerwash"]');
  await click(page, '.yes-no-dialog #ok');
}

const setupGPU = async (page) => {
  await click(page, '#runtime-menu-button');
  await click(page, '#runtime-menu div[command="change-runtime-type"]');

  await click(page, '#accelerators-menu');
  await page.waitFor(500); // wait a bit for popover animation

  await click(page, '#accelerators-menu paper-item[value="GPU"]');
  await click(page, '#notebook-settings #ok');

  await page.waitFor(500);
  await click(page, 'colab-connect-button');
}

const save = async (page) => {
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyS');
  await page.keyboard.up('Control');

  const isSaved = () => {
    const toasts = Array.from(document.querySelectorAll('paper-toast'));
    const bools = toasts.map(e => e.textContent.match('Saved successfully!'));
    return bools.reduce((x, y) => x || y, false);
  }
  await page.waitFor(isSaved);
}

const createCell = async (page) => {
  await click(page, '.add-cell .add-code');
  const cell = await page.$('.cell.code');
  const date = (new Date()).toGMTString();
  await cell.type(`### Created by colab-cli: ${date} ### \n\n`);
  return cell;
}

// NOTE: It seems there are four possible states:
// - 1. has not been executed
// - 2. currently executing    (it really means it's waiting for runtime to be available)
// - 3. interrupt by ...       (here it's really executing)
// - 4. cell executed ...
// NOTE: Also, there's some weird case
// where both 'cell executed' and 'currently executing' appears.
const getExecutionStatus = async (cell) => {
  const message = await cell.$eval('.cell-execution paper-icon-button', e => e.title.split('\n').join(' '));
  // this "executing" flag becomes true iff the case <3> above.
  const executing = !!(await cell.$('.cell-execution  .cell-spinner.animating'));
  return { executing, message };
}

// NOTE: Output is in cross-domain iframe so --disable-features=site-per-process is necessary
const getExecutionOutput = async (page, cell) => {
  const url = await cell.$eval('iframe', e => e.src);
  // there are many iframes with the same src, but it seems the last one is what we want.
  const fs = page.mainFrame().childFrames().filter(f => f.url() === url);
  const f = fs[fs.length - 1];
  const texts = await f.$$eval('.output_text pre', es => Array.from(es, e => e.textContent));
  return texts.join('\n');
}


// Main //

const pageMain = async (page, cellInput) => {
  console.log(`:: Setting up Runtime (GPU)...`);
  await setupGPU(page);

  while (true) {
    const status = await page.$eval('colab-connect-button #colab-connect-tooltip .colab-connect-button', e => e.textContent);
    process.stdout.write(`${EL}${status.trim()}`);
    if (status.match('Connected to')) {
      process.stdout.write('\n');
      break;
    }
    await page.waitFor(500);
  }

  console.log(`:: Running a program...`);
  const cell = await createCell(page);

  // Write a file content into the cell
  // (using clipboard so that there's no trouble with automatic indent by notebook editor)
  await clipboardWrite(page, cellInput);
  await cell.click();
  await page.waitFor(500);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyV');
  await page.keyboard.up('Control');

  // Execute
  await click(cell, '.cell-execution');

  // TODO: show execution unfinished execution output

  // Poll execution status
  while (true) {
    const state = await getExecutionStatus(cell)
    process.stdout.write(`${EL}${state.message}`)
    const breakCond =
      state.message.match('cell executed') &&
      !state.message.match('currently executing...')
    if (breakCond) {
      process.stdout.write('\n')
      break;
    }
    await page.waitFor(500);
  }

  // Show output
  console.log(':: Program output:');
  const output = await getExecutionOutput(page, cell);
  console.log(output);

  // Save
  console.log(`:: Saving notebook...`);
  await save(page);
  console.log(`:: Saved.`);
}

// Main options (TODO: use nodejs argparse)
const PYFILE        = process.env.PYFILE;
const COLAB_URL     = process.env.COLAB_URL;
const USER_DATA_DIR = process.env.USER_DATA_DIR || './userDataDir';
const HEADLESS      = process.env.HEADLESS ? eval(process.env.HEADLESS) : true;
const EXIT          = process.env.EXIT     ? eval(process.env.EXIT )    : true;
const CLEAR         = process.env.CLEAR    ? eval(process.env.CLEAR)    : false;

const main = async () => {
  const cellInput = (await util.promisify(fs.readFile)(PYFILE)).toString();

  console.log(':: Launching a browser...');
  const browser = await puppeteer.launch({
    args: HEADLESS ? [] : ['--disable-features=site-per-process'],
    headless: HEADLESS,
    userDataDir: USER_DATA_DIR
  });

  try {
    const page = (await browser.pages())[0];

    const navUrl = COLAB_URL || NEW_URL;
    console.log(`:: Navigating to ${navUrl} ...`);
    await page.goto(navUrl, { waitUntil: 'networkidle2' });

    const url = await page.url();
    const name = await page.$eval('#doc-name', e => e.value);
    console.log(`:: Colab opened`);
    console.log(`:: - URL: ${url}`);
    console.log(`:: - Name: ${name}`);

    await pageMain(page, cellInput);

  } catch (e) {
    console.error(e.message);
  }

  if (EXIT) {
    console.log(`:: Closing browser...`);
    await browser.close();
    console.log(`:: Closed.`);
  }
}

main();
