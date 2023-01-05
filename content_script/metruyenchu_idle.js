// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`[metruyenchu_idle.js] ${document.readyState}\n`);

let _settings;

function showPopup(title, content) {
  const __styleTag = document.createElement('style');
  __styleTag.setAttribute('type', 'text/css');
  __styleTag.innerHTML = `.ext-popup{background-color:#ffc;border-radius:3px;border:1px solid #aaa;color:#000;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:small;left:10px;max-width:60%;min-width:200px;position:fixed;top:10px;z-index:1013}.ext-popup>nav>span{display:inline-flex;font-weight:700;margin:5px 0 5px 5px}.ext-popup>nav>label{display:inline}.ext-popup>nav>label::after{content:'✖';cursor:pointer;float:right;font-size:large;font-weight:bolder;height:25px;text-align:center;width:25px}.ext-popup>p{display:block;margin:0 10px 10px 5px;padding:0}`;
  document.head.append(__styleTag);

  const __divTag = document.createElement('div');
  __divTag.className = 'ext-popup';
  __divTag.innerHTML = `<nav><span></span><label title="Close" onclick="this.parentNode.parentNode.remove()"></label></nav><p></p>`;
  __divTag.getElementsByTagName('span').item(0).innerText = title;
  __divTag.getElementsByTagName('p').item(0).innerText = content;
  document.body.append(__divTag);

  setTimeout(() => {
    __divTag.remove();
    __styleTag.remove();
  }, 10000);
}

function reformatWebPage() {
  const __elem = document.getElementById('article');
  if (__elem != null) {
    if (__elem.getElementsByTagName('canvas').length > 0) {
      const __styleTag = document.createElement('style');
      __styleTag.setAttribute('type', 'text/css');
      __styleTag.innerHTML = `.c-c>canvas{margin-bottom:1em}`;
      document.body.append(__styleTag);
    } else if (__elem.getElementsByTagName('p').length == 0) {
      const __styleTag = document.createElement('style');
      __styleTag.setAttribute('type', 'text/css');
      __styleTag.innerHTML = `.c-c{display:block}`;
      document.body.append(__styleTag);
    }
  }
}

function afterloaded() {
  document.querySelectorAll('div[id^="gliaplayer-zmedia_"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] gliaplayer-zmedia_');
  });

  document.querySelectorAll('div[id^="tpads-pc-"]').forEach((elem) => {
    elem.style.display = 'none';
    // elem.remove();
    console.log('[metruyenchu_idle.js] tpads-pc-');
  });

  document.querySelectorAll('div[id^="tpads-mb-"]').forEach((elem) => {
    elem.style.display = 'none';
    // elem.remove();
    console.log('[metruyenchu_idle.js] tpads-mb-');
  });

  document.querySelectorAll('a[href^="https://tags.native-ad.net"]').forEach((elem) => {
    elem.parentNode.remove();
    console.log('[metruyenchu_idle.js] https://tags.native-ad.net');
  });

  document.querySelectorAll('body > script:not([src])').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] body > script:not([src])');
  });

  document.querySelectorAll('iframe').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] iframe');
  });

  reformatWebPage();

  switch (_settings.p_noti) {
    case 'popup':
      showPopup(
        'Remove HTMLTags',
        `• The script has been completed.\n• readyState: ${
          document.readyState
        }.\n• settings = ${JSON.stringify(_settings, null, 4)}`
      );
      break;
    case 'system':
      browser.runtime.sendMessage({
        req: 'notify',
        title: document.title,
        content: `• The script has been completed.\n• readyState: ${document.readyState}.`,
      });
      break;
  }

  console.log(`[metruyenchu_idle.js] afterloaded() - ${document.readyState}`);
}

browser.runtime.sendMessage({ req: 'getSettings' }).then((response) => {
  _settings = response ?? { timeout: 5, p_noti: 'off' };
  setTimeout(afterloaded, _settings.timeout * 1000);
});

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// wait(10 * 1000).then(() => afterloaded());
