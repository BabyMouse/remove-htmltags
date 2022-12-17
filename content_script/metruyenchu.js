// "matches": ["*://metruyenchu.com/*", "*://metruyencv.com/*"]

console.log(`metruyenchu.js - ${document.readyState}\n`)

window.addEventListener('DOMContentLoaded', (event) => {
  // DOM fully loaded and parsed

  console.log(`metruyenchu.js - DOMContentLoaded - ${document.readyState}`)
})

document.addEventListener('readystatechange', (event) => {
  removeTags()
  console.log(`metruyenchu.js - removeTags() - ${document.readyState}\n`)

  if (document.readyState == 'interactive') {
    document.querySelectorAll('body > script:not([src])').forEach((elem) => {
      elem.remove()
    })
  }
})

function removeTags() {
  document.querySelectorAll('a[href^="https://c.lazada.vn"]').forEach((elem) => {
    elem.style.display = 'none'
    elem.parentNode.remove()
  })

  document.querySelectorAll('a[href^="https://tags.native-ad.net"]').forEach((elem) => {
    elem.style.display = 'none'
    elem.parentNode.remove()
  })

  document.querySelectorAll('iframe[src^="https://tags.native-ad.net"]').forEach((elem) => {
    elem.style.display = 'none'
    elem.parentNode.parentNode.remove()
  })

  // document.querySelectorAll('div[class="bx_close_btn"]').forEach((elem) => {
  //   elem.parentNode.remove();
  // });

  document.querySelectorAll('div[id^="tpads-pc-"]').forEach((elem) => {
    // #tpads-pc-top-page
    // #tpads-pc-balloon
    // #tpads-pc-article-middle
    // #tpads-pc-in_image
    elem.style.display = 'none'
    elem.remove()
  })

  document.querySelectorAll('div[id^="tpads-mb-"]').forEach((elem) => {
    elem.style.display = 'none'
    elem.remove()
  })

  document.querySelectorAll('div[class="gliaplayer-wrapper"]').forEach((elem) => {
    elem.style.display = 'none'
    elem.parentNode.remove()
  })

  document.querySelectorAll('iframe').forEach((elem) => {
    elem.style.display = 'none'
    elem.remove()
  })

  document.querySelectorAll('script[src^="https://www.google-analytics.com"]').forEach((elem) => {
    elem.remove()
    console.log('https://www.google-analytics.com')
  })

  document.querySelectorAll('script[src^="https://www.googletagmanager.com"]').forEach((elem) => {
    elem.remove()
    console.log('https://www.googletagmanager.com')
  })

  document.querySelectorAll('script[src*="tpm_pub.min.js"]').forEach((elem) => {
    elem.remove()
    console.log('tpm_pub.min.js')
  })

  document.querySelectorAll('script[src*="gliaplayer-plyr.js"]').forEach((elem) => {
    elem.remove()
    console.log('gliaplayer-plyr.js')
  })

  document.querySelectorAll('script[src="https://static.adconnect.vn/main.js"]').forEach((elem) => {
    elem.remove()
    console.log('https://static.adconnect.vn/main.js')
  })
}
