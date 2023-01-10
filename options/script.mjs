import '../_locales/i18n.mjs';
import { defaultSettings, parseSettings } from '../assets/utils.mjs';

const _acceptedKeys = new Set([...new Set('0123456789'), ...['Delete', 'Backspace', 'Enter']]);

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
  const __resultParseSettings = parseSettings({
    s_noti: document.getElementById('s_noti').checked,
    timeout: document.getElementById('timeout').value,
    p_noti: document.getElementById('p_noti').value,
  });
  if (__resultParseSettings.error == '') {
    browser.runtime.sendMessage({
      req: 'saveSettings',
      settings: __resultParseSettings.settings,
    });
    showAlert(browser.i18n.getMessage('opsMsg.1'), 'success', false);
  } else {
    showAlert(__resultParseSettings.error, 'error', false);
    showAlert(browser.i18n.getMessage('opsMsg.2'), 'error', true);
  }
}

function updateUI(restoredSettings) {
  document.getElementById('s_noti').checked = restoredSettings.s_noti;
  document.getElementById('p_noti').options[2].disabled = !restoredSettings.s_noti;
  document.getElementById('timeout').value = restoredSettings.timeout;
  document.getElementById('p_noti').value = restoredSettings.p_noti;
}

function restoreDefault() {
  document.getElementById('s_noti').checked = defaultSettings.s_noti;
  document.getElementById('timeout').value = defaultSettings.timeout;
  document.getElementById('p_noti').value = defaultSettings.p_noti;
}

function onError(e) {
  showAlert(`[browser.storage.local] ${e}`, 'error', false);
}

browser.runtime.sendMessage({ req: 'getAllSettings' }).then(updateUI, onError);
document.getElementById('s_noti').addEventListener('change', checkS_Noti);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
