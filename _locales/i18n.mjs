/**
 * Ref: https://github.com/erosman/HTML-Internationalization
 */

/**
 * Localize Html Page.
 */
export function i18n() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.dataset.i18n.split(',').forEach((n) => {
      let [text, attr] = n.split('|');
      text = browser.i18n.getMessage(text);
      attr ? node.setAttribute(attr, text) : node.append(text);
    });
  });
}
