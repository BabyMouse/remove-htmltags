// let currentTabUrl;
// function onError(error) {
//   console.error(`Error: ${error}`);
// }
// function logTabs(tabs) {
//   for (const tab of tabs) {
//     // tab.url requires the `tabs` permission or a matching host permission.
//     console.log(tab.url);

//     browser.runtime.sendMessage({
//       title: document.title,
//       content: `• ` + tab.url + `.\n• readyState: ${document.readyState}.`,
//     });
//   }
// }
// browser.tabs
//   .query({
//     currentWindow: true,
//     active: true,
//   })
//   .then(logTabs, onError);
// browser.tabs.query(
//   {
//     currentWindow: true,
//     active: true,
//   },
//   (tabs) => {
//     browser.runtime.sendMessage({
//       title: document.title,
//       content: `• url: ${tabs[0].url}.\n• id: ${tabs[0].id}\n• index: ${tabs[0].index}\n• title: ${tabs[0].title}\n• readyState: ${document.readyState}.`,
//     });
//   }
// );
// document.getElementById('host').textContent = currentTabUrl;

// browser.runtime.sendMessage({
//   title: document.title,
//   content: `• ` + currentTabUrl + `.\n• readyState: ${document.readyState}.`,
// });

document.getElementById('ckbWrap').addEventListener('change', (event) => {
  document.getElementById('code').wrap = event.target.checked ? 'soft' : 'off';
});

document.getElementById('btnCopy').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('code').value);
});

function getSourceCode() {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { req: 'source-code' }).then((response) => {
      document.getElementById('host').value = tabs[0].url;
      document.getElementById('code').value = response.content;
    });
  });
}
getSourceCode();
