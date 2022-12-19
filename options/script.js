const _num = new Set('0123456789');
const _defaultSettings = {
  timeout: 5,
};

function isNumberKey(e) {
  if (!_num.has(e.key)) e.preventDefault();
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
  if (timeout == undefined)
    document.getElementById('error').textContent = `[browser.storage.local] Timeout: ${timeout}`;
  document.getElementById('timeout').value = timeout ?? _defaultSettings.timeout;
}

function restoreDefault() {
  document.getElementById('timeout').value = _defaultSettings.timeout;
}

function onError(e) {
  document.getElementById('error').textContent = `[browser.storage.local] ${e}`;
}

browser.storage.local.get().then(updateUI, onError);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefault);
