const repl = require('repl')
const puppeteer = require('puppeteer')

const HEADLESS      = process.env.HEADLESS ? eval(process.env.HEADLESS) : true
const USER_DATA_DIR = process.env.USER_DATA_DIR || './userDataDir'
const URL           =  process.env.URL || 'https://colab.research.google.com/notebooks/intro.ipynb'

const main = async () => {
  console.log(':: Launching Browser...')
  global.browser = await puppeteer.launch({
    args: HEADLESS ? [] : ['--disable-features=site-per-process'],
    headless: HEADLESS,
    userDataDir: USER_DATA_DIR
  })
  global.page = (await browser.pages())[0]
  console.log(`:: Navigating to ${URL}...`)
  await page.goto(URL)

  console.log(`:: Page is ready. Try for example:`)
  console.log(`> await page.evaluate(() => document.title)`)
  console.log(await page.evaluate(() => document.title));

  console.log(`:: Here you go.`)
  const replServer = repl.start('> ')

  replServer.on('exit', async () => {
    console.log(`:: Closing browser...`)
    await browser.close()
    console.log(`:: Closed.`)
  })
}

main()
