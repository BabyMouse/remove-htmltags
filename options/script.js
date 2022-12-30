const _acceptedKeys = new Set([...new Set('0123456789'), ...['Delete', 'Backspace', 'Enter']]);
const _notifications = new Set(['off', 'popup', 'system']);
const _defaultSettings = {
  s_noti: false,
  timeout: 5,
  p_noti: 'off',
};

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
  //showAlert(`${e.key} (${typeof e.key})`, 'info', false);
  if (!_acceptedKeys.has(e.key)) e.preventDefault();
}

function checkS_Noti(e) {
  document.getElementById('p_noti').options[2].disabled = !e.target.checked;
  if (!e.target.checked) document.getElementById('p_noti').selectedIndex = 0;
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
    browser.storage.local.set({
      s_noti: getS_Noti(),
      timeout: getTimeout(),
      p_noti: getP_Noti(),
    });
    showAlert('Successfully saved settings.', 'success', false);
  } catch (error) {
    showAlert(error, 'error', false);
    showAlert('Settings have not been saved.', 'error', true);
  }
}

function updateUI(restoredSettings) {
  document.getElementById('s_noti').checked = restoredSettings.s_noti;
  const __timeout = parseInt(restoredSettings.timeout);
  if (Number.isInteger(__timeout)) {
    if (__timeout < 0) {
      showAlert(`[browser.storage.local.get()] Timeout must be >= 0 - Rertore default.`, 'error', false);
      document.getElementById('timeout').value = _defaultSettings;
    } else document.getElementById('timeout').value = __timeout;
  } else {
    showAlert(`[browser.storage.local.get()] Timeout must be number - Rertore default.`, 'error', false);
    document.getElementById('timeout').value = _defaultSettings.timeout;
  }

  const __noti = restoredSettings.p_noti;
  if (_notifications.has(__noti)) document.getElementById('p_noti').value = __noti;
  else {
    showAlert(`[browser.storage.local.get()] = ${__noti}: Rertore default.`, 'error', false);
    document.getElementById('p_noti').value = _defaultSettings.p_noti;
  }
}

function restoreDefault() {
  document.getElementById('s_noti').checked = _defaultSettings.s_noti;
  document.getElementById('timeout').value = _defaultSettings.timeout;
  document.getElementById('p_noti').value = _defaultSettings.p_noti;
}

function onError(e) {
  showAlert(`[browser.storage.local] ${e}`, 'error', false);
}

browser.storage.local.get().then(updateUI, onError);
document.getElementById('s_noti').addEventListener('change', checkS_Noti);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
