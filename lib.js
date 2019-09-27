const click = async (parent, selector) => {
  const e = await parent.$(selector);
  await e.click();
}

// Loophole of permission block when accessing navigator.clipboard in headless mode
// cf. https://stackoverflow.com/questions/49131516/how-to-copy-text-from-browser-clipboard-using-puppeteer-in-nodejs
const clipboardWrite = async (page, text) => {
  const _clipboardWrite = (_text) => {
    const e = document.createElement('textarea')
    document.body.appendChild(e)
    e.value = _text
    e.select()
    document.execCommand('copy')
    document.body.removeChild(e)
  }
  await page.evaluate(_clipboardWrite, text)
}

module.exports = {
  click,
  clipboardWrite
}
