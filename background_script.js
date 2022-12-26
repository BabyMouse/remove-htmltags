function notify(message) {
  if (message.req === 'notify')
    browser.notifications.create({
      type: 'basic',
      title: message.title,
      message: message.content,
    });
}

browser.runtime.onMessage.addListener(notify);

// function handleActivated(activeInfo) {
//   console.log(`Tab ${activeInfo.tabId} was activated`);
// }

// browser.tabs.onActivated.addListener(handleActivated);
