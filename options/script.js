const _num = new Set([...new Set('0123456789'), ...['Delete', 'Backspace', 'Enter']]);
const _defaultSettings = {
  timeout: 5,
};

function isNumberKey(e) {
  //showAlert(`${e.key} (${typeof e.key})`, 'info', false);
  if (!_num.has(e.key)) e.preventDefault();
}

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

function saveOptions() {
  function getTimeout() {
    const __timeout = parseInt(document.getElementById('timeout').value);
    if (Number.isInteger(__timeout)) {
      if (__timeout < 0) throw "[+getElementById('timeout').value] Timeout must be >= 0.";
      return __timeout;
    }
    throw "[+getElementById('timeout').value]Timeout must be number.";
  }

  try {
    browser.storage.local.set({
      timeout: getTimeout(),
    });
    showAlert('Successfully saved settings.', 'success', false);
  } catch (error) {
    showAlert(error, 'error', false);
    showAlert('Settings have not been saved.', 'error', true);
  }
}

function updateUI(restoredSettings) {
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
}

function restoreDefault() {
  document.getElementById('timeout').value = _defaultSettings.timeout;
}

function onError(e) {
  showAlert(`[browser.storage.local] ${e}`, 'error', false);
}

browser.storage.local.get().then(updateUI, onError);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
