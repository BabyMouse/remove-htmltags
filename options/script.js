const _num = new Set([...new Set('0123456789'), ...new Set(['Delete', 'Backspace', 'Enter'])]);
const _defaultSettings = {
  timeout: 5,
};

function isNumberKey(e) {
  //showAlert('info', `${e.key} (${typeof e.key})`);
  if (!_num.has(e.key)) e.preventDefault();
}

function showAlert(type, message) {
  const inner = document.querySelector('p.inner');
  inner.textContent = message;
  inner.parentNode.className = `alert ${type}`;
}

function saveOptions() {
  function getTimeout() {
    const timeout = document.getElementById('timeout').value;
    if (Number.isInteger(timeout)) {
      return timeout < 0 ? _defaultSettings.timeout : timeout;
    } else {
      showAlert('error', `${timeout} (${typeof timeout})`);
      document.getElementById('timeout').value = _defaultSettings.timeout;
      return _defaultSettings.timeout;
    }
  }

  browser.storage.local.set({
    timeout: getTimeout(),
  });
}

function updateUI(restoredSettings) {
  const timeout = restoredSettings.timeout;
  if (Number.isInteger(timeout)) {
    document.getElementById('timeout').value = timeout < 0 ? _defaultSettings.timeout : timeout;
  } else {
    showAlert('error', `[browser.storage.local] Timeout: ${timeout} (${typeof timeout})`);
    document.getElementById('timeout').value = _defaultSettings.timeout;
  }
}

function restoreDefault() {
  document.getElementById('timeout').value = _defaultSettings.timeout;
}

function onError(e) {
  showAlert('error', `[browser.storage.local] ${e}`);
}

browser.storage.local.get().then(updateUI, onError);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
