import { i18n } from '../_locales/i18n.mjs';
i18n();

document.getElementById('ckbWrap').addEventListener('change', (event) => {
  document.getElementById('code').wrap = event.target.checked ? 'soft' : 'off';
});

document.getElementById('btnCopy').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('code').value);
});

function getSourceCode() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { req: 'source-code' }).then((response) => {
      document.getElementById('title').textContent = tabs[0].title;
      document.getElementById('host').value = tabs[0].url;
      document.getElementById('code').value = response.content;
    });
  });
}
getSourceCode();
