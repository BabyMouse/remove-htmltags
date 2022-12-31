// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`[metruyenchu_idle.js] ${document.readyState}\n`);

const _notifications = new Set(['off', 'popup', 'system']);
const _settings = {
  timeout: 5,
  p_noti: 'off',
};

function getSettings(restoredSettings) {
  const __num = parseInt(restoredSettings.timeout);
  if (Number.isInteger(__num) && __num > -1) _settings.timeout = __num;
  else
    browser.runtime.sendMessage({
      req: 'notify',
      title: document.title,
      content: `• [browser.storage.local] timeout = ${__num}.\n• readyState: ${document.readyState}.`,
    });
  if (_notifications.has(restoredSettings.p_noti)) _settings.p_noti = restoredSettings.p_noti;
  else
    browser.runtime.sendMessage({
      req: 'notify',
      title: document.title,
      content: `• [browser.storage.local] notification = ${restoredSettings.p_noti}.\n• readyState: ${document.readyState}.`,
    });
}
function onError(e) {
  browser.runtime.sendMessage({
    req: 'notify',
    title: document.title,
    content: `• [browser.storage.local] ${e}.\n• readyState: ${document.readyState}.`,
  });
}
browser.storage.local.get().then(getSettings, onError);

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

// const elem = document.getElementById('article');
// if (elem != null) {
//   elem.style.display = 'block';
//   //elem.style.flexWrap = '';
//   console.log('[metruyenchu_idle.js] #article style: ', elem.style, ` - ${document.readyState}`);
// } else {
//   console.log('[metruyenchu_idle.js] #article style: ', elem, ` - ${document.readyState}`);
// }

function afterloaded() {
  // const elem = document.getElementById('article');
  // if (elem != null) elem.style.display = 'block';

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

  switch (_settings.p_noti) {
    case 'popup':
      showPopup('Remove HTMLTags', `• The script has been completed.\n• readyState: ${document.readyState}.`);
      break;
    case 'system':
      browser.runtime.sendMessage({
        req: 'notify',
        title: document.title,
        content: `• The script has been completed.\n• readyState: ${document.readyState}.`,
      });
      console.log(document.title);
      break;
  }

  console.log(`[metruyenchu_idle.js] afterloaded() - ${document.readyState}`);
}

setTimeout(afterloaded, _settings.timeout * 1000);

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// wait(10 * 1000).then(() => afterloaded());
