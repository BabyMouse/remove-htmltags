const notifications = new Set(['off', 'popup', 'system']);

const defaultSettings = {
  s_noti: false,
  timeout: 5,
  p_noti: 'off',
};

/**
 * @param {{s_noti: boolean, timeout: number, p_noti: string}} settings -
 * @returns {{settings: object, error: string}} - settings value is combination default settings and current settings.
 */
function parseSettings(settings) {
  let __error = '';
  const __settings = defaultSettings;

  const __s_noti = settings.s_noti + '';
  if (__s_noti === 'true' || __s_noti === 'false') __settings.s_noti = settings.s_noti;
  else __error += `s_noti: ${__s_noti}\n`;

  const __timeout = parseInt(settings.timeout);
  if (Number.isInteger(__timeout))
    if (__timeout < 0) __error += `timeout: ${browser.i18n.getMessage("errTimeout.1")}\n`;
    else __settings.timeout = __timeout;
  else __error += `timeout: ${browser.i18n.getMessage("errTimeout.2")}\n`;

  const __noti = settings.p_noti;
  if (notifications.has(__noti)) __settings.p_noti = __noti;
  else __error += `p_noti: ${__noti}\n`;

  return { settings: __settings, error: __error };
}

export { notifications, defaultSettings, parseSettings };
