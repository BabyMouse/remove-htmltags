// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`[metruyenchu_start.js] ${document.readyState}\n`);

window.addEventListener('DOMContentLoaded', (event) => {
  // DOM fully loaded and parsed

  console.log(`[metruyenchu_start.js] DOMContentLoaded - ${document.readyState}`);
});

document.addEventListener('readystatechange', (event) => {
  removeScripts();
  removeTags();
  console.log(`[metruyenchu_start.js] removeTags() - ${document.readyState}\n`);

  if (document.readyState == 'interactive') {
    document.querySelectorAll('body > script:not([src])').forEach((elem) => {
      elem.remove();
    });
  }
});

function removeScripts() {
  document.querySelectorAll('script[src^="https://www.google-analytics.com"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] https://www.google-analytics.com');
  });

  document.querySelectorAll('script[src^="https://www.googletagmanager.com"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] https://www.googletagmanager.com');
  });

  document.querySelectorAll('script[src*="tpm_pub.min.js"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] tpm_pub.min.js');
  });

  document.querySelectorAll('script[src*="gliaplayer-plyr.js"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] gliaplayer-plyr.js');
  });

  document.querySelectorAll('script[src="https://static.adconnect.vn/main.js"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] https://static.adconnect.vn/main.js');
  });

  document.querySelectorAll('script[src$="zmedia_metruyenchu_mobile"]').forEach((elem) => {
    elem.remove();
    console.log('[metruyenchu_start.js] zmedia_metruyenchu_mobile');
  });
}

function removeTags() {
  document.querySelectorAll('iframe').forEach((elem) => {
    elem.style.display = 'none';
    elem.remove();
  });

  document.querySelectorAll('a[href^="https://c.lazada.vn"]').forEach((elem) => {
    elem.style.display = 'none';
    elem.parentNode.remove();
  });

  document.querySelectorAll('a[href^="https://tags.native-ad.net"]').forEach((elem) => {
    elem.style.display = 'none';
    elem.parentNode.remove();
  });

  document.querySelectorAll('div[id^="tpads-pc-"]').forEach((elem) => {
    // #tpads-pc-top-page
    // #tpads-pc-balloon
    // #tpads-pc-article-middle
    // #tpads-pc-in_image
    elem.style.display = 'none';
    elem.remove();
  });

  document.querySelectorAll('div[id^="tpads-mb-"]').forEach((elem) => {
    elem.style.display = 'none';
    elem.remove();
  });

  document.querySelectorAll('div[class="gliaplayer-wrapper"]').forEach((elem) => {
    elem.style.display = 'none';
    elem.parentNode.remove();
  });
}
