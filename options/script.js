const _num = new Set('0123456789');

function isNumberKey(e) {
  if (!_num.has(e.key)) e.preventDefault();
}

function saveOptions(e) {
  //   browser.storage.sync.set({
  //     colour: document.querySelector('#colour').value,
  //   });
  function getTimeout() {
    return document.getElementById('timeout').value;
  }

  const timeout = getTimeout();

  browser.storage.local.set({
    timeout,
  });
  e.preventDefault();
}

function updateUI(restoredSettings) {
  //   let storageItem = browser.storage.managed.get('colour');
  //   storageItem.then((res) => {
  //     document.querySelector('#managed-colour').innerText = res.colour;
  //   });
  //   let gettingItem = browser.storage.sync.get('colour');
  //   gettingItem.then((res) => {
  //     document.querySelector('#colour').value = res.colour || 'Firefox red';
  //   });
  document.getElementById('timeout').value = restoredSettings.timeout;
}

function restoreDefault() {
  document.getElementById('timeout').value = 3;
}

//document.addEventListener('DOMContentLoaded', updateUI);
browser.storage.local.get().then(updateUI);
document.querySelector('form').addEventListener('submit', saveOptions);
document.getElementById('timeout').addEventListener('keydown', isNumberKey);
document.getElementById('restore').addEventListener('click', restoreDefault);
