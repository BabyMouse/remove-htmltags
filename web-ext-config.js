module.exports = {
  verbose: true,
  build: {
    overwriteDest: true,
  },
  run: {
    adbBin: "D:Codeplatform-tools_r33.0.3-windows",
    target: ["firefox-android"],
    firefoxApk: "org.mozilla.fenix",
  },
  ignoreFiles: ["web-ext-config.js", "README.md", "CHANGELOG.md"],
};
