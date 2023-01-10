import { defaultSettings, parseSettings } from '../assets/utils.mjs';

let _settings = defaultSettings;

/**
 * Use browser.notifications.create() method to show notification on system status.
 * @param {object} message - {title: string, content: string} | content: string.
 * @param {string} [message.title = Remove HTMLTags] - Default value is extensionName.
 * @param {string} [message.content] - Default value is string empty.
 * @param {boolean} force - Force a notification.
 */
function notify(message, force) {
  if (_settings.s_noti || force)
  browser.notifications.create({
    type: 'basic',
    title: message.title ?? browser.i18n.getMessage('extensionName'),
    message: message.content == undefined ? (typeof message == 'object' ? '' : message) : message.content,
  });
}

function getSettings(restoredSettings) {
  const __resultParseSettings = parseSettings(restoredSettings);
  _settings = __resultParseSettings.settings;
  if (__resultParseSettings.error != '') notify(__resultParseSettings.error);
}

function saveSettings(settings) {
  browser.storage.local.set(settings);
}

function onError(e) {
  notify({ content: `[browser.storage.local] ${e}` });
}

function runtimeEventHandler(message) {
  switch (message.req) {
    case 'notify':
      if (_settings.s_noti) notify(message);
      break;
    case 'getSettings':
      return Promise.resolve({
        timeout: _settings.timeout,
        p_noti: _settings.p_noti,
      });
    case 'getAllSettings':
      return Promise.resolve(_settings);
    case 'saveSettings':
      _settings = message.settings;
      saveSettings(_settings);
      break;
  }
}

browser.storage.local.get().then(getSettings, onError);
browser.runtime.onMessage.addListener(runtimeEventHandler);

// function handleActivated(activeInfo) {
//   console.log(`Tab ${activeInfo.tabId} was activated`);
// }

// browser.tabs.onActivated.addListener(handleActivated);
