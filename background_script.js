function notify(message) {
  browser.notifications.create({
    type: 'basic',
    title: message.title,
    message: message.content,
  });
}

function runtimeEventHadler(message) {
  switch (message.req) {
    case 'notify':
      browser.storage.local.get(['s_noti'], (result) => {
        if (result.s_noti) notify(message);
      });
      break;
  }
}

browser.runtime.onMessage.addListener(runtimeEventHadler);

// function handleActivated(activeInfo) {
//   console.log(`Tab ${activeInfo.tabId} was activated`);
// }

// browser.tabs.onActivated.addListener(handleActivated);
