const _num = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter']);
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
    return document.getElementById('timeout').value;
  }

  browser.storage.local.set({
    timeout: getTimeout(),
  });
}

function updateUI(restoredSettings) {
  const timeout = restoredSettings.timeout;
  if (timeout == undefined) showAlert('error', `[browser.storage.local] Timeout: ${timeout}`);
  document.getElementById('timeout').value = timeout ?? _defaultSettings.timeout;
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
