// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`[metruyenchu_idle.js] ${document.readyState}\n`);

let timeout = 5;
browser.storage.local.get(['timeout'], (result) => {
  const __num = parseInt(result.timeout);
  console.log('[metruyenchu_idle.js] +browser.storage.local.get():', __num);
  if (Number.isInteger(__num) && __num > -1) {
    timeout = __num;
  }
});

const elem = document.getElementById('article');
if (elem != null) {
  elem.style.display = 'block';
  //elem.style.flexWrap = '';
  console.log('[metruyenchu_idle.js] #article style: ', elem.style, ` - ${document.readyState}`);
} else {
  console.log('[metruyenchu_idle.js] #article style: ', elem, ` - ${document.readyState}`);
}

window.addEventListener('load', () => {
  setTimeout(afterloaded, timeout * 1000);
});

function afterloaded() {
  document.querySelectorAll('div[id^="gliaplayer-zmedia_"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] gliaplayer-zmedia_');
  });

  document.querySelectorAll('div[id^="tpads-mb-"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] tpads-mb-');
  });

  document.querySelectorAll('a[href^="https://tags.native-ad.net"]').forEach((elem) => {
    elem.parentNode.remove();
    console.log('[metruyenchu_idle.js] https://tags.native-ad.net');
  });

  document.querySelectorAll('iframe').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_idle.js] iframe');
  });

  console.log(`[metruyenchu_idle.js] afterloaded() - ${document.readyState}`);
}
