# Remove HTML tags
- Created: 2022.12.15
- Updated: 2023.01.05

Remove HTML Tags extension for Firefox browser.

### Table of contents
- [About this extension](#about-this-extension)
- [Minimum supported browser versions](#minimum-supported-browser-versions)
- [Installation](#installation)
- [Development (on Desktop Windows)](#development-on-desktop-windows)
- [Release](#release)
- [Free and Open Source](#free-and-open-source)
- [Changelog](#changelog)

## About this extension

## Minimum supported browser versions
| Browser                 	| Version 	|
|-------------------------	|:---------:|
| Firefox                 	|  108      |
| Firefox for Android      	|  110 	    |
|                     	    |     	    |

## Installation
- Desktop PC: https://addons.mozilla.org/addon/remove-htmltags
- Mobile: Tested only on Android OS with Firefox Nightly.

  Ref: https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly

## Development (on Desktop Windows)
1. Set Windows `PowerShell` the execution policy
   - Turn off
      ```PowerShell
      Set-ExecutionPolicy RemoteSigned
      ```
   - Turn on
      ```PowerShell
      Set-ExecutionPolicy Restricted
      ```
   - Ref: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies
2. Install `nvm`
   - Ref: https://github.com/coreybutler/nvm-windows/releases
3. Install `Note.js`
    ```
    npm install -g npm
    ```
4. Install `web-ext`
    ```
    npm install --global web-ext
    ```
     - Ref: https://github.com/mozilla/web-ext
5. Install `Deskop GitHub`
   - Run extension
      ```
      web-ext run
      ```
   - Build extension
      ```
      web-ext build
      ```

## Release
All versions: https://github.com/BabyMouse/remove-htmltags/tree/main/web-ext-artifacts

## Free and Open Source
GitHub: https://github.com/BabyMouse/remove-htmltags

## Changelog
Link: https://github.com/BabyMouse/remove-htmltags/blob/main/CHANGELOG.md