const _notifications = new Set(['off', 'popup', 'system']);
const _defaultSettings = {
  s_noti: false,
  timeout: 5,
  p_noti: 'off',
};

let _settings = _defaultSettings;

function notify(message) {
  browser.notifications.create({
    type: 'basic',
    title: message.title ?? 'Remove HTMLTags',
    message: message.content,
  });
}

function getSettings(restoredSettings) {
  const __s_noti = restoredSettings.s_noti + '';
  if (__s_noti === 'true' || __s_noti === 'false') {
    _settings.s_noti = restoredSettings.s_noti;
  } else {
    notify(`[browser.storage.local.get(['s_noti'])] = ${__s_noti} - Rertore default.`);
    _settings.s_noti = _defaultSettings.s_noti;
  }

  const __timeout = parseInt(restoredSettings.timeout);
  if (Number.isInteger(__timeout)) {
    if (__timeout < 0) {
      notify(`[browser.storage.local.get(['timeout'])] Timeout must be >= 0 - Rertore default.`);
      _settings.timeout = _defaultSettings;
    } else _settings.timeout = __timeout;
  } else {
    notify(`[browser.storage.local.get(['timeout'])] Timeout must be number - Rertore default.`);
    _settings.timeout = _defaultSettings.timeout;
  }

  const __noti = restoredSettings.p_noti;
  if (_notifications.has(__noti)) _settings.p_noti = __noti;
  else {
    notify(`[browser.storage.local.get(['p_noti'])] = ${__noti} - Rertore default.`);
    _settings.p_noti = _defaultSettings.p_noti;
  }
}

function onError(e) {
  notify({ content: `[browser.storage.local] ${e}` });
}

function runtimeEventHadler(message) {
  switch (message.req) {
    case 'notify':
      if (_settings.s_noti) notify(message);
      break;
    case 'getSettings':
      return Promise.resolve({ timeout: _settings.timeout, p_noti: _settings.p_noti });
    case 'getAllSettings':
      return Promise.resolve({ settings: _settings, defaultSettings: _defaultSettings });
    case 'saveSettings':
      _settings = message.settings;
      browser.storage.local.set(_settings);
      break;
  }
}

browser.storage.local.get().then(getSettings, onError);
browser.runtime.onMessage.addListener(runtimeEventHadler);

// function handleActivated(activeInfo) {
//   console.log(`Tab ${activeInfo.tabId} was activated`);
// }

// browser.tabs.onActivated.addListener(handleActivated);
