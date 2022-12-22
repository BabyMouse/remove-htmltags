const _num = new Set([...new Set('0123456789'), ...['Delete', 'Backspace', 'Enter']]);
const _defaultSettings = {
  timeout: 5,
};

function isNumberKey(e) {
  //showAlert('info', `${e.key} (${typeof e.key})`);
  if (!_num.has(e.key)) e.preventDefault();
}
/**
 *
 * @param {string} type Options ['', 'error', 'success', 'info', 'warning']
 * @param {string} message
 * @param {boolean} isAppend
 */
function showAlert(type, message, isAppend) {
  const __alert_box = document.querySelector('.alert-box');
  __alert_box.className = 'alert-box';
  __alert_box.children[0].checked = false;
  const __alert = __alert_box.children[1];
  __alert.className = `alert ${type}`;
  if (isAppend) {
    //__alert.children[1].innerHTML += `<br \> ${message}`;
    const __elem = document.createElement('p');
    __elem.className = 'inner';
    __elem.textContent = message;
    __alert.append(__elem);
  } else __alert.children[1].textContent = message;
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
    showAlert('success', 'Successfully saved settings.', false);
  } catch (error) {
    showAlert('error', error, false);
    showAlert('error', 'Settings have not been saved.', true);
  }
}

function updateUI(restoredSettings) {
  const __timeout = parseInt(restoredSettings.timeout);
  if (Number.isInteger(__timeout)) {
    if (__timeout < 0) {
      showAlert('error', `[browser.storage.local.get()] Timeout must be >= 0 - Rertore default.`, false);
      document.getElementById('timeout').value = _defaultSettings;
    } else document.getElementById('timeout').value = __timeout;
  } else {
    showAlert('error', `[browser.storage.local.get()] Timeout must be number - Rertore default.`, false);
    document.getElementById('timeout').value = _defaultSettings.timeout;
  }
}

function restoreDefault() {
  document.getElementById('timeout').value = _defaultSettings.timeout;
}

function onError(e) {
  showAlert('error', `[browser.storage.local] ${e}`, false);
}

browser.storage.local.get().then(updateUI, onError);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
