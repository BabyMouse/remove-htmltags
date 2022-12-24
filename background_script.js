function notify(message) {
  browser.notifications.create({
    type: 'basic',
    iconUrl: browser.runtime.getURL('icons/icon-64.png'),
    title: message.title,
    message: message.content,
  });
}

browser.runtime.onMessage.addListener(notify);
