Colab CLI

Usage

```
# Setup
$ yarn install # or npm install

# Login to Google (data will be saved at `./userDataDir`)
$ node login.js

# Run examples/hello.py on Colab
$ PYFILE=examples/hello.py COLAB_URL=https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa node run.js
:: Launching a browser...
:: Navigating to https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa ...
:: Colab opened
:: - URL: https://colab.research.google.com/drive/1PAyWisnzGCzDadGPKAj275gQTcmipJUa
:: - Name: colab-cli example
:: Setting up Runtime (GPU)...
:: - Connected to "Python 3 Google Compute Engine backend (GPU)"
:: Creating a cell...
:: Loading file content...
:: Starting execution... (see out.log)
:: - Run cell (Ctrl+Enter) cell executed since last change  executed by Hiroshi Ogawa 3:00 AM (0 minutes ago) executed in 1.256s
:: Program output:
hello world.

:: Saving notebook...
:: Saved.
:: Closing browser...
:: Closed.
```


Tips

```
# Play with puppeteer from console (with "await-able" REPL)
$ node --experimental-repl-await console.js

# Stop "crash restore prompt" on startup (cf. https://superuser.com/questions/1343290/disable-chrome-session-restore-popup)
$ perl -pi -e 's/Crashed/Normal/' ./userDataDir/Default/Preferences
```


References

- https://chromedevtools.github.io/devtools-protocol/
- https://github.com/GoogleChrome/puppeteer
