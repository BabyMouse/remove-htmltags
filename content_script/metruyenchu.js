// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`Script loaded: ${document.readyState}\n`);

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

document.addEventListener("readystatechange", (event) => {
  removeTags();
  replaceTags();
  console.log(`removeTags() loaded: ${document.readyState}\n`);
});

function removeTags() {
  document.querySelectorAll("a[href^='https://c.lazada.vn']").forEach((elem) => {
    elem.style.display = "none";
    elem.parentNode.remove();
  });

  document.querySelectorAll("a[href^='https://tags.native-ad.net']").forEach((elem) => {
    elem.style.display = "none";
    elem.parentNode.remove();
  });

  document.querySelectorAll("iframe[src^='https://tags.native-ad.net']").forEach((elem) => {
    elem.style.display = "none";
    elem.parentNode.parentNode.remove();
  });

  // document.querySelectorAll("div[class='bx_close_btn']").forEach((elem) => {
  //   elem.parentNode.remove();
  // });

  document.querySelectorAll("script[src^='https://www.googletagmanager.com']").forEach((elem) => {
    elem.style.display = "none";
    elem.remove();
  });

  document.querySelectorAll("div[id^='tpads-pc-']").forEach((elem) => {
    // #tpads-pc-top-page
    // #tpads-pc-balloon
    // #tpads-pc-article-middle
    // #tpads-pc-in_image
    elem.style.display = "none";
    elem.remove();
  });

  document.querySelectorAll("div[id^='tpads-mb-']").forEach((elem) => {
    elem.style.display = "none";
    elem.remove();
  });

  document.querySelectorAll("div[class='gliaplayer-wrapper']").forEach((elem) => {
    elem.style.display = "none";
    elem.parentNode.remove();
  });

  document.querySelectorAll("iframe").forEach((elem) => {
    elem.style.display = "none";
    elem.remove();
  });
}

function replaceTags() {
  const elem = document.getElementById("article");
  if (elem) {
    console.log("#article style: ", elem.style);
    elem.style.display = "block";
    //elem.style.flexWrap = "";
  }
}
