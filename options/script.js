const _acceptedKeys = new Set([...new Set('0123456789'), ...['Delete', 'Backspace', 'Enter']]);
const _notifications = new Set(['off', 'popup', 'system']);

let _defaultSettings;

/**
 * Show message with Alert-Box.
 * @param {string} message
 * @param {string} type - One of the options ['', 'error', 'success', 'info', 'warning']
 * @param {boolean} isAppend
 */
function showAlert(message, type, isAppend) {
  const __alert_box = document.querySelector('.alert-box');
  __alert_box.className = 'alert-box';
  __alert_box.children[0].checked = false;
  const __alert = __alert_box.children[1];
  __alert.className = `alert ${type}`;
  const __inner = __alert.children[1];
  const __elem = document.createElement('li');
  __elem.textContent = message;
  if (!isAppend) __inner.replaceChildren();
  __inner.append(__elem);
}

function isNumberKey(e) {
  if (!_acceptedKeys.has(e.key)) e.preventDefault();
}

function checkS_Noti(e) {
  const __unchecked = !e.target.checked;
  let __p_noti = document.getElementById('p_noti');
  __p_noti.options[2].disabled = __unchecked;
  if (__unchecked && __p_noti.selectedIndex == 2) __p_noti.selectedIndex = 0;
}

function saveOptions() {
  function getS_Noti() {
    return document.getElementById('s_noti').checked;
  }
  function getTimeout() {
    const __timeout = parseInt(document.getElementById('timeout').value);
    if (Number.isInteger(__timeout)) {
      if (__timeout < 0) throw "[+getElementById('timeout')] Timeout must be >= 0.";
      return __timeout;
    }
    throw `[+getElementById('timeout')] = ${__timeout}: Timeout must be number.`;
  }
  function getP_Noti() {
    const __noti = document.getElementById('p_noti').value;
    if (_notifications.has(__noti)) return __noti;
    throw `[getElementById('p_noti')] = ${__noti}`;
  }

  try {
    browser.runtime.sendMessage({
      req: 'saveSettings',
      settings: { s_noti: getS_Noti(), timeout: getTimeout(), p_noti: getP_Noti() },
    });
    showAlert('Successfully saved settings.', 'success', false);
  } catch (error) {
    showAlert(error, 'error', false);
    showAlert('Settings have not been saved.', 'error', true);
  }
}

function updateUI(restoredSettings) {
  document.getElementById('s_noti').checked = restoredSettings.s_noti;
  document.getElementById('p_noti').options[2].disabled = !restoredSettings.s_noti;
  document.getElementById('timeout').value = restoredSettings.timeout;
  document.getElementById('p_noti').value = restoredSettings.p_noti;
}

function getAllSettings(allSettings) {
  _defaultSettings = allSettings.defaultSettings;
  updateUI(allSettings.settings);
}

function restoreDefault() {
  document.getElementById('s_noti').checked = _defaultSettings.s_noti;
  document.getElementById('timeout').value = _defaultSettings.timeout;
  document.getElementById('p_noti').value = _defaultSettings.p_noti;
}

function onError(e) {
  showAlert(`[browser.storage.local] ${e}`, 'error', false);
}

browser.runtime.sendMessage({ req: 'getAllSettings' }).then(getAllSettings, onError);
document.getElementById('s_noti').addEventListener('change', checkS_Noti);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
