module.exports = {
  verbose: true,
  build: {
    overwriteDest: true,
  },
  run: {
    adbBin: 'D:/Code/platform-tools_r33.0.3-windows',
    target: ['firefox-android'],
    firefoxApk: 'org.mozilla.fenix',
  },
  ignoreFiles: ['web-ext-config.js', 'temp.html', 'temp.css', 'temp.js', 'temp.mjs', 'temp.txt'],
};
